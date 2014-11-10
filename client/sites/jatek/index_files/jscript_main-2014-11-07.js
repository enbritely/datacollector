(function($){

    //először tüntessük el a szükségtelen form-okat
    $forms = $('button.addShoppingCart');
    $.each($forms, function(i,item) {
       $form = $(item).parent("form");
       $content = $form.contents().clone();
       $form.replaceWith($content);
    });



    //csak szám mezők
    $(".only_num").keydown(function (e) {
        var allow;
        //delete, tab, backspace, enter
        allow = [46, 8, 9, 13];


        if ($.inArray(e.keyCode, allow) !== -1 ||
             //Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             //home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });


    $('a[href^="mailto:"]').each(function() {
      this.href = this.href.replace('(kukac)', '@').replace(/\(pont\)/g, '.');
      // Remove this line if you don't want to set the email address as link text:
      this.innerHTML = this.href.replace('mailto:', '');
     });

    var hoverTimer;
    $('#hdr_menu li').hover(
        function() {
            var that = this;
            hoverTimer = setTimeout(function(){$('.submenu', that).fadeIn(300)}, 200);
        },
        function() {
            clearTimeout(hoverTimer);
            $('.submenu', this).fadeOut(0);
        }
    );

    $.ajax({
        url: location.origin ? location.origin + '/dropdown.php' : location.protocol + "//" + location.hostname + '/dropdown.php',
        async: true,
        dataType: 'html',
        success: function(msg) {
//            console.log(msg);
            $('#categories_menu').html($(msg).find('#toys_drop'));
            $('#brands_menu').html($(msg).find('#brands_drop'));
            $('#heroes_menu').html($(msg).find('#heroes_drop'));
            $('#specials_menu').html($(msg).find('#spec_drop'));


            $('#specials_menu').css('display', 'block');
            var boxes = $('#specials_menu #products_list .box');
            var maxHeight = 0;
            $.each(boxes, function(i, item) {
                maxHeight = Math.max(maxHeight, $(item).height());
            });
            maxHeight += 40;
            $('#specials_menu').css('display', 'none');
            $('#hdr_menu li #specials_menu').css({height: maxHeight + 'px'});

        }
    });

    //tab/mobil > ne ugorjon el a felső menüre
    $('body.mobile').on('click', 'ul#hdr_menu>li>a', function() {
        if ($(this).parent('li').index() == 0) {
            return true;
        } else {
            return false;
        }
    });

    $('form#fSearch').submit(function() {
        if ($('#keyword', this).val() == '') {
            return false;
        }
    });


    $('body').on('submit', 'form.search_by', function() {
       $('p.searchAlertTxt').remove();
       var options = new Array();
       $.each($('select', this), function(i, item) {
        if ($(item).val() != "-1") {
            options.push($(item).data('name') + '_' + $(item).val());
        }
       });
       if (options.length == 0) {

        var alert = $('<p/>').text('Legalább egy szűkítési feltételt meg kell adj!').addClass('searchAlertTxt');
        if ($(this).parent().hasClass('gamesearch')) {
            $(alert).addClass('fix');
        }
        var line = $(alert).appendTo(this);
        $(line).delay(7000).fadeOut(700);
        //setTimeout(function(){$(line).fadeOut(700)}, 7000);
        return false;
       }

       $('input[name=f]', this).val(options.join('-'));
       return true;
    });




window.onscroll = function (event) {
  var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  if (top > 15) {
    $('header').addClass('scrolled');
  } else {
    $('header').removeClass('scrolled');
  }
}


$('#profile a').hover(
    function() {
        $('#account_submenu').css({display: 'block'});
    },
    function() {
        setTimeout(function() {checkHover('#account_submenu', '#profile a')}, 300);
    }
);

$('#account_submenu').hover(
    function() {
        $(this).css({display: 'block'});
    },
    function() {
        setTimeout(function() {checkHover('#account_submenu', '#profile a')}, 300);
    }
);

$('#cs a').hover(
    function() {
        $('#info_submenu').css({display: 'block'});
    },
    function() {
        setTimeout(function() {checkHover('#info_submenu', '#cs a')}, 300);
    }
);

$('#info_submenu').hover(
    function() {
        $(this).css({display: 'block'});
    },
    function() {
        setTimeout(function() {checkHover('#info_submenu', '#cs a')}, 300);
    }
);


    //ebben van egy csomó fontos analytics-es marhaság is!!!!
    var oldal = $('#content').clone();
    oldal = $(oldal).removeClass('clearfix').attr('class');

    //!!! majd találjuk ki, h hova tegyük
    ga('require', 'ec');

    $('body').on('click', '.box a', function() {
       ga('ec:addProduct', {
          'id': $(this).closest('div.box').data('pid'),
          'name': $('h3', this).text()
        });
        ga('ec:setAction', 'click', {list: oldal});
        ga('send', 'event', 'Listaoldal', 'Kattintas', 'Termekadatlapra');
    });


    $('body').on('click', '.addShoppingCart', function() {
        var item = $(this).closest('[data-pid]');
        var item_type = $(item).prop('tagName');
        var product_id = $(item).data('pid');
        var netto_price = $(item).data('unit-netto');
        var name = $(item).data('name');

        var position = $(item).index() + 1;

        var place = $(this).closest('[data-place]').data('place');

        var info = {name: name, position: position, place: place, page: oldal};

        var shopping_cart = ShoppingCartAction('add', product_id, 1, netto_price, info);

        if ($('li#cart span').length == 0) {
			$('<\span>').addClass('r').appendTo('li#cart');
            $('a.cart_icon').addClass('space');
            $('li#cart').after('<li><a href="/penztar">Pénztárhoz</a></li>');
		}
        $('li#cart span').html(shopping_cart.qty_sum);

        if (oldal != 'page_cart') {
            showShoppingCartHover($);
        }

        return false;
    });

    var products = $('.addShoppingCart');
    $.each(products, function(i, item) {
        var id = $(item).closest('[data-pid]').data('pid');
        var name = $(item).closest('[data-name]').data('name');
        ga('ec:addImpression', {
          'id': id,
          'name': name,
          'list': oldal,
          'position': i
        });
        if (i == 50) {
            ga('send', {
              'hitType': 'event',
              'eventCategory': 'Listaoldal',
              'eventAction': 'OtvennelTobb',
              'nonInteraction' : true
            } );
        }
    });


    $('body').on('click', '.banner_ga', function() {
        var id = $(this).find('img').attr('src');
        ga('ec:addPromo', {
          'id': id
        });
        ga('ec:setAction', 'promo_click', {list: oldal});
        ga('send', 'event', 'promo', 'click', id);
    });



//.animate_scroll legörget ahova kell
    $('.animate_scroll').click(function() {
        if ($(this).attr('data-target-id')) {
            var id = '#' + $(this).data('target-id');
        } else {
            return false;
        }
        if ($(this).attr('data-padding-top')) {
            var padding_top = parseInt($(this).data('padding-top'));
        } else {
            var padding_top = 130;
        }
        if ($(this).attr('data-speed')) {
            var speed = parseInt($(this).data('speed'));
        } else {
            var speed = 500;
        }
        $('html, body').animate({
            scrollTop: $(id).offset().top - padding_top
         }, speed);
        return false;
    });


// bejelentkezett felhasználó bejelentkezési módjának küldése Analytics-ba
    var login_type_match = document.cookie.match(/login_type=(\d+)/);
    if (login_type_match) {
        var login_type = login_type_match[1],
            FB = 1, GO = 2, SOCIAL = 3, JatekNet = 8, REG = 4; // fb-login: 1, google-login: 2 | uj regisztracio: 4
        // console.log('send', 'event', login_type & REG ? 'Regisztráció' : 'Bejelentkezés', 'közösségi authentikációval (' + (login_type & SOCIAL == FB ? "Facebook" : "Google") + ')');
        ga('send', 'event', login_type & REG ? 'Regisztracio' : 'Bejelentkezes', ((login_type & SOCIAL) == FB ? "Facebook" : ((login_type & SOCIAL) == GO ? "Google" : "JatekNet")));
        document.cookie = "login_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

})(jQuery);


function ShoppingCartAction(action, product_id, cart_quantity, netto_price, info) {
    var response;
    jQuery.ajax({
        url: 'ajax.php',
        async: false,
        type: 'POST',
        dataType: 'json',
        data: {page: 'shopping_cart', action: action, product_id: product_id, cart_quantity: cart_quantity},
        success: function(msg) {
            response = msg;
        }
    });
    if (cart_quantity != 0) {
        ScarabQueue.push(['addToCart', product_id, cart_quantity, netto_price]);
        ScarabQueue.push(['go']);


        ga('ec:addProduct', {
          'id': product_id,
          'name': info.name,
          'position': info.position,
          'quantity': Math.abs(cart_quantity)
        });
        if (cart_quantity > 0 && action == 'add') {
            ga('ec:setAction', 'add', {list: info.page});
        } else {
            ga('ec:setAction', 'remove', {list: info.page});
        }
        ga('send', 'event', info.page, 'Kosarba', info.place);
    }
    return response;
}

function showShoppingCartHover($)
{
    var timer;

    $('#recommend-success-cart').lightbox_me({
        centered: true,
        overlaySpeed: 300,
        overlayCSS: { background: 'black', opacity: .3 },
        closeSelector: '.bNoThanks'
    });


    timer = setTimeout(function(){
        $( "#recommend-success-cart").fadeOut(500);
        setTimeout(function(){ $( "#recommend-success-cart .modal_close.close.r.bNoThanks" ).trigger( "click" ) },500);
    }, 3500);

    $('#recommend-success-cart').hover(
        function() {
          clearTimeout(timer);
        },
        function() {
          timer = setTimeout(
                            function(){
                                $( "#recommend-success-cart").fadeOut(500);
                                setTimeout(function(){$( "#recommend-success-cart .modal_close.close.r.bNoThanks" ).trigger( "click" )},500);},
                            3500);
        }
    );
}



function checkHover(id, link) {
    if (!jQuery(id).is(':hover') && !jQuery(link).is(':hover')) {
        jQuery(id).css({display: 'none'});
    }
}


/**
 * placeholder a béna böngészőkhöz
 */
if (!Modernizr.input.placeholder) {
    $('[placeholder]')
        .focus(function() {
            var $input = $(this);
            if ($input.val() === $input.attr('placeholder')) {
                $input
                    .removeClass('placeholder')
                    .val('');
            }
        })

        .blur(function() {
            var $input = $(this);
            if ($input.val() === '' || $input.val() === $input.attr('placeholder')) {
                $input
                    .addClass('placeholder')
                    .val(input.attr('placeholder'));
            }
        })
        .parents('form')
            .submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var $input = $(this);
                    if ($input.val() == $input.attr('placeholder')) {
                        $input.val('');
                    }
                })
            });
}


jQuery(document).ready(function() {
/** Tooltipster **/
	jQuery('.tipbox').tooltipster({
	    contentAsHTML: true,
		animation: 'fade',
		delay: 400,
		maxWidth: 360,
		offsetY: -6,
		touchDevices: false
	});

/** scarab null-content check **/
    var sc = {
        bigbox          :   jQuery('#scarab-related-container').closest('.product_bigbox'),
        bigbox_counter  :   0,
        bigbox_timer    :   setInterval(function() {
                                if (jQuery('div.box', sc.bigbox).length) {
                                    clearInterval(sc.bigbox_timer);
                                    sc.bigbox
                                        .css('height', '0px')
                                        .removeClass('hidden')
//                                        .css('height', '303px');
                                        .animate({height: 303}, 800);
                                } else {
                                    if(++sc.bigbox_counter > 15) {
                                        clearInterval(sc.bigbox_timer);
                                    };
                                }
                            }, 200),
        sidebox         :   jQuery('#scarab-sidebox-container').closest('.product_smallbox'),
        sidebox_counter :   0,
        sidebox_timer   :   setInterval(function() {
                                if (jQuery('div.box', sc.sidebox).length) {
                                    clearInterval(sc.sidebox_timer);
                                    sc.sidebox
                                        .css('height', '0px')
                                        .removeClass('hidden')
//                                        .css('height', '270px');
                                        .animate({height: 270}, 800);
                                } else {
                                    if(++sc.sidebox_counter > 15) {
                                        clearInterval(sc.sidebox_timer);
                                    };
                                }
                            }, 200)};
});

//scarabhoz kell, melyik domain-en vagyunk épp
function getScarabZone() {
    switch (location.origin){
        case 'http://www.topjatek.hu':
            return '_tj';
            break;
        case 'http://www.tulli.hu':
            return '_tu';
            break;
        default:
            return '';
            break;
    }
}



/** Karácsonny bohóckodás **/
jQuery(window).load(function() {
    if (document.cookie.indexOf("xmasClose") >= 0) {
        jQuery('.xmas-timer').remove();
    } else {
        jQuery('.xmas-timer').delay( 500 ).slideDown( 500 );
    }          
});
function closeXmas()
{
    jQuery('.xmas-timer').slideUp( 500 );
    var date = new Date();
    date.setTime(date.getTime()+(50*24*60*60*1000));    // +50 nap
    document.cookie = "xmasClose=1; expires=" + date.toGMTString(); + "; path=/";
}
