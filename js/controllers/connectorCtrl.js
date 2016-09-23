/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// connectorCtrl controller

app.controller('connectorCtrl', ['$scope', '$http', '$location', 'connectors', function ($scope, $http, $location, connectors) {
    "use strict";

    var initializing = true,
        search_freq = "",
        clength = "";

    $location.search();
    $scope.part_id = $location.search().part_id;

    $scope.c_1 = $location.search().conn_1;
    $scope.c_2 = $location.search().conn_2;

    $scope.conn_1 = '';
    $scope.conn_2 = '';

    localStorage.setItem('conn_1', '');
    localStorage.setItem('conn_2', '');

    connectors.then(function (data) {
        $scope.connectors = data;
    });

    $http.get("../wp-content/plugins/cable-wizard/admin/includes/cable-info.php?cable_id=" + $scope.part_id).then(function (response) { $scope.cables = response.data.cables; });
    $http.get("../wp-content/plugins/cable-wizard/admin/includes/cable-conn.php?part_id=" + $scope.part_id).then(function (response) { $scope.cable_conn = response.data.cable_conn; });

    $scope.sortType     = 'name';
    $scope.sortReverse  = false;

    $scope.round = function (num) {
        num = num.toFixed(2);
        return num;
    };

    $scope.showConnector = function (conn) {
        if ($scope.c_1 || $scope.c_2) {
            return conn.con_series === $scope.c_1 ||
                   conn.con_series === $scope.c_2;
        }

        return true;
    };

    if (localStorage.getItem('max_freq') && localStorage.getItem('clength')) {
        search_freq = localStorage.getItem('max_freq');
        clength = localStorage.getItem('clength');

        $scope.search_freq = parseFloat(search_freq, 10);
        $scope.clength = parseFloat(clength, 10);
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

    $scope.storeFreq = function (val) {
        if (val > 65) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The application has a minimum max frequency of 65 GHz.";
            $scope.notification_button = "Close";

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
        if (val > 3024 && $scope.metric === true) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The program has a maximum length of 3024 cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            val = 3024;
        } else if (val > 1200 && $scope.metric === false) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The program has a maximum length of 1200 in. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            val = 1200;
        }

        $scope.clength = val;

        if (val === null) {
            localStorage.setItem('clength', 6);
        } else {
            localStorage.setItem('clength', val);
        }
    };

    $scope.notificationHide = function () {
        $scope.notification = false;
    };

    $scope.cableCost = function (qm, marginRate, hourlyRate, overHeadRate, shipHand, matYield, covering) {
        var len = $scope.clength,
            cableBase = 4,
            adderBack = 2,
            laborTime = 20,
            laborAdd = 0,
            laborCalc = 0.05,
            cableCost = 0,
            laborCost = 0,
            totalLoadedMaterial = 0,
            totalLoadedLabor = 0,
            unitPrice = 0,
            conn1Price = 0,
            conn2Price = 0,
            conn_1 = 0,
            conn_2 = 0;

        qm = parseFloat(qm);
        marginRate = parseFloat(marginRate);
        hourlyRate = parseFloat(hourlyRate);
        overHeadRate = parseFloat(overHeadRate);
        shipHand = parseFloat(shipHand);
        matYield = parseFloat(matYield);

        switch (covering) {
        case 'W':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'TV':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'A':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'AW':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'AN':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'E':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'EW':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        case 'MC':
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        default:
            cableBase = 4;
            adderBack = 2;
            laborTime = 20;
            laborAdd = 0;
            break;
        }

        if (localStorage.getItem('conn_1')) {
            localStorage.conn_1 = localStorage.getItem('conn_1');
            conn_1 = JSON.parse(localStorage.conn_1);
            conn1Price = parseFloat(conn_1.price);
        }

        if (localStorage.getItem('conn_2')) {
            localStorage.conn_2 = localStorage.getItem('conn_2');
            conn_2 = JSON.parse(localStorage.conn_2);
            conn2Price = parseFloat(conn_2.price);
        }

        cableCost = (cableBase * len / 12) + adderBack;
        //console.log(cableCost);
        laborCost = (laborTime + laborAdd) + laborCalc * len;
        //console.log(laborCost);
        totalLoadedMaterial = (conn1Price + conn2Price + cableCost) / matYield * (1 + shipHand);
        //console.log(totalLoadedMaterial);
        totalLoadedLabor = (laborCost / 60 * hourlyRate) * overHeadRate;
        //console.log(totalLoadedLabor);
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
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You have not specificed the maximum frequency.";
            $scope.notification_button = "Close";
        } else if (!$scope.clength || $scope.clength === null) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You have not specified the cable length.";
            $scope.notification_button = "Close";
        } else if ($scope.clength < 15 && $scope.metric === true) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This application has a minimum length of 15 cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
        } else if ($scope.clength < 6 && $scope.metric === false) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This application has a minimum length of 6 in. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
        } else if (!$scope.conn_1 && !$scope.conn_2) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You need to add two connectors to the cable.";
            $scope.notification_button = "Close";
        } else if (!$scope.conn_1 || !$scope.conn_2) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You need to add one more connector to the cable.";
            $scope.notification_button = "Close";
        } else if ($scope.search_freq && $scope.clength && $scope.conn_1 && $scope.conn_2) {
            if (!$scope.covering) {
                $scope.covering = "";
            }

            $scope.rf_part = $scope.conn_1 + '-' + $scope.part_no + $scope.covering + '-' + $scope.clength + '-' + $scope.conn_2;

            var cart = JSON.parse(localStorage.getItem('cart')) || [],
                newCart =
                    {
                        'id': $scope.part_id,
                        'name': $scope.cable_name,
                        'part_no': '',
                        'conn_1': $scope.conn_1_overview,
                        'conn_1_description': '',
                        'conn_1_macola': '',
                        'conn_2': $scope.conn_2_overview,
                        'conn_2_description': '',
                        'conn_2_macola': '',
                        'quantity': 1,
                        'length': $scope.clength,
                        'covering': $scope.covering,
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
        switch (covering) {
        case 'W':
            return "large_neowea.png";
        case 'TV':
            return "med_armor.png";
        case 'A':
            return "med_armor.png";
        case 'AW':
            return "med_armorblack.png";
        case 'AN':
            return "med_armorblack.png";
        case 'E':
            return "med_boot.png";
        case 'EW':
            return "med_bootblack.png";
        case 'MC':
            return "large_neowea.png";
        }
    };

    $scope.clearBin_1 = function () {
        //jQuery('.bin#conn_1').html('');
        jQuery('#conn_1_overview').html('');
        localStorage.setItem('conn_1', '');
    };

    $scope.clearBin_2 = function () {
        //jQuery('.bin#conn_2').html('');
        jQuery('#conn_2_overview').html('');
        localStorage.setItem('conn_2', '');
    };

    $scope.droppedObjects1 = [];
    $scope.droppedObjects2 = [];

    $scope.onDrop_1 = function (data) {
        var index = $scope.droppedObjects1.indexOf(data),
            jsonString,
            objects = $scope.droppedObjects1.length;

        if (objects > 0) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "Only one connector allowed.";
            $scope.notification_button = "Close";
        } else if (index === -1) {
            $scope.droppedObjects1.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_1', jsonString);
            $scope.conn_1 = JSON.parse(localStorage.getItem('conn_1'));
        }
    };

    $scope.onDrop_2 = function (data) {
        var index = $scope.droppedObjects2.indexOf(data),
            jsonString,
            objects = $scope.droppedObjects2.length;

        if (objects > 0) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "Only one connector allowed.";
            $scope.notification_button = "Close";
        } else if (index === -1) {
            $scope.droppedObjects2.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_2', jsonString);
            $scope.conn_2 = JSON.parse(localStorage.getItem('conn_2'));
        }
    };

    $scope.onDragSuccess1 = function (data) {
        var index = $scope.droppedObjects1.indexOf(data);

        if (index > -1) {
            $scope.droppedObjects1.splice(index, 1);
        }
    };

    $scope.onDragSuccess2 = function (data) {
        var index = $scope.droppedObjects2.indexOf(data);

        if (index > -1) {
            $scope.droppedObjects2.splice(index, 1);
        }
    };
}]);
