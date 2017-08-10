//Js Revealing module pattern
var core = function($) {

    var init = function() {
    	//List functions here
    	initTrackClick();
    };

    /* Button Tracking
    Example tracking implementation:
    <a href="http://booking-link.com" data-ga-category="Book Tickets Button" data-ga-action="click" data-ga-label="label-name" data-ga-value="1">Book Tickets</a>
    data-category = Category
    data-action = Action
    data-label = Label
    data-value = Value
    */
    var initTrackClick = function() {

        $('[data-ga-category]').on('click', function(event) {
            // Check if google analytics loaded
            if(window.ga && ga.create) {

                // Send click event to google analytics
                ga('send', 'event', {
                    eventCategory: $(this).data('ga-category'),
                    eventAction: $(this).data('ga-event'),
                    eventLabel: $(this).data('ga-label'),
                    eventValue: $(this).data('ga-value')
                });

            }
        });
        
    };

    /* Function that toggles an active class on the data-target use active-self to add active class to button
    Example implementation:
    <button data-toggle="active" data-target="#target-id">Button text</button>
    or
    <button data-toggle="active-self" data-target="#target-id">Button text</button>
    */
    var initActiveToggle = function() {
        $('[data-toggle="active"], [data-toggle="active-self"]').on('click', function(e) {
            e.preventDefault();
            var target = $(this).data('target');
            if (target !== undefined && $(target).length > 0) {
                $(target).toggleClass('active');
                // Stop website scrolling behind by adding modal-open class to body for nav toggle
                if (target == "#main-nav") {
                     $('body').toggleClass('modal-open');
                }
            }
            if ($(this).data('toggle') == 'active-self') {
                 $(this).toggleClass('active');
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
