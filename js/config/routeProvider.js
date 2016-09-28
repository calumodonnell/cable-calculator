// config app pages
app.config(['$routeProvider', function ($routeProvider) {
    "use strict";

    $routeProvider
        .when("/", {templateUrl: "../wp-content/plugins/cable-wizard/partials/selector.html", controller: "cableCtrl"})
        .when("/selector/", {templateUrl: "../wp-content/plugins/cable-wizard/partials/selector.html", controller: "cableCtrl"})
        .when("/configurator/", {templateUrl: "../wp-content/plugins/cable-wizard/partials/configurator.html", controller: "connectorCtrl"})
        .when("/cart/", {templateUrl: "../wp-content/plugins/cable-wizard/partials/cart.html", controller: "cartCtrl"})
        .otherwise({
            redirectTo: "/"
        });
}]);
