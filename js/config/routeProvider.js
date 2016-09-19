// config app pages
app.config(['$routeProvider', function ($routeProvider) {
    "use strict";

    $routeProvider
        .when("/", {templateUrl: "./wp-content/plugins/cable-wizard/partials/home.html", controller: "PageCtrl"})
        .when("/home", {templateUrl: "./wp-content/plugins/cable-wizard/partials/home.html", controller: "PageCtrl"})
        .when("/selector", {templateUrl: "./wp-content/plugins/cable-wizard/partials/selector.html", controller: "PageCtrl"})
        .when("/configurator", {templateUrl: "./wp-content/plugins/cable-wizard/partials/configurator.html", controller: "PageCtrl"})
        .when("/cart", {templateUrl: "./wp-content/plugins/cable-wizard/partials/cart.html", controller: "PageCtrl"})
        .otherwise({
          redirectTo: '/'
        });
}]);
