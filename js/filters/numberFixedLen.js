/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// add additional zero before number, if required
app.filter('numberFixedLen', function () {
    "use strict";
    return function (a, b) {
        var num = (1e4 + "" + a).slice(-b);

        return num;
    };
});
