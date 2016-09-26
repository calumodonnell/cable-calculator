/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// pageCtrl controller
app.controller('PageCtrl', function ($scope) {
    "use strict";

    $scope.cart = localStorage.getItem('cart');
});
