/*jslint browser:true*/
/*global $, app*/

// add additional zero before number, if required
app.filter('numberFixedLen', function () {
    "use strict";
    return function (a, b) {
        var num = (1e3 + "" + a).slice(-b);

        return num;
    };
});
