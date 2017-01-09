/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// cable service to get json data
app.factory('cables', ['$http', function ($http) {
    "use strict";
    return $http.get('./wp-content/plugins/cable-wizard/app/data/cables.php')
        .then(function (response) {
            return response.data.cables;
        });
}]);
