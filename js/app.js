/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

var app = angular.module('cable-wizard', ['ui.router', 'ngDraggable', 'ngSanitize']);

app.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('selector', {
            url: '/',
            templateUrl: '../wp-content/plugins/cable-wizard/views/selector.html',
            controller: 'cableCtrl'
        })
        .state('configurator', {
            url: '/configurator',
            templateUrl: '../wp-content/plugins/cable-wizard/views/configurator.html',
            controller: 'connectorCtrl'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: "../wp-content/plugins/cable-wizard/views/cart.html",
            controller: "cartCtrl"
        })
        .state('edit', {
            url: '/edit',
            templateUrl: "../wp-content/plugins/cable-wizard/views/edit.html",
            controller: "editCtrl"
        });
});
