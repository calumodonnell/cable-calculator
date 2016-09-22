/*jslint browser:true*/
/*global $, app*/

// remove comma from number
app.filter('noComma', function () {
    "use strict";
    return function (value) {
        return parseInt(value, 10);
    };
});
