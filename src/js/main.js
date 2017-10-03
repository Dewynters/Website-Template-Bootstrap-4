//Js Revealing module pattern
var core = function($) {

    var init = function() {
    	//List functions here
    	initSampleFunction();
    };

    /* 
        Sample function
    */
    var initSampleFunction = function() {
       
    }; 

    return {
    	init: init
    };

} (jQuery);

jQuery(function() { 
	core.init(); 
});
