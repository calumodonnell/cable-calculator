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
        var val;

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
        if (val > 3024 && $scope.metric === true) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 3024 cm. Please contact the factory for custom lengths.";
            val = 3024;
        } else if (val > 1200 && $scope.metric === false) {
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

    $http.get("../wp-content/plugins/cable-wizard/admin/includes/default.php")
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
        } else if ($scope.clength < 15 && $scope.metric === true) {
            $scope.err = true;
            $scope.error_message = "This application has a minimum length of 15 cm. Please contact the factory for custom lengths.";
        } else if ($scope.clength < 6 && $scope.metric === false) {
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
                        'id': $scope.part_id,
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
            return "med_boot_black.png";
        case 'MC':
            return "large_neowea.png";
        }
    };

    $scope.errorHide = function () {
        $scope.err = false;
    };

    $scope.clearBin_1 = function () {
        //jQuery('.bin#conn_1').html('');
        //jQuery('#conn_1_overview').html('');
        localStorage.setItem('conn_1', '');
    };

    $scope.clearBin_2 = function () {
        //jQuery('.bin#conn_2').html('');
        //jQuery('#conn_2_overview').html('');
        localStorage.setItem('conn_2', '');
    };

    /*
    $scope.handleDrop_2 = function (item, conn) {
        localStorage.setItem(conn, item);
        $scope.conn_2 = item;
    };
    */

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () { $scope.centerAnchor = !$scope.centerAnchor; };
    $scope.draggableObjects = [{name: 'subject1'}, {name: 'subject2'}, {name: 'subject3'}];
    $scope.droppedObjects1 = [];
    $scope.droppedObjects2 = [];

    $scope.onDrop_1 = function (data) {
        var index = $scope.droppedObjects1.indexOf(data),
            jsonString;

        if (index === -1) {
            $scope.droppedObjects1.push(data);
        }

        jsonString = JSON.stringify(data);

        localStorage.setItem('conn_1', jsonString);
        $scope.conn_1 = JSON.parse(localStorage.getItem('conn_1'));
    };

    $scope.onDrop_2 = function (data) {
        var index = $scope.droppedObjects2.indexOf(data),
            jsonString;

        if (index === -1) {
            $scope.droppedObjects2.push(data);
        }

        jsonString = JSON.stringify(data);

        localStorage.setItem('conn_2', jsonString);
        $scope.conn_2 = JSON.parse(localStorage.getItem('conn_2'));
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
