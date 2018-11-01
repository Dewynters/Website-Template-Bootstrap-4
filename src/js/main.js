//Js Revealing module pattern
var core = function ($) {

    var init = function () {
        //List functions here
    };

    return {
        init: init
    };

}(jQuery);

jQuery(function () {
    core.init();
});
