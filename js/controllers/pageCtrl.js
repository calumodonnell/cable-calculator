// pageCtrl controller
app.controller('PageCtrl', function ($scope) {
    "use strict";

    $scope.cart = localStorage.getItem('cart');
});
