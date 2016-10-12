/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// close notification or print screen
app.directive('escKey', function () {
    "use strict";

    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 27) {
                scope.notification = false;

                console.log('esc');
            }
        });
    };
});
