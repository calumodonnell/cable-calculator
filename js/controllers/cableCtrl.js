/*jslint browser:true*/
/*jslint plusplus: true */
/*global $, alert, angular, console, app, element*/

// cableCtrl controller
app.controller('cableCtrl', ['$scope', '$location', 'cables', 'series', function ($scope, $location, cables, series) {
    "use strict";

    var initializing = true,
        clength = document.getElementById('clength');

    // create local storage items
    localStorage.setItem('conn_1', '');
    localStorage.setItem('conn_2', '');

    // if values set are for freq, set to stored value
    if (localStorage.getItem('max_freq')) {
        $scope.search_freq = parseFloat(localStorage.getItem('max_freq'), 10);
    } else {
        localStorage.setItem('max_freq', '');
    }

    // if values set are for length, set to stored value
    if (localStorage.getItem('clength')) {
        $scope.clength = parseFloat(localStorage.getItem('clength'), 10);
    } else {
        localStorage.setItem('clength', '');
    }

    // if cart or measure items not created, set new items
    if (!localStorage.getItem('cart')) { localStorage.setItem('cart', '[]'); }
    if (!localStorage.getItem('measure')) { localStorage.setItem('measure', 'false'); }

    // get cable and series JSON data from server
    cables.then(function (data) { $scope.cables = data; });
    series.then(function (data) { $scope.series = data; });

    // hide notification box
    $scope.notificationHide = function () {
        $scope.notification = false;
    };

    // welcome message show if cart empty (assuming if empty, user has not used app)
    $scope.showWelcome = function () {
        if ((localStorage.getItem('cart') === '[]' || localStorage.getItem('cart') === '') && (localStorage.getItem('clength') === '' || localStorage.getItem('clength') === 'null'  || localStorage.getItem('clength') === 'NaN') && (localStorage.getItem('max_freq') === '' || localStorage.getItem('max_freq') === 'null')) {
            $scope.notification = true;
            $scope.notification_title = "Welcome";
            $scope.notification_message = "Welcome to the Cable Calculator.";
            $scope.notification_button = "Enter";
            localStorage.setItem('measure', 'false');
        }
    };
    $scope.showWelcome();

    // display total rows
    $scope.totalRows = function () {
        var rowCount = document.getElementsByClassName('selector').length,
            rowHide = document.getElementsByClassName('selector.ng-hide').length,
            rowTotal = rowCount - rowHide;

        return rowTotal;
    };

    // round number to 2 decimals
    $scope.round = function (num) {
        num = num.toFixed(2);
        return num;
    };

    // filter cables by frequency
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

    // filter cables by environment
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

    function hasClass(element, className) {
        return element.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className);
    }

    // direct to config if conditions met
    $scope.toConfig = function (id, conn_1, conn_2) {
        var cart;

        cart = JSON.parse(localStorage.getItem('cart'));

        if (cart.length >= 12) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The cart has reached its limit of 12 items. Items must be deleted before anymore can be added.";
            $scope.notification_button = "Close";
        } else if (!$scope.search_freq || $scope.search_freq === null) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You have not specified the maximum frequency.";
            $scope.notification_button = "Close";
        } else if (!$scope.clength || $scope.clength === null) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You have not specified the cable length.";
            $scope.notification_button = "Close";
        } else if ($scope.clength < 15 && hasClass(clength, 'metric')) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This application has a minimum length of 15 cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
        } else if ($scope.clength < 6 && hasClass(clength, 'imperial')) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This application has a minimum length of 6 in. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
        } else if (localStorage.getItem("max_freq") && localStorage.getItem("clength")) {
            $location.path("/configurator").search("part_id", id).search("conn_1", conn_1).search("conn_2", conn_2);
        }
    };

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
                    $scope.clength = $scope.clength * 2.54;
                } else if ($scope.metric === false) {
                    $scope.clength = $scope.clength / 2.54;
                }
                len = $scope.clength.toFixed(0);
                $scope.clength = parseInt(len, 10);

                localStorage.setItem('clength', $scope.clength);
            }
        }
    });

    // calcalate db loss
    $scope.calcLoss = function (k1, k2) {
        var loss,
            freq = $scope.search_freq,
            len = $scope.clength;

        if (freq && len) {
            if ($scope.metric === false) {
                loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);
            } else if ($scope.metric === true) {
                len = len / 2.54;
                loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * ((len * 3.2808333) / 12);
            }
        } else {
            loss = 0;
        }

        return loss.toFixed(2);
    };

    // store frequency to use on config page
    $scope.storeFreq = function (val) {
        if (val > 65) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The application has a maximum frequency of 65 GHz.";
            $scope.notification_button = "Close";
            val = 65;
        }

        $scope.search_freq = val;
        localStorage.setItem('max_freq', val);
    };

    // store length to use on config page
    $scope.storeLength = function (val) {
        if (val > 3024 && angular.element('#clength').hasClass("metric")) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This program has a maximum length of 3024cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            val = 3024;
        } else if (val > 1200 && angular.element('#clength').hasClass("imperial")) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This program has a maximum length of 1200 in. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            val = 1200;
        }

        $scope.clength = val;
        localStorage.setItem('clength', val);
    };

    // show cart total to user
    $scope.cartLength = function () {
        var total,
            cart;

        if (localStorage.getItem('cart')) { cart = JSON.parse(localStorage.getItem('cart')); }

        if (cart === '[]' || cart === '' || cart === undefined || cart === null) {
            total = 0;
        } else {
            total = cart.length;
        }

        return total;
    };

    // selector-table sort functions
    function sortTable(table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            return reverse // `-1 *` if want opposite order
                * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                    .localeCompare(b.cells[col].textContent.trim())
                   );
        });
        for (i = 0; i < tr.length; i += 1) { tb.appendChild(tr[i]); } // append each row in order
    }

    function makeSortable(table) {
        var th = table.tHead, i;

        if (th) { th = th.rows[0]; th = th.cells; }
        if (th) { i = th.length; } else { return; } // if no `<thead>` then do nothing

        function listen(i) {
            var dir = 1;
            th[i].addEventListener('click', function () {
                dir = 1 - dir;
                sortTable(table, i, dir);
            });
        }

        while (--i >= 0) { listen(i); }
    }

    function makeAllSortable(parent) {
        parent = parent || document.body;
        var t = parent.getElementsByTagName('table'), i = t.length;
        while (--i >= 0) { makeSortable(t[i]); }
    }

    makeAllSortable();

    $scope.toggleSort = false;

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
}]);
