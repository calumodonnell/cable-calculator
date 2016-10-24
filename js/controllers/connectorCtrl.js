/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// connectorCtrl controller

app.controller('connectorCtrl', ['$scope', '$http', '$location', '$filter', '$window', 'connectors', function ($scope, $http, $location, $filter, $window, connectors) {
    "use strict";

    var initializing = true;

    $scope.droppedObjects1 = [];
    $scope.droppedObjects2 = [];

    localStorage.setItem('conn_1', '');
    localStorage.setItem('conn_2', '');

    $scope.conn_1 = '';
    $scope.conn_2 = '';

    $location.search();
    $scope.part_id = $location.search().part_id;

    $scope.c_1 = $location.search().conn_1;
    $scope.c_2 = $location.search().conn_2;

    connectors.then(function (data) {
        $scope.connectors = data;
    });

    if (!$scope.part_id) {
        $window.location.href = './#/';
    }

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

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
            return conn.con_series === $scope.c_1 || conn.con_series === $scope.c_2;
        }

        return true;
    };

    if (localStorage.getItem('max_freq') && localStorage.getItem('clength')) {
        $scope.search_freq = parseFloat(localStorage.getItem('max_freq'), 10);
        $scope.clength = parseFloat(localStorage.getItem('clength'), 10);
    }

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

    $scope.storeFreq = function (freq, cableFreq) {
        var conn_1,
            conn_2;

        if (localStorage.getItem('conn_1')) {
            localStorage.conn_1 = localStorage.getItem('conn_1');
            conn_1 = JSON.parse(localStorage.conn_1);

            if (freq > conn_1.con_max_freq) {
                $scope.notification = true;
                $scope.notification_title = "Error";
                $scope.notification_message = "The " + conn_1.con_part_no + " connector has a maximum frequency of " + conn_1.con_max_freq + " GHz.";
                $scope.notification_button = "Close";
                freq = conn_1.con_max_freq;
            }
        }

        if (localStorage.getItem('conn_2')) {
            localStorage.conn_2 = localStorage.getItem('conn_2');
            conn_2 = JSON.parse(localStorage.conn_2);

            if ((freq > conn_2.con_max_freq) && conn_1) {
                $scope.notification = true;
                $scope.notification_title = "Error";
                $scope.notification_message = "The " + conn_2.con_part_no + " connector has a maximum frequency of " + conn_2.con_max_freq + " GHz.";
                $scope.notification_button = "Close";
                freq = conn_2.con_max_freq;
            }
        }

        if (freq > cableFreq) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The cable has a maximum frequency of " + cableFreq + " GHz.";
            $scope.notification_button = "Close";
            freq = cableFreq;
        }

        if (freq > 65) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The application has a max frequency of 65 GHz.";
            $scope.notification_button = "Close";
            freq = 65;
        }

        $scope.search_freq = freq;

        if (freq === null) {
            localStorage.setItem('max_freq', 1);
        } else {
            localStorage.setItem('max_freq', freq);
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

    $scope.showDrawing = function () {
        if (!$scope.clength || $scope.clength === null) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "You have not specified the cable length.";
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
        } else {
            $scope.print_drawing = true;
        }
    };

    $scope.drawingHide = function () {
        $scope.print_drawing = false;
    };

    $scope.cableCost = function (qm, marginRate, hourlyRate, overHeadRate, shipHand, matYield, covering, coat_n_cable_base, coat_n_adder_back, coat_n_base, coat_n_adder_base_time, coat_n_time_rp, coat_w_cable_base, coat_w_adder_back, coat_w_base, coat_w_adder_base_time, coat_w_time_rp, coat_tv_cable_base, coat_tv_adder_back, coat_tv_base, coat_tv_adder_base_time, coat_tv_time_rp, coat_a_cable_base, coat_a_adder_back, coat_a_base, coat_a_adder_base_time, coat_a_time_rp, coat_aw_cable_base, coat_aw_adder_back, coat_aw_base, coat_aw_adder_base_time, coat_aw_time_rp, coat_an_cable_base, coat_an_adder_back, coat_an_base, coat_an_adder_base_time, coat_an_time_rp, coat_ej_cable_base, coat_ej_adder_back, coat_ej_base, coat_ej_adder_base_time, coat_ej_time_rp, coat_ew_cable_base, coat_ew_adder_back, coat_ew_base, coat_ew_adder_base_time, coat_ew_time_rp, coat_mc_cable_base, coat_mc_adder_back, coat_mc_base, coat_mc_adder_base_time, coat_mc_time_rp) {
        var len = $scope.clength,
            cableBase = 0,
            adderBack = 0,
            laborTime = 0,
            laborAdd = 0,
            laborCalc = 0,
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

        coat_n_cable_base = parseFloat(coat_n_cable_base);
        coat_n_adder_back = parseFloat(coat_n_adder_back);
        coat_n_base = parseFloat(coat_n_base);
        coat_n_adder_base_time = parseFloat(coat_n_adder_base_time);
        coat_n_time_rp = parseFloat(coat_n_time_rp);

        coat_w_cable_base = parseFloat(coat_w_cable_base);
        coat_w_adder_back = parseFloat(coat_w_adder_back);
        coat_w_base = parseFloat(coat_w_base);
        coat_w_adder_base_time = parseFloat(coat_w_adder_base_time);
        coat_w_time_rp = parseFloat(coat_w_time_rp);

        coat_tv_cable_base = parseFloat(coat_tv_cable_base);
        coat_tv_adder_back = parseFloat(coat_tv_adder_back);
        coat_tv_base = parseFloat(coat_tv_base);
        coat_tv_adder_base_time = parseFloat(coat_tv_adder_base_time);
        coat_tv_time_rp = parseFloat(coat_tv_time_rp);

        coat_a_cable_base = parseFloat(coat_a_cable_base);
        coat_a_adder_back = parseFloat(coat_a_adder_back);
        coat_a_base = parseFloat(coat_a_base);
        coat_a_adder_base_time = parseFloat(coat_a_adder_base_time);
        coat_a_time_rp = parseFloat(coat_a_time_rp);

        coat_aw_cable_base = parseFloat(coat_aw_cable_base);
        coat_aw_adder_back = parseFloat(coat_aw_adder_back);
        coat_aw_base = parseFloat(coat_aw_base);
        coat_aw_adder_base_time = parseFloat(coat_aw_adder_base_time);
        coat_aw_time_rp = parseFloat(coat_aw_time_rp);

        coat_an_cable_base = parseFloat(coat_an_cable_base);
        coat_an_adder_back = parseFloat(coat_an_adder_back);
        coat_an_base = parseFloat(coat_an_base);
        coat_an_adder_base_time = parseFloat(coat_an_adder_base_time);
        coat_an_time_rp = parseFloat(coat_an_time_rp);

        coat_ej_cable_base = parseFloat(coat_ej_cable_base);
        coat_ej_adder_back = parseFloat(coat_ej_adder_back);
        coat_ej_base = parseFloat(coat_ej_base);
        coat_ej_adder_base_time = parseFloat(coat_ej_adder_base_time);
        coat_ej_time_rp = parseFloat(coat_ej_time_rp);

        coat_ew_cable_base = parseFloat(coat_ew_cable_base);
        coat_ew_adder_back = parseFloat(coat_ew_adder_back);
        coat_ew_base = parseFloat(coat_ew_base);
        coat_ew_adder_base_time = parseFloat(coat_ew_adder_base_time);
        coat_ew_time_rp = parseFloat(coat_ew_time_rp);

        coat_mc_cable_base = parseFloat(coat_mc_cable_base);
        coat_mc_adder_back = parseFloat(coat_mc_adder_back);
        coat_mc_base = parseFloat(coat_mc_base);
        coat_mc_adder_base_time = parseFloat(coat_mc_adder_base_time);
        coat_mc_time_rp = parseFloat(coat_mc_time_rp);

        switch (covering) {
        case 'W':
            cableBase = coat_w_cable_base;
            adderBack = coat_w_adder_back;
            laborTime = coat_w_base;
            laborAdd = coat_w_adder_base_time;
            laborCalc = coat_w_time_rp;
            break;
        case 'TV':
            cableBase = coat_tv_cable_base;
            adderBack = coat_tv_adder_back;
            laborTime = coat_tv_base;
            laborAdd = coat_tv_adder_base_time;
            laborCalc = coat_tv_time_rp;
            break;
        case 'A':
            cableBase = coat_a_cable_base;
            adderBack = coat_a_adder_back;
            laborTime = coat_a_base;
            laborAdd = coat_a_adder_base_time;
            laborCalc = coat_a_time_rp;
            break;
        case 'AW':
            cableBase = coat_aw_cable_base;
            adderBack = coat_aw_adder_back;
            laborTime = coat_aw_base;
            laborAdd = coat_aw_adder_base_time;
            laborCalc = coat_aw_time_rp;
            break;
        case 'AN':
            cableBase = coat_an_cable_base;
            adderBack = coat_an_adder_back;
            laborTime = coat_an_base;
            laborAdd = coat_an_adder_base_time;
            laborCalc = coat_an_time_rp;
            break;
        case 'E':
            cableBase = coat_ej_cable_base;
            adderBack = coat_ej_adder_back;
            laborTime = coat_ej_base;
            laborAdd = coat_ej_adder_base_time;
            laborCalc = coat_ej_time_rp;
            break;
        case 'EW':
            cableBase = coat_ew_cable_base;
            adderBack = coat_ew_adder_back;
            laborTime = coat_ew_base;
            laborAdd = coat_ew_adder_base_time;
            laborCalc = coat_ew_time_rp;
            break;
        case 'MC':
            cableBase = coat_mc_cable_base;
            adderBack = coat_mc_adder_back;
            laborTime = coat_mc_base;
            laborAdd = coat_mc_adder_base_time;
            laborCalc = coat_mc_time_rp;
            break;
        default:
            cableBase = coat_n_cable_base;
            adderBack = coat_n_adder_back;
            laborTime = coat_n_base;
            laborAdd = coat_n_adder_base_time;
            laborCalc = coat_n_time_rp;
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
        laborCost = (laborTime + laborAdd) + laborCalc * len;
        totalLoadedMaterial = (conn1Price + conn2Price + cableCost) / matYield * (1 + shipHand);
        totalLoadedLabor = (laborCost / 60 * hourlyRate) * overHeadRate;
        unitPrice = (totalLoadedMaterial + (totalLoadedLabor * qm)) / (1 - marginRate);

        return unitPrice.toFixed(2);
    };

    $scope.calcLoss = function (k1, k2) {
        var loss,
            freq = $scope.search_freq,
            len = $scope.clength;

        if ($scope.metric === false) {
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);
        } else if ($scope.metric === true) {
            len = len / 2.52;
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * ((len * 3.2808333) / 12);
        }

        return loss.toFixed(2);
    };

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

    $scope.rflabsPartNo = function (conn_1_part_no, part_no, covering, len, conn_2_part_no) {
        var conn_1 = localStorage.getItem('conn_1'),
            conn_2 = localStorage.getItem('conn_2'),
            rflabsPart;

        if (covering === undefined) { covering = ''; }

        if (conn_1 === '' && conn_2 === '') {
            return '2 Connector(s) Missing';
        }

        if ((conn_1 !== '' && conn_2 === '') || (conn_1 === '' && conn_2 !== '')) {
            return '1 Connector(s) Missing';
        }

        if (conn_1 !== undefined && conn_1 !== '' && conn_2 !== undefined && conn_2 !== '') {
            if ($scope.metric === true) {
                len = len / 2.52;
            }

            len = $filter('noComma')(len);

            rflabsPart = conn_1_part_no + '-' + part_no + covering + '-' + len + '-' + conn_2_part_no;
            return rflabsPart;
        }
    };

    $scope.addCart = function (name, part_no, k1, k2, conn_1_price, conn_2_price, covering) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [],
            conn_1,
            conn_1_part_no,
            conn_1_description,
            conn_2,
            conn_2_part_no,
            conn_2_description,
            newCart,
            i;

        if (cart.length >= 12) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The cart has reached its limit of 12 items. Items must be deleted before anymore can be added.";
            $scope.notification_button = "Close";
        } else if (!$scope.search_freq || $scope.search_freq === null) {
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
            $scope.rf_part = $scope.conn_1 + '-' + $scope.part_no + $scope.covering + '-' + $scope.clength + '-' + $scope.conn_2;

            localStorage.conn_1 = localStorage.getItem('conn_1');
            conn_1 = JSON.parse(localStorage.conn_1);
            conn_1_part_no = conn_1.con_part_no;

            localStorage.conn_2 = localStorage.getItem('conn_2');
            conn_2 = JSON.parse(localStorage.conn_2);
            conn_2_part_no = conn_2.con_part_no;

            for (i = 0; i < $scope.connectors.length; i += 1) {
                if ($scope.connectors[i].con_part_no === conn_1_part_no) {
                    conn_1_description = $scope.connectors[i].con_description;
                }

                if ($scope.connectors[i].con_part_no === conn_2_part_no) {
                    conn_2_description = $scope.connectors[i].con_description;
                }
            }

            newCart =
                {
                    'id': $scope.part_id,
                    'name': name,
                    'part_no': part_no,
                    'k1': k1,
                    'k2': k2,
                    'conn_1_part_no': conn_1_part_no,
                    'conn_1_description': conn_1_description,
                    'conn_1_price': conn_1_price,
                    'conn_2_part_no': conn_2_part_no,
                    'conn_2_description': conn_2_description,
                    'conn_2_price': conn_2_price,
                    'covering': covering,
                    'quantity': 1,
                    'length': $scope.clength,
                    'price': '',
                    'freq': $scope.search_freq
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
        localStorage.setItem('conn_1', '');
        $scope.conn_1 = '';
        $scope.droppedObjects1 = [];
    };

    $scope.clearBin_2 = function () {
        localStorage.setItem('conn_2', '');
        $scope.conn_2 = localStorage.getItem('conn_2');
        $scope.droppedObjects2 = [];
    };

    $scope.onClick = function (data) {
        var index_1, index_2, objects_1, objects_2, jsonString, conn_1, conn_2, con_rank_1, con_rank_2;

        index_1 = $scope.droppedObjects1.indexOf(data);
        index_2 = $scope.droppedObjects2.indexOf(data);
        objects_1 = $scope.droppedObjects1.length;
        objects_2 = $scope.droppedObjects2.length;

        if (index_1 === -1 && objects_1 === 0) {
            $scope.droppedObjects1.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_1', jsonString);
            $scope.conn_1 = JSON.parse(localStorage.getItem('conn_1'));

            conn_1 = JSON.parse(localStorage.conn_1);
            conn_2 = JSON.parse(localStorage.conn_2);

            con_rank_1 = conn_1.con_rank;
            con_rank_2 = conn_2.con_rank;

            if (con_rank_1 > con_rank_2) {
                $scope.notification = true;
                $scope.notification_title = "Error";
                $scope.notification_message = "Connector weighting protocol has switched connector placement to conform with standard naming protocol.";
                $scope.notification_button = "Close";

                localStorage.setItem('conn_1', '');
                $scope.conn_1 = '';
                $scope.droppedObjects1 = [];

                localStorage.setItem('conn_2', '');
                $scope.conn_2 = '';
                $scope.droppedObjects2 = [];

                $scope.conn_1 = conn_2;
                $scope.conn_2 = conn_1;

                $scope.droppedObjects1.push(conn_2);
                $scope.droppedObjects2.push(conn_1);

                localStorage.setItem('conn_1', JSON.stringify(conn_1));
                localStorage.setItem('conn_2', JSON.stringify(conn_2));
            }
        } else if (index_2 === -1 && objects_2 === 0) {
            $scope.droppedObjects2.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_2', jsonString);
            $scope.conn_2 = JSON.parse(localStorage.getItem('conn_2'));

            conn_1 = JSON.parse(localStorage.conn_1);
            conn_2 = JSON.parse(localStorage.conn_2);

            con_rank_1 = conn_1.con_rank;
            con_rank_2 = conn_2.con_rank;

            if (con_rank_1 > con_rank_2) {
                $scope.notification = true;
                $scope.notification_title = "Error";
                $scope.notification_message = "Connector weighting protocol has switched connector placement to conform with standard naming protocol.";
                $scope.notification_button = "Close";

                localStorage.setItem('conn_1', '');
                $scope.conn_1 = '';
                $scope.droppedObjects1 = [];

                localStorage.setItem('conn_2', '');
                $scope.conn_2 = '';
                $scope.droppedObjects2 = [];

                $scope.conn_1 = conn_2;
                $scope.conn_2 = conn_1;

                $scope.droppedObjects1.push(conn_2);
                $scope.droppedObjects2.push(conn_1);

                localStorage.setItem('conn_1', JSON.stringify(conn_1));
                localStorage.setItem('conn_2', JSON.stringify(conn_2));
            }
        } else if (objects_1 > 0 && objects_2 > 0) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "Only one connector allowed.";
            $scope.notification_button = "Close";
        }
    };

    $scope.onDrop_1 = function (data) {
        var index = $scope.droppedObjects1.indexOf(data),
            objects = $scope.droppedObjects1.length,
            jsonString;

        if (index === -1 && objects === 0) {
            $scope.droppedObjects1.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_1', jsonString);
            $scope.conn_1 = JSON.parse(localStorage.getItem('conn_1'));
        }
    };

    $scope.onDrop_2 = function (data) {
        var index = $scope.droppedObjects2.indexOf(data),
            objects = $scope.droppedObjects2.length,
            jsonString;

        if (index === -1 && objects === 0) {
            $scope.droppedObjects2.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_2', jsonString);
            $scope.conn_2 = JSON.parse(localStorage.getItem('conn_2'));
        }
    };

    // filter connectors by frequency
    $scope.greaterThanFreq = function (val) {
        return function (item) {
            if (item.con_max_freq >= val) {
                return true;
            }
        };
    };
}]);
