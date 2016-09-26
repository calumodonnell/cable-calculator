/*jslint browser:true*/
/*global $, app*/

// remove comma from number
app.filter('noComma', function () {
    "use strict";
    return function (value) {
        var val;

        val = parseFloat(value, 10);
        val = val.toFixed(1);

        return val;
    };
});
