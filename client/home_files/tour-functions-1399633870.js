function getInternetExplorerVersion(){
	var rv = -1; // Return value assumes failure.
	if (navigator.appName === 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) !== null) rv = parseFloat(RegExp.$1);
	}
	return rv;
}

function checkVersion(){
  var ver = getInternetExplorerVersion();
  if ((ver > -1) && (ver < 7.0)) {
	  alert("You should upgrade your copy of Internet Explorer.");
  }
}

function autoCompleteModelSearch(e){
  if (e.length >= 2) {
	  $.post('/ajax/inlineModelSearch.php', {'in' : e}, function(data){
		  if (data !== '') {
			  showModelSuggestions(data);
			  //alert(data);
		  }
	  });
  } else {
	  hideModelSuggestions();
  }
}

function showModelSuggestions(d) {
	$('.modelSuggestionsHolder').fadeIn(100);
	$('.modelSuggestionsHolder').html(d);
}

function hideModelSuggestions() {
	$('.modelSuggestionsHolder').fadeOut(100);
	$('.modelSuggestionsHolder').html('');
}

function slideSwitch() {
	var fadeTime = 500;
	var $active = $('.slideshow img.active');
	if ($active.length === 0){
		$active = $('.slideshow img:last');
	}
	var $next =  ($active.next().length ? $active.next() : $('.slideshow img:first'));
	$active.addClass('last-active');
	$next.css({opacity: 0.0}).addClass('active').animate({opacity: 1.0}, fadeTime, function() {
		$active.removeClass('active last-active');
	});
}

function videoView(set_id) {
	$.post(siteurl + '/ajax/viewVideo.php', {'id' : set_id});
}

function displayJoin() {
	$("#video_flash_cont").hide();
	$("#video_html5_cont").hide();
	$("#video_tab .video_info").hide();
	$("#join").fadeIn(250);
}

function isImgLoaded(img){
	if( ! img.attr('complete')) {
		//for IE
		//alert(img.attr('src')+'IE false, complete: '+img.attr('complete'));
		return false;
	} else if ((img.attr('complete') !== 'undefiend') &&
				(img.attr('naturalWidth') === 0 || img.attr('width') === 0 || img.attr('width') < 50)) {
		//for FF
		return false;
	}
	return true;
}

function CheckForm(f) {
	var email_re = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
	if ( ! email_re.test(f.email.value)) {
		alert("Please enter your email address.");
		f.email.focus();
		return false;
	}
	return true;
}

// DropDown menu
var closetimer = new Array();
closetimer[0] = 0;
closetimer[1] = 0;

function showSubmenu(e, f) {
	cancelTimeout(f);
	jQuery(e).css('display', 'block');
}

function hideSubmenu(e) {
	jQuery(e).css('display', 'none');
}

var closetimer = null;
function closeTimeout(e, f) {
	closetimer[f] = setTimeout('hideSubmenu(\'' + e + '\')', 500);
}

function cancelTimeout(e) {
	if( closetimer[e] ) {
		window.clearTimeout(closetimer[e]);
		closetimer[e] = null;
	}
}

function repositionFixed() {
	// repositions fixed elements on the page
	// used for ipad / ipod / iphone

	joinbutn = document.getElementById('join-button-left');
	langob = document.getElementById('languages');
	qrcode = document.getElementById('qrcode');

	var wheight = $(window).height();

	if (joinbutn) joinbutn.style.position = 'absolute';
	if (langob) langob.style.position = 'absolute';
	if (qrcode) qrcode.style.position = 'absolute';

	if (orientation === 90 || orientation === -90) {
		if (joinbutn) joinbutn.style.top = (window.pageYOffset + (wheight / 2 - 100)) + 'px';
		if (langob) langob.style.top = (window.pageYOffset + 35) + 'px';
		if (qrcode) qrcode.style.top = (window.pageYOffset + wheight / 2 ) + 180 + 'px';
	} else {
		if (joinbutn) joinbutn.style.top = (window.pageYOffset + (wheight / 2 - 120)) + 'px';
		if (langob) langob.style.top = (window.pageYOffset + 35) + 'px';
		if (qrcode) qrcode.style.top = (window.pageYOffset + wheight * 0.9 ) + 5 + 'px';
	}
}

if (navigator.platform === 'iPad' || navigator.platform === 'iPhone' || navigator.platform === 'iPod') {
	window.onscroll = repositionFixed;
	window.onorientationchange = repositionFixed;
};

function setFragment(key, value) {
	var frag = '#' + key + ':' + value;
	var hash = getFragment();
	if (hash === frag) {
		return false;
	} else {
		window.location.hash = frag;
		prevstate = key + ':' + value;
	}
}

function getFragment() {
	if (window.location.hash !== false) {
		return window.location.hash;
	}
	return false;
}

function tourSetStoryPage(pg, frag) {
	if (frag !== false) {
		setFragment('txt-page', pg);
	}
	var result = $('div#search_result');
	var txt = escape($('input#search_text').val());
	$.post(
			'/ajax/tourSetSearchByText.php',
			{
				text: txt,
				page: pg
			}, function(data) {
				if (data !== '') {
					result.html(data);
				}
			}
	);
}

// DOM Ready

var updates_page = 5;
var models_page = 3;
var comingsoon_page = 2;

$(document).ready(function(){

	// Latest updates loading
	$('a.latest_updates_btn').click(function() {
		var $buttons = $('a.latest_updates_btn');
		if ($buttons.hasClass('onajax')) {
			return false;
		}
		$('a.latest_updates_btn').addClass('onajax');
		$.ajax({
			'type'		: 'GET',
			'url'		: '/ajax/tour_get_updates.php',
			'data'		: { 'page'	: updates_page },
			'dataType'	: 'json'
		}).done(function(json) {
			$('a.latest_updates_btn').removeClass('onajax');
			if ( ! json.there_is_more) {
				$('a.latest_updates_btn').fadeOut();
			}
			var height = $('.photo-set.front-vertical').height() + 21;
			$('#latest-updates').animate({'height': '+=' + height + 'px'}, 'slow').append(json.html);
			updates_page++;
			var object_count = $('#latest-updates .photo-set.front-vertical').length;
			$.scrollTo('#latest-updates .photo-set.front-vertical:eq(' + (object_count - 2) + ')', 1000);
		});
	});

	// Top models load more
	$('a.more_models_btn').click(function() {
		var $buttons = $('a.more_models_btn');
		if ($buttons.hasClass('onajax')) {
			return false;
		}
		$('a.more_models_btn').addClass('onajax');
		$.ajax({
			'type'		: 'GET',
			'url'		: '/ajax/tour_get_models.php',
			'data'		: { 'page'	: models_page },
			'dataType'	: 'json'
		}).done(function(json) {
			$('a.more_models_btn').removeClass('onajax');
			if ( ! json.there_is_more) {
				$('a.more_models_btn').fadeOut();
			}
			var height = $('.model-portrait').height();
			$('#top_models').animate({'height' : '+=' + height + 'px'}, 'slow').append(json.html);
			models_page++;
			var object_count = $('top_models .model-portrait').length;
			$.scrollTo('#top_models .model-portrait:eq(' + (object_count - 2) + ')', 1000 );
		});
	});

	// Coming soon ... load more
	$('a.more_comingsoon_btn').click(function() {
		var $buttons = $('a.more_comingsoon_btn');
		if ($buttons.hasClass('onajax')) {
			return false;
		}
		$('a.more_comingsoon_btn').addClass('onajax');
		$.ajax({
			'type'		: 'GET',
			'url'		: '/ajax/tour_get_comingsoon.php',
			'data'		: { 'page' : comingsoon_page },
			'dataType'	: 'json'
		}).done(function(json) {
			$('a.more_comingsoon_btn').removeClass('onajax');
			if ( ! json.there_is_more) {
				$('a.more_comingsoon_btn').fadeOut();
			}
			var height = $('.comingsoon .photo-set.front-vertical').height();
			$('#coming-soon').animate({'height' : '+=' + height + 'px'}, 'slow').append(json.html);
			comingsoon_page++;
			var object_count = $('#coming-soon .photo-set.front-vertical').length;
			$.scrollTo('#coming-soon .photo-set.front-vertical:eq(' + (object_count - 2) + ')', 1000);
		});
	});

	// Display Login form event
	$('a#login_btn').click(function() {
		if ($('#loginform').length === 0) {
			$('#container').append('<div id="loginform"></div>');
		}
		$('#loginform').load('/ajax/login.php', {}, function() {
			$('#loginform').fadeIn(250);
		});
	});
	// Display Login form event end

    $("#email_submit").click(function(r) {
		var email = $("#sing_up_nl").val();
		var code = $("#safe_code").val();

		var email_valid = validate(email);
		if (email_valid) {
			$.post('ajax/checkCode.php', {'code' : code}, function(data) {
				if (data === "1") {
					$.post('ajax/subScribe.php', {'email' : email}, function(data) {
						if (data === "1") {
							alert("Succesfull signup.");
						}
					});
				} else {
					alert("Try again later.");
				}
			});
		} else {
			alert("Invalid Email Address");
		}
	});

	$('a.preview').fancybox({
		'hideOnContentClick'	: true,
		'hideOnOverlayClick'	: true,
		'centerOnScroll'		: true,
		'overlayShow'			: false
	});

	$('.fancybox a').click(function() {
		fancybox_url = $(this).find('span.fancybox_modelpic_url');
		if (fancybox_url && fancybox_url.html()) {
			img_url = fancybox_url.html();
		} else {
			img_url =  $(this).find('img').attr('src');
		}

		obj = $.fancybox({
			'href'	:	img_url,
			'title'	:	$(this).attr('title')
		});
		return false;
	});

	$("#ddfcarousel").jcarousel({
		'wrap'	: 'both'
	});

	$("#feats-carousel").jcarousel({
		'wrap'	: 'both'
	});

	$('input.models').click(function() {
		var act = "remove";
		var result = $('div#search_result');
		result.html("Searching ...");
		var search = new Array();
		$('input:checked').each(function(i) {
			var e = $(this);
			var id = e.attr('id').split("-", 2);
			id = id[1];
			search[i] = id;
		});
		$.post('/ajax/tourModelSearchByKeyword.php', {'kwid' : search }, function(data) {
			if (data !== '') {
				result.html(data);
			}
		});
	});

	$('input.scenes').click(function() {
		var act = "remove";
		var result = $('div#search_result');
		result.html("Searching ...");
		var search = new Array();
		$('input:checked').each(function(i) {
			var e = $(this);
			var id = e.attr('id').split("-", 2);
			id = id[1];
			search[i] = id;
		});
		$.post('/ajax/tourSetSearchByKeyword.php', {'kwid' : search}, function(data) {
			if (data !== '') {
				result.html(data);
			}
		});
	});

	// Disable Enter in search field
	$('input#search_text').keydown(function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			$('input#search_btn').click();
		}
	});

	$('input#search_btn').click(function() {
		var result = $('div#search_result');
		var txt = escape($('input#search_text').val());
		result.html("Searching ...");
		$.post('/ajax/tourSetSearchByText.php', {'text' : txt}, function(data){
			if (data !== '') {
				result.html(data);
			}
		});
	});

	$("#putincart").click(function(r) {
		var csetid = $("#csetid").val();
		$.post('/ajax/putincart.php', {'csetid' : csetid}, function(data) {
			alert(data);
		});
	});

	$(".removefromcart").click(function(r) {
		var which = $(this).attr('id').split('_');
		$.post('/ajax/removefromcart.php', {'csetid' : which[1]}, function(data) {
			if (data !== '') {
				alert(data);
			} else {
				window.location.reload();
			}
		});
	});

	$('.signedsmall').click(function() {
		var tmp = $(this).attr('id').split('_');
		$('#signedbig').attr('src', '/images/signed-' + tmp[1] + '-big.jpg');
	});

	$('.signedsmall').hover(
			function() {
				$(this).css('cursor','pointer');
			},
			function() {
				$(this).css('cursor','normal');
			}
	);

	$('.ecpic').click(function() {
		var tmp = $(this).attr('id').split('_');
		$('#whichec').attr('src', 'images/ecards/ecard-eveangel-' + tmp[1] + '.jpg');
		$('#ecardlink').val('ecard-eveangel-' + tmp[1] + '.jpg');
	});

	$('.ecpic').hover(
			function() {
				$(this).css('cursor','pointer');
			},
			function() {
				$(this).css('cursor','normal');
			}
	);

	$('.ecsend').click(function() {
		var emtest = new RegExp("^[\_]*([a-z0-9]+(\.|\_*)?)+@([a-z][a-z0-9\-]+(\.|\-*\.))+[a-z]{2,6}$");
		if ($('#fname').val() !== '' && $('#yname').val() !== '' && $('#femail').val() !== '' &&
				$('#yemail').val() !== '' && $('#ecardlink').val() !== '' &&
				emtest.test($('#femail').val()) === true && emtest.test($('#yemail').val()) === true) {
			$.post(
					siteurl + '/ajax/sendmail.php',
					{
						'ajax_action'	: 'ecard',
						'femail'		: $('#femail').val(),
						'fname'			: $('#fname').val(),
						'yemail'		: $('#yemail').val(),
						'yname'			: $('#yname').val(),
						'ecard'			: $('#ecardlink').val(),
						'message'		: $('#ymessage').val()
					},
					function(data) {
						eval(data);
					}
			);
		} else {
			alert('All fields are mandatory!');
			return false;
		}
	});

	$('.spa').click(function() {
		$('#wallpaperdiv').css('display', 'none');
		$('#ecarddiv').css('display', 'none');
		$('#signedphotodiv').css('display', 'block');
	});

	$('.wpa').click(function() {
		$('#wallpaperdiv').css('display', 'block');
		$('#ecarddiv').css('display', 'none');
		$('#signedphotodiv').css('display', 'none');
	});

	$('.eca').click(function() {
		$('#wallpaperdiv').css('display', 'none');
		$('#ecarddiv').css('display', 'block');
		$('#signedphotodiv').css('display', 'none');
	});

	checkVersion();

	$('#modelname').keyup(function() {
		autoCompleteModelSearch($(this).val());
	});

});

(function($) {
	var overflowScrollerClass = function(that, $this) {
		var this_width   = $this.width(),
			parent_width = $this.parent().width(),
			scroll_width = this_width - parent_width;

		$this.data('overflow_scroller_size', scroll_width);
		if (scroll_width > 0) {
			$this.on('mouseenter', function() {
				if ( ! $this.hasClass('animated_to_left') && ! $this.is(':animated')) {
					$this.addClass('animated_to_left');
					var size = parseInt($this.data('overflow_scroller_size'));
					$this.animate({'left' : '-=' + size}, 300);
				}
			}).on('mouseleave', function() {
				if ($this.hasClass('animated_to_left')) {
					$this.removeClass('animated_to_left');
					var size = parseInt($this.data('overflow_scroller_size'));
					$this.animate({'left' : '+=' + size}, 300);
				}
			});
		}
	};

	$.fn.overflowScroller = function() {
		$(this).each(function() {
			new overflowScrollerClass(this, $(this));
		});
	};
})(jQuery);

$(document).ajaxComplete(function() {
	$('.overflow_scroller').overflowScroller();
});

$().ready(function() {
	$('.overflow_scroller').overflowScroller();
});

/* ********************************************************************************** WARNING *** */
$().ready(function() {
	$('.warning_login').on('click', function() {
		$('#warning_login_form').fadeIn();
	});
});