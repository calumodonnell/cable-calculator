// config app pages
app.config(['$routeProvider', function ($routeProvider) {
    "use strict";

    $routeProvider
        .when("/", {templateUrl: "./wp-content/plugins/cable-wizard/partials/home.html", controller: "PageCtrl"})
        .when("/home", {templateUrl: "./wp-content/plugins/cable-wizard/partials/home.html", controller: "PageCtrl"})
        .when("/selector", {templateUrl: "./wp-content/plugins/cable-wizard/partials/selector.html", controller: "PageCtrl"})
        .when("/configurator", {templateUrl: "./wp-content/plugins/cable-wizard/partials/configurator.html", controller: "PageCtrl"})
        .when("/cart", {templateUrl: "./wp-content/plugins/cable-wizard/partials/cart.html", controller: "PageCtrl"})
        .when("/print-drawing", {templateUrl: "./wp-content/plugins/cable-wizard/partials/print-drawing.html", controller: "PageCtrl"})
        .when("/print-quotation", {templateUrl: "./wp-content/plugins/cable-wizard/partials/print-quotation.html", controller: "PageCtrl"})
        .otherwise("/home", {templateUrl: "./wp-content/plugins/cable-wizard/partials/404.html", controller: "PageCtrl"});
}]);
