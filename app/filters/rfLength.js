/*jslint browser:true*/
/*global $, angular */

// remove comma from number
app.filter('rfLength', function () {
    "use strict";
    return function (len) {
        if (len > 1200) { len = 1200; }

        var myString,
            newString = '',
            l = '',
            zero =  '',
            afterDecimal = '',
            first;

        myString = len.toString();
        afterDecimal = myString.split(".")[1];
        newString = myString.split(".")[0];
        l = newString.length;

        if (l === 1) {
            zero = '000';
        } else if (l === 2) {
            zero = '00';
        } else if (l === 3) {
            zero = '0';
        } else if (l === 4) {
            zero = '';
        }

        if (afterDecimal) {
            first = afterDecimal.slice(0, 1);
            newString = zero + newString + first;
        } else {
            newString = myString.replace(/\./g, '0');
            newString = zero + newString + '0';
        }

        return newString;
    };
});
