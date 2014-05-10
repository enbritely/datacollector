if ( ! window.isFlashEnabled) {
	function isFlashEnabled() {
		var hasFlash = false;

		try {
			var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			if (fo) {
				hasFlash = true;
			}
		} catch(e) {
			if (navigator.mimeTypes ["application/x-shockwave-flash"] !== undefined) {
				hasFlash = true;
			}
		}
		return hasFlash;
	}
}

function VideoPlayer(isFlashEnabled) {
	if (arguments.callee.instance) {
		return arguments.callee.instance;
	}
	arguments.callee.instance = this;

	this.trailerPlayer	= {};
	this.videoPlayer	= {};
	this.provider		= 'rtmp';
	this.canhtml5		= true;

	this.initVideo = function() {
		try {
			if (isFlashEnabled) {
				this.initFlashTrailerPlayer();
				this.initFlashVideoPlayer();
			} else {
				this.initHTML5TrailerPlayer();
				this.initHTML5VideoPlayer();
			}
		} catch(err) {}
	};

	this.initFlashTrailerPlayer = function() {
		var $trailerplayer = $('#flash_trailer_player');
		this.trailerPlayer = flowplayer(
				$trailerplayer.attr('id'),
				'/swf/flowplayer.commercial-3.2.18.swf',
				{
					'key'	: $trailerplayer.data('key'),
					'playlist'	: [
						{
							'url'	: $trailerplayer.data('preview')
						},
						{
							'url'			: $trailerplayer.data('trailer_url'),
							'accelerated'	: true,
							'autoPlay'		: false,
							'autoBuffering'	: false,
							'onStart'		: function() {
								if ($trailerplayer.data('scene_id')) {
									videoView($trailerplayer.data('scene_id'));
								}
							},
							'onFinish'		: function() {
								if ($trailerplayer.data('scene_id')) {
									displayJoin();
								}
							}
						}
					]
				}
		);
	};

	this.initFlashVideoPlayer = function() {
		var $videoplayer = $('#flash_video_player');
		this.provider = $videoplayer.data('provider');
		this.videoPlayer =  flowplayer(
				$videoplayer.attr('id'),
				{
					'src'	: '/swf/flowplayer.commercial-3.2.18.swf',
					'wmode'	: 'opaque'
				},
				{
					'key'	: $videoplayer.data('key'),
					'playlist'	: [
						{
							'url'	: $videoplayer.data('preview')
						},
						{
							'url'			: $videoplayer.data('url'),
							'accelerated'	: true,
							'autoPlay'		: false,
							'autoBuffering'	: false,
							'bufferLength'	: 3,
							'provider'		: this.provider,
							'scaling'		: 'fit'
						}
					],
					'plugins'	: {
						'rtmp'		: {
							'url'				: "/swf/flowplayer.rtmp-3.2.13.swf",
							'netConnectionUrl'	: $videoplayer.data('streamer')
						},
						'pseudo'	: {
							'url'	: "/swf/flowplayer.pseudostreaming-3.2.13-highwinds.swf"
						}
					},
					'canvas':  {
					  'backgroundGradient': 'none',
					  'backgroundColor': '#000'
					}
				}
		);
	};

	this.initHTML5TrailerPlayer = function() {
		this.trailerPlayer = $('#html5_trailer_player')[0];
		if (this.trailerPlayer.canPlayType) {
			this.trailerPlayer.seek = function(sec) {
				this.addEventListener('loadedmetadata', function() {
					this.pause();
					this.currentTime = sec;
					this.play();
				}, false);
			};


			this.trailerPlayer.addEventListener('play', function(e) {
				if ($(this).data('scene_id') && ! $(this).attr('watched')) {
					$(this).attr('watched','true');
					videoView($(this).data('scene_id'));
				}
			});

			this.trailerPlayer.addEventListener('ended', function(e) {
				if ($(this).data('scene_id')) {
					displayJoin();
				}
			});

/*
			this.trailerPlayer.onplay = function() {
				if ($(this).data('scene_id')) {
					videoView($(this).data('scene_id'));
				}
			};
			this.trailerPlayer.onended = function() {
				if ($(this).data('scene_id')) {
					displayJoin();
				}
			};
*/

			this.trailerPlayer.getTime = function() {
				return this.currentTime;
			};
			this.trailerPlayer.stop = function() {
				return this.pause();
			};
			this.trailerPlayer.poster = $(this.trailerPlayer).data('preview');
			this.trailerPlayer.controls = true;
			this.trailerPlayer.src = $(this.trailerPlayer).data('trailer_url');
		} else if ($('#join').length) {
			displayJoin();
		} else {
			this.canhtml5 = false;
			displayNoStream();
		}
	};

	this.initHTML5VideoPlayer = function() {
		this.videoPlayer = $('#html5_video_player')[0];
		if ( ! this.videoPlayer) {
			return;
		}
		if (this.videoPlayer.canPlayType) {
			this.videoPlayer.seek = function(sec) {
				this.addEventListener('loadedmetadata', function() {
					this.pause();
					this.currentTime = sec;
					this.play();
				}, false);
			};
			this.videoPlayer.getTime = function() {
				return this.currentTime;
			};
			this.videoPlayer.stop = function() {
				return this.pause();
			};
			this.videoPlayer.poster = $(this.videoPlayer).data('preview');
			this.videoPlayer.controls = true;
			this.videoPlayer.src = $(this.videoPlayer).data('url');
			this.videoPlayer.preload = 'none';
		} else {
			displayNoStream();
		}
	};

	this.jumpTo = function(type, player, currentTime, url) {
		if (url) {
			if (type==='flash') {
				var clip = {
					'url'			: url,
					'accelerated'	: true,
					'autoPlay'		: false,
					'autoBuffering'	: false,
					'onStart'		: function() {
						if (currentTime) {
							this.seek(currentTime);
						}
					}
				};
				if (player === 'trailer' ) {
					this.trailerPlayer.setClip(clip).play();
				} else {
					clip.provider = this.provider;
					this.videoPlayer.setClip(clip).play();
				}
			} else {
				if (player === 'trailer' ) {
					this.trailerPlayer.src = url;
					this.trailerPlayer.load();
					this.trailerPlayer.seek(currentTime);
				} else {
					this.videoPlayer.src = url;
					this.videoPlayer.load();
					this.videoPlayer.seek(currentTime);
				}
			}
		} else if (player === 'video') {
			this.jumpToPlayerVideo(type, currentTime, 1);
		}
	};

	this.jumpToPlayerVideo = function(type, currentTime, tryNum) {
		this.videoPlayer.play();
		try {
			if (type === 'flash') {
				this.videoPlayer.seek(currentTime);
			} else {
				this.videoPlayer.currentTime = currentTime;
			}
		} catch(e) {
			if (tryNum > 40) { // no mor try
				return false;
			}
			var self = this;
			setTimeout(function() {
				self.jumpToPlayerVideo(type, currentTime,  ++tryNum);
			},
			500);
		}
	};

	this.controlsToggle = function() {
		if (this.videoPlayer) {
			if (this.videoPlayer.controls) {
				this.videoPlayer.controls = false;
			} else {
				this.videoPlayer.controls = true;
			}
		}
	};

	this.videoStop = function() {
		try {
			if (this.canhtml5) {
				if (typeof this.trailerPlayer !== "undefined" && this.trailerPlayer !== null) {
					this.trailerPlayer.stop();
				}
				this.videoPlayer.stop();
			}
		} catch(err) {}
	};

	function videoView(scene_id) {
		$.ajax({
			'type'	: "POST",
			'url'	: '/ajax/viewVideo.php',
			'data'	: {
				'id'	: scene_id
			}
		});
	};

	function displayJoin() {
		$('#trailer_flash_cont').hide();
		$('#trailer_html5_cont').hide();
		$('#trailer_tab .video_info').hide();
		$('#join').fadeIn(250);
	};

	function displayNoStream() {
		var $nostreampic = $('#nostreampic'),
			$notrailer = $('#notrailer');
		$('#trailer_flash_cont').hide();
		$('#trailer_html5_cont').hide();
		$('#trailer_tab .video_info').hide();
		$('#video_flash_cont').hide();
		$('#video_html5_cont').hide();
		$nostreampic.css('background-image', 'url(\'' + $nostreampic.data('background') + '\')');
		$('#nostreampic').show();
		$notrailer.css('background-image', 'url(\'' + $notrailer.data('background') + '\')');
		$('#notrailer').show();
		$('.user_actions').hide();
		$('.jumpto').hide();
	}
}

VideoPlayer.getInstance = function() {
	return new VideoPlayer(isFlashEnabled());
};

(function($) {
	'use strict';

	$().ready(function() {
		if ( ! $('#sets_details').length) {
			return false;
		}

		var player = VideoPlayer.getInstance();
		player.initVideo();

		$('#read_full_story').on('click', function(e) {
			var $btn	= $(this),
				$story	= $('#sets_story');
			if ($story.css('height') === '50px') {
				var auto_height = $story.css('height', 'auto').height();
				$story.height($story.height()).animate({'height' : auto_height});
			} else {
				$story.animate({'height' : '50px'});
			}
			if ($btn.hasClass('more')) {
				$btn.removeClass('more').addClass('less');
			} else {
				$btn.removeClass('less').addClass('more');
			};
			e.preventDefault();
		});

		$('.scrollable').mCustomScrollbar({
			autoDraggerLength	: true,
			advanced			: {
				updateOnBrowserResize	: true,
				updateOnContentResize	: true
			},
			theme				: 'dark-thick'
		});

		$('a.tooltip_event').on('click', function(e){
			e.preventDefault();
		});

		$('.tooltip_event[title]').tooltip({
			'position'	: 'top center',
			'offset'	: [10, 2],
			'effect'	: 'toggle',
			'tipClass'	: 'memberonly'
		});

		$('#play_trailer').on('click', function(e) {
			var $btn		= $(this),
				url			= $btn.data('trailerurl'),
				current		= player.trailerPlayer.getTime();
			if (url.match(/\_1080/gi)){
				$btn.data('trailerurl', url.replace(/\_1080/gi, ''));
				$btn.html($btn.html().replace(/HD/gi, 'SD'));
				$btn.data('ga_label', $btn.data('ga_label').replace(/HD/gi, 'SD'));
			} else {
				$btn.data('trailerurl', url.replace(/\.mp4/gi, '_1080.mp4'));
				$btn.html($btn.html().replace(/SD/gi, 'hd'));
				$btn.data('ga_label', $btn.data('ga_label').replace(/SD/gi, 'HD'));
			}
			if (isFlashEnabled()) {
				player.jumpTo('flash', 'trailer', current, url);
			} else {
				player.jumpTo('html5', 'trailer', current, url);
			}
			e.preventDefault();
		});

		if (isFlashEnabled()){
			$('#trailer_flash_cont').show();
			$('#trailer_html5_cont').hide();
		} else {
			$('#trailer_flash_cont').hide();
			$('#trailer_html5_cont').show();
		}

		var height = $('#sets_data').height();
		$('#sets_data').css('height', height);

	});

}(jQuery));

// like, favorite button action
(function($, w) {
	'use strict';

	$().ready(function() {
		if ( ! $('#member_side').length) {
			return false;
		}

		$('#btn_like').on('touchstart click', function(e) {
			var track = {
				0 : 'dislike',
				1 : 'like'
			};
			user_action($(this), 'like', 'like_button', track);
			e.preventDefault();
		});

		$('#btn_favorite').on('touchstart click', function(e) {
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
			sid			= $this.data('sid'),
			ga_label	= $this.data('ga_label'),
			rplcto		= (mode==='add' ? track[0] : track[1]);

		if (ga_label) ga_label = ga_label.replace(/unfavorite|favorite|dislike|like/gi, rplcto);
		$.ajax({
			'type'	: "POST",
			'url'	: '/ajax/' + url + '.php',
			'data'	: {
				'set_id'	: sid,
				'mode'		: mode,
				'data_for'	: 'set'
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
				if (url === 'like' ) {
					$('#sets_details #like_info_data').html(rsp.like_cnt);
				}
			}
		});
	}

}(jQuery, window));

// navigation with tabs
(function($, w, linkGen, p) {
	'use strict';

	$().ready(function() {
		if ( ! $('#member_side').length) {
			return false;
		}

		$('.nav-tabs').find('a').on('touchstart click', function(e) {
			var $btn	= $(this),
				ul		= $btn.parent().parent();
			if ($btn.attr('href') === '#') {
				return;
			}
			if( $btn.hasClass('nohref') ) {
				e.preventDefault();
				return;
			}
			p.videoStop();
			ul.find('li').removeClass('active');
			$btn.parent().addClass('active');

			$('.' + ul.data('content')).hide();
			$($btn.attr("href") + '_content').show();

			if ($btn.attr("href") === "#video_tab" && p.canhtml5) {
				$('#sets_details .user_actions').show();
				$('#sets_details .jumpto').show();
				$('#sets_details .user_photo_actions').hide();
			} else if ($btn.attr("href") === "#pics_tab") {
				$('#sets_details .user_actions').hide();
				$('#sets_details .jumpto').hide();
				$('#sets_details .user_photo_actions').show();
				carousel_load();
			} else if (ul.data('content') === 'sets_content_area') {
				$('#sets_details .user_actions').hide();
				$('#sets_details .jumpto').hide();
				$('#sets_details .user_photo_actions').hide();
			} else if (ul.data('content') === 'download_data_content') {
				var $download_select = $('#download_select');
				$download_select.css('top', -($download_select.height() + 1));
				$($btn.attr("href")).show();
			}
		});

		txtarea_scrolling(	$('.add_comment .set_comment_layout_textarea'),
							$('.add_comment .scrollable')
		);

		leave_comment($('.add_comment .leave_set_comment_btn'));

		var tab = w.location.href.match(/\#(pics|trailer|video)_tab/gi);
		if (tab) {
			$('a[href="' + tab[0] + '"]').click();
		}
	});

	function txtarea_scrolling($obj, $scroll) {
		$obj.on('keyup', function() {
			var $this = $(this),
				lb = $this.val().match(/\n/g);
			$this.attr('rows', (lb && lb.length > 4 ? lb.length + 4 : 4));
			$this.scrollTop($this.height());
			$scroll.mCustomScrollbar("update");
			$scroll.mCustomScrollbar("scrollTo", "bottom");
		});
	}

	function leave_comment($obj) {
		$obj.on('touchstart click', function(e) {
			var $this = $(this),
				txtarea = $this.parent().parent().find('.set_comment_layout_textarea');
				console.log($this);
			$.ajax({
				'type'	: "POST",
				'url'	: '/ajax/add_comment.php',
				'data'	: {
					'scene_id'		: $this.data('id'),
					'mode'			: 'add',
					'comment_for'	: 'scene',
					'comment_text'	: txtarea.val()
				}
			}).done(function(rsp) {
				if (rsp.success) {
					$.ajax({
						'url'	: linkGen.get_render_tpl('comment'),
						'cache'	: true
					}).done(function(template) {
						$('.' + $this.data('layer'))
								.html($.templates(template).render(rsp))
								.mCustomScrollbar({
									autoDraggerLength	: true,
									advanced			: {
										updateOnBrowserResize	: true,
										updateOnContentResize	: true
									},
									theme				: 'dark-thick'
								});
					});
					txtarea.val('');
				}
			});
			e.preventDefault();
		});
	}

}(jQuery, window, LinkGenerator, VideoPlayer.getInstance()));


function carousel_load() {

	if ($('#member_side #photo_content').find('ul').length) {
		$('#member_side #photo_content').find('ul').carouFredSel({
			'direction'	: 'right',
			'circular'	: false,
			'auto'		: false,
			'items'		: 1,
			'height'	: 760,
			'next'		: {
				'button'	: '#photos_scroll_next',
				'items'		: 1,
				'duration'	: 400,
				'onBefore'	: scrollOnBefore
			},
			'prev'		: {
				'button'	: '#photos_scroll_prev',
				'items'		: 1,
				'duration'	: 400,
				'onBefore'	: scrollOnBefore
			},
			'onCreate'	: function(data){
				preLoadAnchor($(data.items[0]).find('a'));
			}
		});
	}
}

function scrollOnBefore(data) {
	data.items.visible.each(function() {
		preLoadAnchor($(this).find('a'));
	});
}

function preLoadAnchor(anchs) {
	anchs.each(function() {
		if ($(this).css('backgroundImage') === 'none') {
			$(this).css('backgroundImage', 'url(' + $(this).data("background") + ')');
		}
	});
}


// show pictures funcs
(function($, w) {
	'use strict';

	$().ready(function() {
		if ( ! $('#member_side').length) {
			return false;
		}

		$('#btn_download_pics').tooltip({
			'position'	: 'top center',
			'offset'	: [0, 2],
			'effect'	: 'toggle',
			'tipClass'	: 'download_pics_tooltip'
		});

		$('#viewing_options').find('a').on('touchstart click', function(e) {
			var $btn = $(this),
				mode = $btn.data('mode');
			$btn.parent().find('a').removeClass('used_button');
			$btn.addClass('used_button');


			$.post("/ajax/setUserAttr.php", { action: "photobrowser", value: mode });

			if (mode === 'cooliris') {
				$('#photo_content').hide();
				$('#wall-container').show();
			} else {
				$('#photo_content ul').find('a').each(function() {
					$(this).attr('href', $(this).data(mode));
					if (mode === 'regular') {
						$(this).removeClass('lightb');
					} else if ( ! $(this).hasClass('lightb')) {
						$(this).addClass('lightb');
					}
				});
				$('#photo_content').show();
				$('#wall-container').hide();
			}
			e.preventDefault();
		});

		if ($('#member_side .cooliris_content').length) {
			var scene_id = $('#wall').data('scene_id'),
				flashvars = {
					'feed'			: '/member-mrss/' + scene_id,
					'glowColor'		: 'CC0000',
					'showEmbed'		: 'false',
					'showItemEmbed'	: 'false',
					'showSearch'	: 'false',
					'showTutorial'	: 'false',
					'style'			: 'light'
				},
				params = {
					'allowFullScreen'	: 'true',
					'allowscriptaccess'	: 'always',
					'wmode'				: 'opaque'
				};
			$('head').append('<script type="text/javascript" src="/js/swfobject.js"></script>');
			swfobject.embedSWF('/swf/cooliris.swf', 'wall', '100%', '580', '9.0.0', '', flashvars, params);
		}

		use_fancy($('#photo_content .lightb'));

	});

	function use_fancy($obj) {
		$obj.fancybox2({
			'openEffect'		: 'none',
			'nextEffect'		: 'none',
			'prevEffect'		: 'none',
			'closeEffect'		: 'none',
			'wrapCSS'			: 'member_set_fancy',
			'helpers'			: {
				'title'			: {
					'type'		: 'inside'
				},
				'overlay'		: {
					'css'		: {
						'background'	: 'url("/images/bg_black_transparent.png")'
					}
				}
			},
			'afterLoad'			: function() {
				/*$('.member_set_fancy').bind("contextmenu", function (e) {
					return false;
				});*/
				this.title = this.element.data('title');
			}
		});
	}



}(jQuery, window));

// streaming, quality change funcs
(function($, p){
	'use strict';

	$().ready(function() {
		if ( ! $('#member_side').length) {
			return false;
		}

		$('#btn_change_quality').on('touchstart click', function(e) {
			video_data_action($(this), 'download_select');
			e.preventDefault();
		});

		$('#btn_download_video').on('touchstart click', function(e) {
			video_data_action($(this), 'quality_select');
			e.preventDefault();
		});

		$('#download_select').find('a').on('touchstart click', function() {
			var $btn = $(this);
			if ( ! $btn.hasClass('nohref')) {
				p.controlsToggle();
				$('#download_select').hide();
				$('#btn_download_video').removeClass('used_button');
			} else {
				var $download_select	= $('#download_select'),
					ul					= $btn.parent().parent();
				ul.find('li').removeClass('active');
				$btn.parent().addClass('active');
				$('.download_data_content').hide();
				$($btn.attr("href")).show();
				$download_select.css('top', -($download_select.height() + 1));
			}
		});

		$('#quality_select .play_video').on('click', function(e) {
			var $btn		= $(this),
				url			= $btn.data('videourl'),
				html5url	= $btn.data('html5videourl'),
				current		= p.videoPlayer.getTime();
			$btn.parent().parent().find('li').removeClass('playing');
			$btn.parent().addClass('playing');
			p.controlsToggle();
			$('#sets_details .member_side .quality_select').hide();
			$('#sets_details .member_side .change_quality_button').removeClass('used_button');

			if (isFlashEnabled()) {
				p.jumpTo('flash', 'video', current, url);
			} else {
				p.jumpTo('html5', 'video', current, html5url);
			}
			e.preventDefault();
		});


		if (isFlashEnabled()) {
			$('#video_flash_cont').show();
			$('#video_html5_cont').hide();
		} else {
			$('#video_flash_cont').hide();
			$('#video_html5_cont').show();
		}

	});

	function video_data_action($btn, element_id) {
		var $quality_select		= $('#quality_select'),
			$download_select	= $('#download_select'),
			$check_visibility	= $('#' + element_id);
		if (p && ! $check_visibility.is(':visible')) {
			p.controlsToggle();
		}
		if (element_id === 'download_select') {
			$quality_select.css('top', -($quality_select.height() + 1));
			$quality_select.toggle();
			$download_select.hide();
			$('#btn_download_video').removeClass('used_button');
		} else {
			$download_select.css('top', -($download_select.height() + 1));
			$download_select.toggle();
			$quality_select.hide();
			$('#btn_change_quality').removeClass('used_button');
		}
		if ($btn.hasClass('used_button')) {
			$btn.removeClass('used_button');
		} else {
			$btn.addClass('used_button');
		};
	}

}(jQuery, VideoPlayer.getInstance()));

// jump to funcs
(function($, p) {
	'use strict';

	$().ready(function() {
		if ( ! $('#member_side').length) {
			return false;
		}

		$('#jump_to_taglist .jump_to_tag_data').on('mouseover', function() {
			$('.tag_group_' + $(this).data('group_id')).addClass('active');
		});

		$('#jump_to_taglist .jump_to_tag_data').on('mouseout', function() {
			clear_selection();
		});

		$('#jump_to_taglist .jump_to_link').on('mouseover', function() {
			var $this = $(this);
			$('#jump_to_tag_' + $this.data('group_id') + '_' + $this.data('key_id')).addClass('selected');
		});

		$('#jump_to_taglist .jump_to_link').on('mouseout', function() {
			clear_selection();
		});

		$('#jump_to_taglist .jump_to_link').on('touchstart click', function(e) {
			var seek_to = $(this).data('seek');
			if (isFlashEnabled()) {
				p.jumpTo('flash', 'video', seek_to, false);
			} else {
				p.jumpTo('html5', 'video', seek_to, false);
			}
			e.preventDefault();
		});

/*		$('#jump_to_taglist .jump_to_link').tooltip({
			'position'	: 'down center',
			'offset'	: [58, 0],
			'effect'	: 'toggle',
			'tipClass'	: 'jump_to_tooltip'
		});*/


	});

	function clear_selection() {
		$('#jump_to_bar .active').removeClass('active');
		$('#jump_to_bar .selected').removeClass('selected');
	}

}(jQuery, VideoPlayer.getInstance()));

// regular pic shown
(function($) {
	$().ready(function() {
		if ( ! $('.member_regular_photo_show').length ){ return false; }

		$('.member_regular_photo_show .size_selector .size_selector_button').on('click', function(e) {
			var $size_select		= $('.member_regular_photo_show .size_selector .size_select'),
				$size_select_bottom = $('.member_regular_photo_show .size_selector .bottom');
			$size_select_bottom.css('top', -($size_select_bottom.height()) + 10);
			$size_select.toggle();
			e.preventDefault();
		});

		$('.disabled').on('click', function(e) {
			e.preventDefault();
		});

	});
}(jQuery));
