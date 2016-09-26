/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

/*
app.directive('metricWatch', function () {
    "use strict";

    return {
        restrict: 'E',
        scope: {
            val: '='
        },
        link: function (scope, element, attrs) {
            var initializing = true;

            // update length depending on measurement type
            scope.$watch('metric', function () {
                if (initializing) {
                    initializing = false;
                } else {
                    localStorage.setItem('measure', scope.metric);

                    var len;

                    if (scope.clength) {
                        if (scope.metric === true) {
                            scope.clength = scope.clength * 2.52;
                        } else if (scope.metric === false) {
                            scope.clength = scope.clength / 2.52;
                        }
                        len = scope.clength.toFixed(0);
                        scope.clength = parseInt(len, 10);

                        localStorage.setItem('clength', scope.clength);
                    }
                }
            });
        }
    };
});
*/
