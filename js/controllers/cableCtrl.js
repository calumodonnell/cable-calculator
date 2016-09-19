/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// cableCtrl controller
app.controller('cableCtrl', ['$scope', '$location', 'cables', 'series', function ($scope, $location, cables, series) {
    "use strict";

    $scope.toggleSort = false;

    cables.then(function (data) {
        $scope.cables = data;
    });

    series.then(function (data) {
        $scope.series = data;
    });

    if (localStorage.getItem('max_freq') && localStorage.getItem('clength')) {
        $scope.search_freq = parseInt(localStorage.getItem('max_freq'), 10);
        $scope.clength = parseInt(localStorage.getItem('clength'), 10);
    } else {
        $scope.search_freq = parseInt(1, 10);
        $scope.clength = parseInt(6, 10);

        localStorage.setItem('max_freq', '1');
        localStorage.setItem('clength', '6');
    }

    function getCellValue(row, index) { return jQuery(row).children('td').eq(index).html(); }

    function comparer(index) {
        return function (a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index);
            return jQuery.isNumeric(valA) && jQuery.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
        };
    }

    jQuery('th').click(function () {
        var table = jQuery(this).parents('table').eq(0),
            rows = table.find('tr:gt(0)').toArray().sort(comparer(jQuery(this).index())),
            i;

        this.asc = !this.asc;
        if (!this.asc) { rows = rows.reverse(); }
        for (i = 0; i < rows.length; i += 1) { table.append(rows[i]); }
    });

    $scope.sortData = function (column) {
        $scope.toggleSort = ($scope.sortByColumn === column) ? !$scope.toggleSort : false;
        $scope.sortByColumn = column;
    };

    $scope.getSortItem = function (column) {
        if ($scope.sortByColumn === column) {
            return $scope.toggleSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    };

    $scope.round = function (num) {
        num = num.toFixed(2);
        return num;
    };

    // selector table filters
    $scope.greaterThan = function (val) {
        return function (item) {
            if (item.max_freq >= val) {
                return true;
            }
        };
    };

    $scope.greaterThanFreq = function (val) {
        return function (item) {
            if (item.con_max_freq >= val) {
                return true;
            }
        };
    };

    $scope.enFilter = function (environment) {
        return function (item) {
            if (environment === 'indoor') {
                if (item.indoor === 'on') {
                    return true;
                }
            } else if (environment === 'outdoor') {
                if (item.outdoor === 'on') {
                    return true;
                }
            } else if (environment === 'test') {
                if (item.test === 'on') {
                    return true;
                }
            } else {
                return true;
            }
        };
    };

    // total no of rows shown to user
    $scope.totalRows = function () {
        var rowCount = jQuery('#selector-table tbody tr').length,
            rowHide = jQuery('#selector-table tbody tr.ng-hide').length,
            rowTotal = rowCount - rowHide;

        return rowTotal;
    };

    // direct to config if conditions met
    $scope.toConfig = function (id, conn_1, conn_2) {
        if (!$scope.search_freq || $scope.search_freq === null) {
            $scope.err = true;
            $scope.error_message = "You have not specified the maximum frequency.";
        } else if (!$scope.clength || $scope.clength === null) {
            $scope.err = true;
            $scope.error_message = "You have not specified the cable length.";
        } else if ($scope.clength < 15 && jQuery("#clength").hasClass("metric")) {
            $scope.err = true;
            $scope.error_message = "This application has a minimum length of 15 cm. Please contact the factory for custom lengths.";
        } else if ($scope.clength < 6 && jQuery("#clength").hasClass("imperial")) {
            $scope.err = true;
            $scope.error_message = "This application has a minimum length of 6 in. Please contact the factory for custom lengths.";
        } else if (localStorage.getItem("max_freq") && localStorage.getItem("clength")) {
            $location.path("/configurator").search("part_id", id).search("conn_1", conn_1).search("conn_2", conn_2);
        }
    };

    // hide error message
    $scope.errorHide = function () {
        $scope.err = false;
    };

    var initializing = true;

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

    // update length depending on measurement type
    $scope.$watch('metric', function () {
        if (initializing) {
            initializing = false;
        } else {
            localStorage.setItem('measure', $scope.metric);

            var len;

            if ($scope.clength) {
                if ($scope.metric === true) {
                    $scope.clength = $scope.clength * 2.52;
                } else if ($scope.metric === false) {
                    $scope.clength = $scope.clength / 2.52;
                }
                len = $scope.clength.toFixed(0);
                $scope.clength = parseInt(len, 10);

                localStorage.setItem('clength', $scope.clength);
            }
        }
    });

    // calcalate db loss
    $scope.calcLoss = function (freq, k1, k2, len) {
        var loss = 0;

        if (jQuery("#loss").hasClass("metric")) {
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * ((len * 3.2808333) / 12);
        } else if (jQuery("#loss").hasClass("imperial")) {
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);
        }

        return loss.toFixed(2);
    };

    // store frequency to use on config page
    $scope.storeFreq = function (val) {
        if (val > 65) {
            $scope.err = true;
            $scope.error_message = "The application has a minimum max frequency of 65 GHz.";
            val = 65;
        }

        $scope.search_freq = val;

        if (val === null) {
            localStorage.setItem('max_freq', 1);
        } else {
            localStorage.setItem('max_freq', $scope.search_freq);
        }
    };

    // store length to use on config page
    $scope.storeLength = function (val) {
        if (val > 3024 && jQuery("#clength").hasClass("metric")) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 3024 cm. Please contact the factory for custom lengths.";
            val = 3024;
        } else if (val > 1200 && jQuery("#clength").hasClass("imperial")) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 1200 in. Please contact the factory for custom lengths.";
            val = 1200;
        }

        $scope.clength = val;

        if (val === null) {
            localStorage.setItem('clength', 6);
        } else {
            localStorage.setItem('clength', val);
        }
    };

    // show cart total to user
    $scope.cartLength = function () {
        var total,
            cart;

        if (localStorage.getItem('cart')) { cart = JSON.parse(localStorage.getItem('cart')); }

        if (cart === '[]' || cart === '' || cart === undefined) {
            total = 0;
        } else {
            total = cart.length;
        }

        return total;
    };
}]);
