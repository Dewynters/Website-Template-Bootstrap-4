//Js Revealing module pattern
var core = function($) {

    var init = function() {
    	//List functions here
        SampleFunction('Hello World');
    };

    /* 
        Sample function
    */
    const SampleFunction = (name) => {

        console.log(`hello ${name}`);

    };

    return {
    	init: init
    };

} (jQuery);

jQuery(function() { 
	core.init(); 
});
