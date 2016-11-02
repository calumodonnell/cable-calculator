
/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

app.factory('cableCost', ['$http', function ($http) {
    "use strict";
    return {
        getData: function () {
            var request = {
                method: 'GET',
                url: '../wp-content/plugins/cable-wizard/app/data/cable-cost.php',
                params: {
                    'part_id': 72,
                    'length': 20,
                    'covering': 'W'
                },
                headers: {
                    'anonymous': true
                }
            },
                promise = $http(request)
                .success(function (data, status, headers, config) {
                    return data;
                })
                .error(function (data, status, headers, config) {
                    console.log('state: ', false);
                });

            return promise;
        }
    };
}]);
