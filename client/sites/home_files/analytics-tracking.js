$(document).ready(function(){

	$('.ga_track_event').on('mousedown',function(){
		var $elem = $(this);
		var track = {
                      'hitType' : 'event',
                      'eventCategory' : $elem.data('ga_category'),
                      'eventAction' : $elem.data('ga_action'),
                      'eventLabel' : $elem.data('ga_label'),
                      'eventValue' : $elem.data('ga_value')
                      };
		ga('send', track);
	});

})