//navigation in tabs
(function($) {
	'use strict';
	$().ready(function() {
		if ( ! $('#model-details').length ) {
			return false;
		}

		$('.nav-tabs').find('a').on('touchstart click', function(e) {
			var $btn	= $(this),
				ul		= $btn.parent().parent(),
				$btn_fs	= $('.full_screen_read_button');
			if ($btn.attr("href") === '#'){
				e.preventDefault();
				return;
			}
			ul.find('li').removeClass('active');
			if ($btn.attr("href") === '#tags' || $btn.attr("href") === '#about' ) {
				$('#tags').hide();
				$('#about').hide();
			} else {
				$('.' + ul.data('content')).hide();
			}
			$btn.parent().addClass('active');
			$($btn.attr("href")).show();
			if ($btn.attr("href") === '#about') $btn_fs.show();
			else if (ul.data('content') === 'tab_content'){
				for(var i=0;i<$btn_fs.length;i++){
					if ($($btn_fs[i]).data('txtcontainer') === 'about') $($btn_fs[i]).hide();
				}
			}
			e.preventDefault();
		});

		txtarea_scrolling(
							$('#model_comment_layout_textarea'),
							$('#comments .add_comment .tab_content')
		);

	});

	function txtarea_scrolling($obj, $scroll) {
		$obj.on('keyup', function() {
			var $this = $(this),
				linebreaks = $this.val().match(/\n/g);
			$this.attr('rows', (linebreaks && linebreaks.length > 2 ? linebreaks.length + 2 : 2));
			$this.scrollTop($this.height());
			$scroll.mCustomScrollbar("update");
			$scroll.mCustomScrollbar("scrollTo", "bottom");
		});
	}

}(jQuery));

// like, favorite button action
(function($, w) {
	'use strict';

	$().ready(function() {
		if ( ! $('#model-details').length ) {
			return false;
		}

		$('#btn_model_like').on('touchstart click', function(e) {
			var track = {
				0 : 'dislike',
				1 : 'like'
			};
			user_action($(this), 'like', 'like_button', track);
			e.preventDefault();
		});

		$('#btn_model_favorite').on('touchstart click', function(e) {
			var track = {
				0 : 'unfavorite',
				1 : 'favorite'
			};
			user_action($(this), 'set_favorite', 'favorite_button', track);
			e.preventDefault();
		});
	});

	function user_action($this, url, button, track) {
		var mode		= $this.data('mode'),
			ga_label	= $this.data('ga_label'),
			replaceto	= (mode==='add' ? track[0] : track[1]);
		if (ga_label) ga_label = ga_label.replace(/unfavorite|favorite|dislike|like/gi, replaceto);
		$.ajax({
			'type'	: "POST",
			'url'	: '/ajax/' + url + '.php',
			'data'	: {
				'model_id'	: w.location.href.replace(/.*\/models\/(.*)\/.*/, '$1'),
				'mode'		: mode,
				'data_for'	: 'model'
			}
		}).done(function(rsp) {
			if (rsp.success) {
				if (mode === 'add') {
					$this.removeClass(button).addClass('used_button');
				} else {
					$this.removeClass('used_button').addClass(button);
				}
				$this.data('ga_label', ga_label);
				$this.data('mode', (mode==='add' ? 'remove' : 'add'));
				if (url === 'like' ){
					$('#model-details #like_info_data').html(rsp.like_cnt);
				}
			}
		});
	}

}(jQuery, window));

//common content scroller, full screen button, tooltip
(function($) {
	'use_strict';

	$().ready(function() {
		if ( ! $('#model-details').length ) {
			return false;
		}

		$('.tab_content').mCustomScrollbar({
			'autoDraggerLength'	: true,
			'advanced'			: {
				'updateOnBrowserResize'	: true,
				'updateOnContentResize'	: true
			},
			'theme'				: 'dark-thick'
		});

		$('.full_screen_read_button').on('touchstart click', function(e) {
			$.fancybox2.open({
				'maxWidth'			: 800,
				'maxHeight'			: 600,
				'autoHeight'		: true,
				'fitToView'			: true,
				'padding'			: 10,
				'autoSize'			: false,
				'closeClick'		: false,
				'openEffect'		: 'none',
				'closeEffect'		: 'none',
				'centerOnScroll'	: true,
				'wrapCSS'			: 'model_fullscreen',
				'content'			: $('#'+ $(this).data('txtcontainer') +
																		' .mCSB_container').html()
			});
			e.preventDefault();
		});

		$('#model-details .photo_cont a[title]').tooltip({
			'position'	: 'top center',
			'offset'	: [10, 2],
			'effect'	: 'toggle',
			'tipClass'	: 'memberonly'
		});

		$('.text-xxlarge[title]').tooltip({
			'position'	: 'top center',
			'offset'	: [10, 2],
			'effect'	: 'toggle',
			'tipClass'	: 'joincaller'
		});

	});

}(jQuery));

//filter and pager
(function($, w, linkGen) {
	'use_strict';

	$().ready(function() {
		if ( ! $('#model-details').length ) {
			return false;
		}
		filter_input_click();
		filter_select_click();
		pager_click();
	});

	function filter_input_click() {
		$('.model_details_filter_area').find('input').on('touchstart click', function() {
			var cb = this;
			$('.qcb' + $(this).val()).each(function() {
				if (cb !== this) {
					this.checked = ! this.checked;
				}
			});
			$('#myscenes').data('is_filter', '1');
			use_filter();
		});
	}

	function filter_select_click() {
		$('.model_details_filter_area').find('select').on('change', function() {
			var value		= $(this).val(),
				class_name	= $(this).data('filter');
			$('.sel_' + class_name).val(value);
			$('#myscenes').data('is_filter', '1');
			use_filter();
		});
	}

	function pager_click() {
		$('.model_details_pager_area').find('a').on('touchstart click', function(e) {
			if ($(this).hasClass('disabled') || $(this).hasClass('active') ) {
				e.preventDefault();
				return;
			}
			$('.model_details_pager_area').find('a').removeClass('active');
			$(this).addClass('active');
			$('#myscenes').data('is_filter', '');
			use_filter();
			e.preventDefault();
		});
	}

	function use_filter() {
		var $filter_area	= $('.model_details_filter_area'),
			$pager_area		= $('.model_details_pager_area'),
			filter_data		= {},
			filter_value;
		if ($filter_area) {
			$($filter_area).find('.filter_data').each(function() {
				filter_value = $(this).data('filter');
				if ( ! filter_data[filter_value]) filter_data[filter_value] = new Array();
				if (this.type === 'checkbox' && this.checked) {
					filter_data[filter_value].push($(this).val());
				} else if (this.type !== 'checkbox') {
					filter_data[filter_value].push($(this).val());
				}
			});
			$.each(filter_data, function(ind, value) {
				filter_data[ind] = value.join(',');
			});
		}
		if ($pager_area) {
			filter_data['page'] = $($pager_area).find('a.active').data('page');
		}
		refresh_scenes_list(filter_data);
	}

	function refresh_scenes_list(filter_data) {
		if (parseInt($('#myscenes').data('is_filter'))) {
			filter_data.page = 1;
		}
		if (w.History) {
			push_to_history(filter_data);
		}
		filter_data.model_id	= $('#model-details').data('model_id');
		$.ajax({
			'dataType'	: 'json',
			'url'		: '/ajax/get_model_scenes_list.php',
			'method'	: 'POST',
			'data'		: filter_data
		}).done(function(data) {
			$.ajax({
				'url'	: linkGen.get_render_tpl('model_scenes_list'),
				'cache'	: true
			}).done(function(template) {
				$('#myscenes').html($.templates(template).render(data));
				filter_input_click();
				filter_select_click();
				pager_click();
			});
		});
	}

	function push_to_history(filter_data) {
		var param = new Array();
		$.each(filter_data, function(ind, value) {
			param.push(ind + '=' + value);
		});
		w.History.pushState(filter_data, '', '?' + param.join('&'));
	}

}(jQuery, window, LinkGenerator));