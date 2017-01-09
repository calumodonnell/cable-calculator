/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// connectors service to get json data
app.factory('connectors', ['$http', function ($http) {
    "use strict";
    return $http.get('./wp-content/plugins/cable-wizard/app/data/connector-list.php')
        .then(function (response) {
            return response.data.connectors;
        });
}]);
