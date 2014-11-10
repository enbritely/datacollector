
jQuery.noConflict();
(function($) {
    jQuery.noConflict();

    // képek preview-ja
    //$('.row').imageTooltip();
    // banner load
    var slider = $('#slider');
    slider.load('/ajax.php?page=banner&identifier=rotated',
        function() {
            this.style.display = 'block';
            slider.nivoSlider({
                effect:       'random',
                slices:       6,
                animSpeed:    600,
                pauseTime:    7000,
                startSlide:   Math.floor(Math.random() * slider.children().length),
                directionNav: false,
                controlNav:   true,
                keyboardNav:  false,
                //afterChange: function() {$('.nivo-control').addClass('nice')}
            });
        }
    );

    //$(window).load(function() {$('.nivo-control').addClass('nice')});

    //$('.nivo-control').addClass('nice');
})(jQuery);
