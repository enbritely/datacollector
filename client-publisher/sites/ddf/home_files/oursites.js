$(document).ready(function() {
	$('.site-screenshot-text').click(function() {
		animUp(this);

		if ($(this).hasClass('opened')) {
			animDown(this);
			$(this).removeClass('opened');
		} else {
			$(this).addClass('opened');
		}
	});

	$('.site-description').hide();
	$('.site-description-mod').hide();

	function animUp(this_) {
		$(this_).animate({marginTop: '-130px'}, {
			step: function( now, fx ) {
				if( fx.pos > 0.5 ){
					if ($(this).children().hasClass('site-description-mod')) {
						$(this_).children('.site-description-mod').show();
					} else {
						$(this_).children('.site-description').show();
					}
					$(this_).parent().children('.site-photo-a').children('.site-photo').hide();
					$(this_).children('.site-about').children('.popup_arrow')
							.attr('src', "/images/popup_arrow_down.jpg");
				}
			}
		});
	}

	function animDown(this_) {
		$(this_).animate({marginTop: '0px'}, {
			step: function( now, fx ) {
				if( fx.pos > 0.5 ){
					if ($(this).children().hasClass('site-description-mod')) {
						$(this_).children('.site-description-mod').hide();
					} else {
						$(this_).children('.site-description').hide();
					}
					$(this_).parent().children('.site-photo-a').children('.site-photo').show();
					$(this_).children('.site-about').children('.popup_arrow')
							.attr('src', "/images/popup_arrow_up.jpg");
				}
			}
		});
	}

	$('.video').click(function() {
		var	videourl  = '',
			preview   = jQuery(this).data('preview'),
			licence   = jQuery(this).data('licence'),
			supported = jQuery(this).data('supported'),
			content   = '';

		if (supported === 1) {
			videourl += jQuery(this).data('videourl');
			content += '<a id="flash_container" style="display:block;width:960px;height:540px;"></a>';
		} else {
			videourl += jQuery(this).data('videourlflash');
			content += '<div id="player" style="width:960px;margin:0 auto;" itemprop="trailer" itemscope itemtype="http://schema.org/VideoObject">' +
					'<meta itemprop="contentUrl" content="' + videourl + '" />' +
					'<meta itemprop="isFamilyFriendly" content="false" />' +
					'<span itemprop="thumbnail" itemscope itemtype="http://schema.org/ImageObject">' +
					'<meta itemprop="contentUrl" content="' + preview + '" />' +
					'</span>' +
					'<meta itemprop="encodingFormat" content="mp4" />' +
					'<meta itemprop="requiresSubscription" content="false" />' +
					'<video id="video_player" width="960" height="540" controls="controls" poster="' + preview + '" onended="goJoinPage();">' +
					'<source src="' + videourl + '" type="video/mp4" />' +
					'</video>' +
					'</div>';
		}

		jQuery.fancybox2.open({
			fitToView	: false,
			width		: '960px',
			height		: '550px',
			padding		: 10,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none',
			content		: content
		});
		jQuery('#hide_flash_layer').on('click', function(){
			jQuery('.fancybox2-close').click();
		});
		if (supported === 1) {
			flowplayer("flash_container", "/swf/flowplayer.commercial-3.2.18.swf", {
				key		: licence,
				wmode	: 'opaque',
				clip	: {
					provider	: 'http',
					url			: videourl,
					accelerated	: true,
					onFinish	: function() {
						window.location.href = join_url;
					}
				},
				width	: 960,
				height	: 540
			}).play();
		} else {
			document.getElementById('video_player').addEventListener('ended', function() {
				window.location.href = join_url;
			});
		}
	});

});