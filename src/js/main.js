//Js Revealing module pattern
var core = function ($) {

    var init = function () {
        //List functions here
        SampleFunction('Simon');
    };

    return {
        init: init
    };

}(jQuery);

jQuery(function () {
    core.init();
});
