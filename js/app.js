/*jslint browser:true*/
/*global $, jQuery, alert, angular, console*/

var app = angular.module('cable-wizard', ['ngRoute']);

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

// pageCtrl controller
app.controller('PageCtrl', function () {
    "use strict";
});

// homeCtrl controller
app.controller('homeCtrl', function () {
    "use strict";

    localStorage.setItem('clength', '');
    localStorage.setItem('max_freq', '');
    localStorage.setItem('conn_1', '');
    localStorage.setItem('conn_2', '');
    localStorage.setItem('measure', 'false');

    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '[]');
    }
});

// cableCtrl controller
app.controller('cableCtrl', function ($scope, $http, $location) {
    "use strict";

    $scope.cart = localStorage.getItem('cart');
    $scope.toggleSort = false;

    $http.get("./wp-content/plugins/cable-wizard/admin/includes/cable-list.php").then(function (response) { $scope.cables = response.data.cables; });
    $http.get("./wp-content/plugins/cable-wizard/admin/includes/cable-connectors.php").then(function (response) { $scope.series = response.data.series; });
    $http.get("./wp-content/plugins/cable-wizard/admin/includes/series-list.php").then(function (response) { $scope.connectors = response.data.connectors; });

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
    $scope.toConfig = function (id) {
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
            $location.path("/configurator").search("part_id", id);
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
});

// connectorCtrl controller
app.controller('connectorCtrl', function ($scope, $http, $location) {
    "use strict";

    $location.search();
    $scope.part_id = $location.search().part_id;

    $http.get("./wp-content/plugins/cable-wizard/admin/includes/cable-info.php?cable_id=" + $scope.part_id).then(function (response) { $scope.cables = response.data.cables; });

    $http.get("./wp-content/plugins/cable-wizard/admin/includes/cable-conn.php?part_id=" + $scope.part_id).then(function (response) { $scope.cable_conn = response.data.cable_conn; });

    $http.get("./wp-content/plugins/cable-wizard/admin/includes/connector-list.php").then(function (response) { $scope.connectors = response.data.connectors; });

    $scope.sortType     = 'name';
    $scope.sortReverse  = false;

    $scope.round = function (num) {
        num = num.toFixed(2);
        return num;
    };

    if (localStorage.getItem('max_freq') && localStorage.getItem('clength')) {
        var search_freq = "",
            clength = "";

        search_freq = localStorage.getItem('max_freq');
        clength = localStorage.getItem('clength');

        $scope.search_freq = parseInt(search_freq, 10);
        $scope.clength = parseInt(clength, 10);
    }

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

    $scope.storeFreq = function () {
        if (val > 65) {
            $scope.err = true;
            $scope.error_message = "The application has a minimum max frequency of 65 GHz.";
            val = 65;
            $scope.search_freq = 65;
        }

        $scope.search_freq = val;


        if (val === null) {
            localStorage.setItem('max_freq', 1);
        } else {
            localStorage.setItem('max_freq', val);
        }
    };

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

    $scope.errorHide = function () {
        $scope.err = false;
    };

    $scope.handleDrop_1 = function (item, conn) {
        localStorage.setItem(conn, item);
        $scope.conn_1 = item;
    };

    $scope.handleDrop_2 = function (item, conn) {
        localStorage.setItem(conn, item);
        $scope.conn_2 = item;
    };

    $http.get("./wp-content/plugins/cable-wizard/admin/includes/default.php")
        .then(function (response) { $scope.material = response.data.material; });

    $scope.cableCost = function (qm) {
        var len = $scope.clength,
            addHard = 1,
            laborTime = 1,
            laborAdd = 1,
            laborCalc = 1,
            matYield = 0.95,
            shipHand = 0.03,
            hourlyRate = 10.75,
            overHeadRate = 2.85,
            marginRate = 0.57,
            cableCost = '',
            laborCost = '',
            totalLoadedMaterial = '',
            totalLoadedLabor = '',
            unitPrice = '',
            coveringPrice = 1,
            con1Price = '',
            con2Price = '';

        con1Price = 20;
        con2Price = 29.5;

        cableCost = ((coveringPrice * len / 12)) + addHard;
        laborCost = (laborTime + laborAdd) + laborCalc * len;
        totalLoadedMaterial = (con1Price + con2Price + cableCost) / matYield * (shipHand + 1);
        totalLoadedLabor = (laborCost / 60 * hourlyRate) * overHeadRate;
        unitPrice = (totalLoadedMaterial + (totalLoadedLabor * qm)) / (1 - marginRate);

        return unitPrice.toFixed(2);
    };

    $scope.calcLoss = function (freq, k1, k2, len) {
        var loss = 0;

        if (jQuery("#loss").hasClass("metric")) {
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * ((len * 3.2808333) / 12);
        } else if (jQuery("#loss").hasClass("imperial")) {
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);
        }

        return loss.toFixed(2);
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

    $scope.addCart = function () {
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
        } else if (!$scope.conn_1 && !$scope.conn_2) {
            $scope.err = true;
            $scope.error_message = "You need to add two connectors to the cable.";
        } else if (!$scope.conn_1 || !$scope.conn_2) {
            $scope.err = true;
            $scope.error_message = "You need to add one more connector to the cable.";
        } else if ($scope.search_freq && $scope.clength && $scope.conn_1 && $scope.conn_2) {
            if (!$scope.covering) {
                $scope.covering = "";
            }

            $scope.rf_part = $scope.conn_1 + '-' + $scope.part_no + $scope.covering + '-' + $scope.clength + '-' + $scope.conn_2;

            var cart = JSON.parse(localStorage.getItem('cart')) || [],
                newCart =
                    {
                        'rf_part': $scope.rf_part,
                        'name': $scope.cable_name,
                        'conn_1': $scope.conn_1_overview,
                        'conn_2': $scope.conn_2_overview,
                        'macola': $scope.macola,
                        'quantity': 1,
                        'length': $scope.clength,
                        'covering': $scope.covering,
                        'price': '',
                        'max_freq': $scope.search_freq
                    };

            cart.push(newCart);

            localStorage.setItem('cart', JSON.stringify(cart));

            localStorage.setItem('clength', '');
            localStorage.setItem('max_freq', '');
            localStorage.setItem('conn_1', '');
            localStorage.setItem('conn_2', '');

            $location.url('cart');
        }
    };

    $scope.cableCover = function (covering) {
        if (covering === 'W') {
            return "large_neowea.png";
        } else if (covering === 'TV') {
            return "med_armor.png";
        } else if (covering === 'A') {
            return "med_armor.png";
        } else if (covering === 'AW') {
            return "med_armorblack.png";
        } else if (covering === 'AN') {
            return "med_armorblack.png";
        } else if (covering === 'E') {
            return "med_boot.png";
        } else if (covering === 'EW') {
            return "med_boot_black.png";
        } else if (covering === 'MC') {
            return "large_neowea.png";
        }
    };

    $scope.errorHide = function () {
        $scope.err = false;
    };

    $scope.clearBin_1 = function () {
        jQuery('.bin#conn_1').html('');
        jQuery('#conn_1_overview').html('');
        localStorage.setItem('conn_1', '');
    };

    $scope.clearBin_2 = function () {
        jQuery('.bin#conn_2').html('');
        jQuery('#conn_2_overview').html('');
        localStorage.setItem('conn_2', '');
    };
});



var drag = angular.module('drag', ['ngDraggable']);

app.controller('controller', function($scope) {
    $scope.listItems = [{
        name: "some name",
        title: "title1"
    }, {
        name: "some name2",
        title: "title2"
    }, {
        name: "some name3",
        title: "title3"
    }, ];

    $scope.droppedObjects = [];
    $scope.input = {};

    $scope.onDragComplete = function(data, evt) {
        console.log("drag success, data:", data);
        var index = $scope.droppedObjects.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects.splice(index, 1);
        }
    };

    $scope.onDropComplete = function(data, evt) {
        console.log("drop success, data:", data);
        var index = $scope.droppedObjects.indexOf(data);
        if (index == -1) {
            $scope.droppedObjects.push(data);
        }
    };

    $scope.onDropCompleteInput = function(data, evt) {
        console.log("drop on input success, data:", data);
        $scope.input = data;
    };

    $scope.onDropCompleteRemove = function(data, evt) {
        console.log("drop success - remove, data:", data);
        var index = $scope.droppedObjects.indexOf(data);
        if (index != -1) {
            $scope.droppedObjects.splice(index);
        }
    };

    var onDraggableEvent = function(evt, data) {
        console.log("128", "onDraggableEvent", evt, data);
    };

    $scope.$on('draggable:start', onDraggableEvent);
    //$scope.$on('draggable:move', onDraggableEvent);
    $scope.$on('draggable:end', onDraggableEvent);
});




app.controller('cartCtrl', function ($scope) {
    "use strict";

    $scope.cart = JSON.parse(localStorage.getItem('cart'));
    $scope.quantity = parseInt(localStorage.getItem('cart', 'quantity'), 10);
    $scope.clength = parseInt(localStorage.getItem('cart', 'length'), 10);

    $scope.totalPrice = function () {
        var total = 0,
            i,
            product;

        for (i = 0; i < $scope.cart.length; i += 1) {
            product = $scope.cart[i];
            total = total + product.price;
        }

        return total;
    };

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

    $scope.totalQuantity = function () {
        var total = 0,
            i,
            product;

        for (i = 0; i < $scope.cart.length; i += 1) {
            product = $scope.cart[i];
            total = total + product.quantity;
        }

        return total;
    };

    $scope.cablePrice = function (len, coveringPrice, quantity, index) {
        var addHard = 1,
            laborTime = 1,
            laborAdd = 1,
            laborCalc = 1,
            matYield = 0.95,
            shipHand = 0.03,
            hourlyRate = 10.75,
            overHeadRate = 2.85,
            marginRate = 0.57,
            cableCost = '',
            laborCost = '',
            totalLoadedMaterial = '',
            totalLoadedLabor = '',
            unitPrice = '',
            total = 0,
            con1Price = 20,
            con2Price = 29.5,
            qm = 0,
            cart;

        if ((quantity <= 3) && (quantity >= 1)) {
            qm = 4;
        } else if ((quantity <= 9) && (quantity >= 4)) {
            qm = 3;
        } else if ((quantity <= 24) && (quantity >= 10)) {
            qm = 2;
        } else if ((quantity <= 49) && (quantity >= 25)) {
            qm = 1.66;
        } else if ((quantity <= 99) && (quantity >= 50)) {
            qm = 1.33;
        } else if ((quantity <= 249) && (quantity >= 100)) {
            qm = 1.00;
        } else if ((quantity <= 499) && (quantity >= 250)) {
            qm = 0.95;
        } else if ((quantity <= 500) && (quantity >= 1000)) {
            qm = 0.90;
        }

        cableCost = ((coveringPrice * len / 12)) + addHard;
        laborCost = (laborTime + laborAdd) + laborCalc * len;
        totalLoadedMaterial = (con1Price + con2Price + cableCost) / matYield * (shipHand + 1);
        totalLoadedLabor = (laborCost / 60 * hourlyRate) * overHeadRate;
        unitPrice = (totalLoadedMaterial + (totalLoadedLabor * qm)) / (1 - marginRate);

        total = unitPrice * quantity;
        total = total.toFixed(2);
        total = parseFloat(total, 10);

        localStorage.cart = localStorage.getItem('cart');

        cart = JSON.parse(localStorage.cart);

        cart[index].price = total;

        localStorage.cart = JSON.stringify(cart);

        return total;
    };

    $scope.storeQuantity = function (quantity, index) {
        localStorage.cart = localStorage.getItem('cart');

        var cart = JSON.parse(localStorage.cart);

        cart[index].quantity = quantity;

        localStorage.cart = JSON.stringify(cart);
    };

    $scope.storeLength = function (val, index) {
        localStorage.cart = localStorage.getItem('cart');
        var cart = JSON.parse(localStorage.cart);

        if (val > 3024 && $scope.metric === true) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 3024 cm. Please contact the factory for custom lengths.";
            $scope.clength = 3024;
        } else if (val > 1200 && $scope.metric === false) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 1200 in. Please contact the factory for custom lengths.";
            $scope.clength = 1200;
        }

        if (val === null) {
            val = 6;
            cart[index].length = val;
        } else {
            cart[index].length = val;
        }

        localStorage.cart = JSON.stringify(cart);
    };

    $scope.errorHide = function () {
        $scope.err = false;
    };

    $scope.deleteItem = function (index) {
        $scope.cart.splice(index, 1);

        localStorage.cart = localStorage.getItem('cart');

        var cart = JSON.parse(localStorage.cart);

        cart.splice(index, 1);

        localStorage.cart = JSON.stringify(cart);
    };

    $scope.clearCart = function () {
        $scope.cart = "";
        localStorage.removeItem('cart');
    };

    $scope.checkoutCart = function () {
        $scope.err = true;
        $scope.error_message = "This function is not available.";

        /*
        if (jQuery("#length").hasClass("metric") && $scope.clength < 15) {
            $scope.err = true;
            $scope.error_message = "This application has a minimum length of 15 cm. Please contact the factory for custom lengths.";
        } else if (jQuery("#length").hasClass("imperial") && $scope.clength < 6) {
            $scope.err = true;
            $scope.error_message = "This application has a minimum length of 6 in. Please contact the factory for custom lengths.";
        }
        */
    };

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
            }
        }
    });

    $scope.printDiv = function () {
        var pdf = new jsPDF('p', 'pt', 'a4'),
            source = "<html> <head> <title>Cable Assembly Cart Summary</title> <style type='text/css'> .pdf-container{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color: #58595B; font-weight: 300; font-size: 12px;}.pdf-header{margin-bottom: 20px;}.address-header{display: inline-block;}p{margin: 0; margin-bottom: 5px;}b{font-weight: 600}.logo-header{display: inline-block; vertical-align: top; float: right;}.logo-header img{width: 80px; height: auto;}.pdf-content{margin-bottom: 20px;}table{width: 100%;}td, th{padding: 4px 8px}tbody tr:nth-child(even){background-color: #F2F2F2;}.pdf-footer{clear: both;}.pdf-footer .sales-disclaimer{display: inline-block;}.pdf-footer .printed-date{display: inline-block;}</style> </head> <body> <div class='pdf-container'> <header class='pdf-header'> <div class='address-header'> <p><b>Florida RF Labs, Inc.</b></p><p>8851 SW Old Kansas Ave.</p><p>Stuart, FL 34997</p><p>Tel: (772) 286-9300</p><p>Fax: (772) 283-5286</p><p><a href='http://www.emc-rflabs.com'>www.emc-rflabs.com</a></p></div><div class='logo-header'> <img src='./wp-content/plugins/cable-wizard/img/rflabs.png'> </div></header> <div class='pdf-content'> <h1>Cable Assembly Cart Summary</h1> <table> <thead> <tr> <th>Order Number</th> <th>Part Number</th> <th>Quantity</th> <th>Unit Price</th> <th>Ext. Amount</th> </tr></thead> <tbody> <tr> <td>AL141LLSPS1S1#00060</td><td>SMS-AL141LLSP-6.0-SMS</td><td>1</td><td>$124.49</td><td>$124.49</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$124.49</td><td>4 - 9 <br>$100.58</td><td>10 - 24 <br>$78.68</td><td>25 - 49 <br>$68.55</td><td>50 - 99 <br>$60.67</td><td>100+ <br>$52.78</td></tr></table> </td></tr><tr> <td>085S1S2#00060</td><td>SMS-085-6.0-SMR</td><td>1</td><td>$85.33</td><td>$85.33</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$85.33</td><td>4 - 9 <br>$68.49</td><td>10 - 24 <br>$51.65</td><td>25 - 49 <br>$45.92</td><td>50 - 99 <br>$40.37</td><td>100+ <br>$34.81</td></tr></table> </td></tr></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td>Total: $209.82</td></tr></tfoot> </table> </div><footer class='pdf-footer'> <div class='sales-disclaimer'> <p>THIS QUOTE IS SUBJECT TO ALL EXPORT CONTROL REGULATIONS OF THE UNITED STATES.</p><p>Cable Assemblies have a $250.00 line item minimum requirement.</p><p>Component Product line has a $1000.00 line item minimum requirement.</p><p>Lead times quoted are ARO (after receipt of order) and does not include transit time.</p><p>Prices are based on the information available at the time of quotation. Quality Assurance provisions, First Article Verification, Source Inspection and Special Packaging requirements not quoted and appear on the purchase order may affect prices quoted herein. Florida RF Labs reserves the right to amend this quotation if these requirements are not quoted and appear on the purchase order.</p><p>Click <a href='http://www.emc-rflabs.com/Rflabs/media/Generic-Library/General%20Information/432F024-EMC-RF-LABS-SALES-TERMS-AND-CONDITIONS.pdf' target='_blank'>here</a> for T&Cs</p></div><div class='printed-date'> <p>PRINTED: <span id='currentdate'>09/14/2016</span></p></div></footer> </div></body></html>",
            //source = jQuery('.print-preview')[0],
            specialElementHandlers = {
                'print-preview': function (element, renderer) {
                    return true;
                }
            },
            margins = {
                top: 40,
                bottom: 60,
                left: 40,
                width: 522
            };

        pdf.fromHTML(
            source,
            margins.left,
            margins.top, {
                'width': margins.width,
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                pdf.save('cable-wizard-quotation.pdf');
            }, margins
        );
    };
});


// add additional zero before number, if required
app.filter('numberFixedLen', function () {
    "use strict";
    return function (a, b) {
        var num = (1e4 + "" + a).slice(-b);
            //decimal = /^[-+]?[0-9]+\.[0-9]+$/;

        /*
        if(!a.value.match(decimal)){
            num = num + 0;
        }
        */

        return num;
    };
});


// draggable connectors
app.directive('draggable', function () {
    "use strict";
    return function (scope, element) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
            'dragstart',
            function (e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('Text', this.id);
                this.classList.add('drag');
                return false;
            },
            false
        );

        el.addEventListener(
            'dragend',
            function () {
                this.classList.remove('drag');
                return false;
            },
            false
        );
    };
});

// droppable connectors
app.directive('droppable', function () {
    "use strict";
    return {
        scope: {
            drop: '&',
            bin: '='
        },
        link: function (scope, element) {
            var el = element[0];

            el.addEventListener(
                'dragover',
                function (e) {
                    e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) { e.preventDefault(); }
                    this.classList.add('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragenter',
                function () {
                    this.classList.add('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'dragleave',
                function () {
                    this.classList.remove('over');
                    return false;
                },
                false
            );

            el.addEventListener(
                'drop',
                function (e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) { e.stopPropagation(); }

                    this.classList.remove('over');

                    var binId = this.id,
                        item = document.getElementById(e.dataTransfer.getData('Text'));
                    this.appendChild(item);

                    // call the passed drop function
                    scope.$apply(function (scope) {
                        var fn = function() { scope.drop(); };
                        if ('undefined' !== fn) {
                            fn(item.id, binId);
                        }
                    });

                    return false;
                },
                false
            );
        }
    };
});


// detects previous page for back button to work
app.directive('back', ['$window', function ($window) {
    "use strict";

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);
