/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// remove comma from number
app.filter('noComma', function () {
    "use strict";
    return function (value) {
        var val;

        if (value) {
            val = parseFloat(value, 10);
        } else {
            val = 0;
        }

        val = val.toFixed(1);

        return val;
    };
});
