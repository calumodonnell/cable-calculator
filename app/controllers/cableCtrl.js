/*jslint browser:true*/
/*jslint plusplus: true */
/*global $, alert, angular, console, app, element*/

// cableCtrl controller
app.controller('CableController', ['$scope', '$location', 'cables', 'series', function ($scope, $location, cables, series) {
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

    $scope.keypress = function($event) {
        if ($event.keyCode == 27 || $event.keyCode == 13) {
            $scope.notification = false;
        }
    };

    // display total rows
    $scope.totalRows = function () {
        var rowCount = document.getElementsByClassName('selector').length,
            rowHide = document.getElementsByClassName('selector ng-hide').length,
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

    // greater than frequency
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

    $scope.toCart = function () {
        if (localStorage.getItem('cart')) {
            var cart = JSON.parse(localStorage.getItem('cart'));

            if (cart.length <= 0 || cart === null || cart === "" || cart === "[]") {
                $scope.notification = true;
                $scope.notification_title = "Error";
                $scope.notification_message = "There are currently no cables in your cart.";
                $scope.notification_button = "Close";
            } else {
                $location.path("/cart");
            }
        } else {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "There are currently no cables in your cart.";
            $scope.notification_button = "Close";
        }
    };

    // direct to config if conditions met
    $scope.toConfig = function (id, conn_1, conn_2) {
        var cart = JSON.parse(localStorage.getItem('cart'));

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
        } else if (localStorage.getItem("max_freq")) {
            $location.path("/configurator").search("part_id", id).search("conn_1", conn_1).search("conn_2", conn_2);
        }
    };

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

    $scope.$watch('metric', function () {
        if (initializing) {
            initializing = false;
        } else {
            localStorage.setItem('measure', $scope.metric);

            if ($scope.clength) {
                if ($scope.metric === true) {
                    $scope.clength = $scope.clength * 2.54;
                } else if ($scope.metric === false) {
                    $scope.clength = $scope.clength / 2.54;
                }
                $scope.clength = $scope.clength.toFixed(1);
                $scope.clength = parseFloat($scope.clength, 10);

                localStorage.setItem('clength', $scope.clength);
            }

            var cart, i;

            localStorage.cart = localStorage.getItem('cart');
            cart = JSON.parse(localStorage.cart);

            for (i = 0; i < cart.length; i += 1) {
                if ($scope.metric === true) {
                    cart[i].length = cart[i].length * 2.54;
                } else if ($scope.metric === false) {
                    cart[i].length = cart[i].length / 2.54;
                }

                cart[i].length = cart[i].length.toFixed(1);
                cart[i].length = parseFloat(cart[i].length, 10);
            }

            localStorage.cart = JSON.stringify(cart);
            $scope.cart = JSON.parse(localStorage.getItem('cart'));
        }
    });

    // calcalate db loss
    $scope.calcLoss = function (k1, k2) {
        var loss,
            freq = $scope.search_freq,
            len = $scope.clength;

        if (freq && len) {
            if ($scope.metric === true) {
                loss = ((Math.sqrt(freq) * k1) + (k2 * freq)) * (len / 100);
            } else if ($scope.metric === false) {
                loss = ((Math.sqrt(freq) * k1) + (k2 * freq)) * (len / 12);
            }
        } else {
            loss = 0;
        }

        return loss.toFixed(2);
    };

    // store max frequency
    $scope.storeFreq = function (freq) {
        if (freq > 65) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The application has a maximum frequency of 65 GHz.";
            $scope.notification_button = "Close";
            freq = 65;
        }

        $scope.search_freq = freq;
        localStorage.setItem('max_freq', freq);
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
        tr = tr.sort(function (a, b) {
            return reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
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
