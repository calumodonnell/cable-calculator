/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// cable service to get json data
app.factory('cables', ['$http', function ($http) {
    "use strict";
    return $http.get('http://localhost:8888/micro/wp-content/plugins/cable-wizard/admin/includes/cable-list.php')
        .then(function (response) {
            return response.data.cables;
        });
}]);
