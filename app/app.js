/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app: true*/

var app = angular.module('cable-wizard', ['ui.router', 'cfp.hotkeys']);

app.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('selector', {
            url: '/',
            templateUrl: './wp-content/plugins/cable-wizard/app/views/selector.html',
            controller: 'CableController'
        })
        .state('configurator', {
            url: '/configurator',
            templateUrl: './wp-content/plugins/cable-wizard/app/views/configurator.html',
            controller: 'ConnectorController'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: "./wp-content/plugins/cable-wizard/app/views/cart.html",
            controller: "CartController"
        })
        .state('edit', {
            url: '/edit',
            templateUrl: "./wp-content/plugins/cable-wizard/app/views/edit.html",
            controller: "EditController"
        });
});
