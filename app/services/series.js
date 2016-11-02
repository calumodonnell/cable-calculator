/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// series serivce to get json data
app.factory('series', ['$http', function ($http) {
    "use strict";
    return $http.get('../wp-content/plugins/cable-wizard/app/data/connector-series.php')
        .then(function (response) {
            return response.data.series;
        });
}]);
