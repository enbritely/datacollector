var ScarabQueue = ScarabQueue || [],
    template = document.getElementById('scarab-template').innerHTML;

ScarabQueue.push(['beforeRenderingAsync', function(SC, renderCallback) {
    var i, max, ids = [], to;

    max = 4;

    for (i = 0; i < SC.page.products.length; i++) {
        ids.push(SC.page.products[i].id);
    }

    $.ajax({
        type: 'POST',
        url:  '/ajax.php?page=scarab',
        data: { 'id': ids.join('_') },
        success: function(data) {
            var i, id, products;
            products = SC.page.products;
            i = products.length;

            while (products.length && i--) {
                id = products[i].id;
                if (id in data) {
                    products[i].jn = data[id];
                } else {
                    products.splice(i, 1);
                }
            }

            // ha maradt még mit megmutatni
            if (products.length > max) {
                SC.page.products = products.slice(max * -1);
                renderCallback(SC);
            } else if (products.length) {
                SC.page.products = products;
                renderCallback(SC);
            } else {
                // itt kéne lekapcsolni a container div-et és a fejlécet!
            }
            setProductListHeight();
        },
        dataType: 'json'
    });
}]);
ScarabQueue.push(['recommend', 'PERSONAL', 'scarab-related-container', 140, template]);


var targetDate = new Date(2014, 11, 24);

write_countdown();
setInterval(function() {
    write_countdown();
}, 1000 * 60);

function write_countdown()
{
    var back = countdown(targetDate);
    $('#oj-time-day').text(back.days + ' nap');
    $('#oj-time-hour').text(back.hours + ' óra');
    $('#oj-time-min').text(back.minutes + ' perc');
    //console.log(back);
}

$(window).load(function() {

    var $modal         = $('#oj-modal'),
        $modal_form    = $modal.find('form'),
        $lastname      = $modal_form.find('#lastname'),
        $last_lastname = $modal_form.find('#last-lastname'),
        $surname       = $modal_form.find('#surname'),
        $last_surname  = $modal_form.find('#last-surname'),
        $addr          = $modal_form.find('#addr'),
        $last_addr     = $modal_form.find('#last-addr'),
        oj_lastname    = getCookie('oj-lastname'),
        oj_surname     = getCookie('oj-surname'),
        oj_email       = getCookie('oj-email'),
        $last_user     = $('#last-user'),
        $new_user      = $('#new-user'),
        $menu_items    = $('.menu-item');

    if (oj_email != '') {
        $lastname.val(oj_lastname);
        $last_lastname.text(oj_lastname);
        $surname.val(oj_surname);
        $last_surname.text(oj_surname);
        $addr.val(oj_email);
        $last_addr.text(oj_email);
        $last_user.removeClass('hide');
        $new_user.addClass('hide');
    }

    $.each($menu_items, function(i, item) {
        var height = parseInt($(item).height(), 10);
        $(item).attr('data-height', height);
        if (!$(this).hasClass('active')) {
            $(item).css('height', '0px');
        }
    });
    
    $('#oj-intro a.button').click(function() {
        $('#vote_button').trigger('click');
        return false;
    })

    $('#oj-nav .button').click(function() {
        $('#oj-nav a').removeClass('bcolor1').addClass('bcolor6');

        $(this).addClass('bcolor1').removeClass('bcolor6');

        $('.menu-item').css('height', '0px');
        $('html,body').animate({
            scrollTop: $("#oj-nav").offset().top - 90},
            'slow'
        );
        var menu_item = $(this).data('target');
        $('#oj-' + menu_item).css('height', $('#oj-' + menu_item).data('height') + 'px');
        
        var stateObj = {foo: $(this).data('url')};
        window.history.pushState(stateObj, $(this).text(), '#' + $(this).data('url'));
        return false;
    });

    $(window).hashchange( function(){
        loadHashPage();
    });
    
    //az aktuális oldalt benyomjuk hash-be, vagy betöltjük a hash-t
    if (location.hash != '') {
        loadHashPage();
    } else {
        window.history.pushState({foo: $('#oj-nav .button.bcolor1').data('url')}, $('#oj-nav .button.bcolor1').text(), '#' + $('#oj-nav .button.bcolor1').data('url'));
    }
    
    function loadHashPage() {
        var url = location.hash;
        url = url.replace('#', '');

        $('#oj-nav a').removeClass('bcolor1').addClass('bcolor6');

        $('#oj-nav a[data-url=' + url + ']').addClass('bcolor1').removeClass('bcolor6');

        $('.menu-item').css('height', '0px');
        $('html,body').animate({
            scrollTop: $("#oj-nav").offset().top - 90},
            'slow'
        );
        var menu_item = $('#oj-nav a[data-url=' + url + ']').data('target');
        $('#oj-' + menu_item).css('height', $('#oj-' + menu_item).data('height') + 'px');
    }
    
    $modal_form.on('submit', function(e) {
        e.preventDefault()
        play()
    });

    function play()
    {
        var lastname   = $lastname.val(),
            surname    = $surname.val(),
            addr       = $addr.val(),
            newsletter = $modal_form.find('input[type=checkbox]').is(':checked') ? 1 : 0;

        $modal_form.find('input').removeClass('error');

        $.ajax({
            url: 'ajax.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                page: 'orszagjateka',
                action: 'play',
                lastname: lastname,
                surname: surname,
                addr: addr,
                newsletter: newsletter },
            success: function(msg) {
                if (msg.status == 'success'){
                    setCookie('oj-lastname', lastname);
                    setCookie('oj-surname',  surname);
                    setCookie('oj-email',    addr);
                    $modal.trigger('close');

                    $last_lastname.text(lastname);
                    $last_surname.text(surname);
                    $last_addr.text(addr);

                    $('#oj-modal-success').lightbox_me({
                        centered: true,
                        overlaySpeed: 300,
                        overlayCSS: { background: 'black', opacity: .3, position: 'fixed' },
                        closeSelector: '.bNoThanks',
                        onClose: function() {}
                    });

                    $last_user.removeClass('hide');
                    $new_user.addClass('hide');
                } else if (msg.status == 'error') {
                    for (i = 0; i < msg.errors.length; i++) {
                        $modal_form.find('#' + msg.errors[i]).addClass('error');
                    }
                }
            }
        });
    }


    /** itt folyik a szavazás **/
    $('#oj-vote .item button.button').on('click', vote);

    function vote()
    {
        var product_id = $(this).closest('.item').data('item');

        var next_vote_no = getCookie('next_vote_no');
        if (next_vote_no == '') {
            next_vote_no = 1;
        }
        next_vote_no = parseInt(next_vote_no, 10);

        $('.max4').text( 5 - next_vote_no );

        if (next_vote_no == 6) {
            $('#oj-modal-over').lightbox_me({
                centered: true,
                overlaySpeed: 300,
                overlayCSS: { background: 'black', opacity: .3, position: 'fixed' },
                closeSelector: '.bNoThanks',
                onClose: function() {}
            });
        } else {
            $.ajax({
                url: 'ajax.php',
                async: false,
                type: 'POST',
                dataType: 'json',
                data: {page: 'orszagjateka', action: 'vote', product_id: product_id},
                success: function(msg) {
                    if (msg.status == 'success') {
                        if (oj_email != '') {
                            play();
                        }
                    } else {
                        alert('Hiba lépett fel a szavazás során!');
                        location.reload();
                    }
                }
            });

            setCookie('vote' + next_vote_no.toString(), product_id);
            setCookie('next_vote_no', (next_vote_no + 1));
            $(this).closest('.item').remove();

            $modal.lightbox_me({
                centered: true,
                overlaySpeed: 300,
                overlayCSS: { background: 'black', opacity: .3, position: 'fixed' },
                closeSelector: '.bNoThanks',
                onClose: function() {
                    if (next_vote_no == 5) {
                        $modal.remove();
                    }
                }
            });
        }
    }

    $('.category_filter').click(function() {
        $('.category_filter').removeClass('active');
        $(this).addClass('active');
        if ($(this).data('category-filter') == 'all') {
            $('#oj-vote .item').removeClass('hide');
        } else {
            var filter = $(this).html();
            var $items = $('#oj-vote .item');

            $.each($items, function(i, item) {
                if ($(item).data('category') == filter) {
                    $(item).removeClass('hide');
                } else {
                    $(item).addClass('hide');
                }
            });
        }
    });

    $('#new-user-a').click(function(e) {
        e.preventDefault();
        $last_user.addClass('hide');
        $new_user.removeClass('hide');
    });
});


function setProductListHeight()
{
    $('.product_bigbox').each(function(k, row) {
        var maxHeight = 0;
        $(row)
            .find('.item')
                .each(function() {
                    maxHeight = Math.max(maxHeight, $(this).height());
                })
                .end()
            .css('height', (maxHeight + 50) + 'px');
    });
    var height = parseInt($('#oj-main').height(), 10);
    height = Math.max(height, 573);
    $('#oj-main').attr('data-height', height + 50);
}


function setCookie(cname, cvalue)
{
    var d = new Date();
    d.setHours(24,0,0,0);
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
