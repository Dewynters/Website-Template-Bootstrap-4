//Js Revealing module pattern
var core = function($) {

    var init = function() {
    	//List functions here
    	initTrackClick();
    };

	var initTrackClick = function() {
        $('[data-track]').on('click', function(event) {
            // Check if google analytics loaded
            if(window.ga && ga.create) {
                // Send click event to google analytics
                ga('send', 'event', {
                    eventCategory: $(this).data('track'),
                    eventAction: 'click',
                    eventLabel: $(this).attr('href')
                });
            }
        });
	};

    return {
    	init: init
    };

} (jQuery);

jQuery(function() { 
	core.init(); 
});
