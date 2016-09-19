// detects previous page for back button to work
app.directive('back', ['$window', function ($window) {
    "use strict";

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);
