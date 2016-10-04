// config app pages
app.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('selector', {
            url: '/',
            templateUrl: '../wp-content/plugins/cable-wizard/partials/selector.html',
            controller: 'cableCtrl'
        })
        .state('configurator', {
            url: '/configurator',
            templateUrl: '../wp-content/plugins/cable-wizard/partials/configurator.html',
            controller: 'connectorCtrl'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: "../wp-content/plugins/cable-wizard/partials/cart.html",
            controller: "cartCtrl"
        })
        .state('edit', {
            url: '/edit',
            templateUrl: "../wp-content/plugins/cable-wizard/partials/edit.html",
            controller: "editCtrl"
        });
});
