/*jslint browser:true*/
/*global $, alert, angular, console, app*/

// connectorCtrl controller
app.controller('connectorCtrl', ['$scope', '$http', '$location', '$filter', 'connectors', function ($scope, $http, $location, $filter, connectors) {
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

    // if values set are for freq, set to stored value
    if (localStorage.getItem('max_freq')) { $scope.search_freq = parseFloat(localStorage.getItem('max_freq'), 10); }

    // if values set are for length, set to stored value
    if (localStorage.getItem('clength')) { $scope.clength = parseInt(localStorage.getItem('clength'), 10); }

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

    connectors.then(function (data) {
        $scope.connectors = data;
    });

    $http.get("../wp-content/plugins/cable-wizard/app/data/covering.php", {params: {"part_id": $scope.part_id}}).then(function (response) { $scope.covers = response.data.covering; });
    $http.get("../wp-content/plugins/cable-wizard/app/data/cable-info.php", {params: {"part_id": $scope.part_id}}).then(function (response) { $scope.cables = response.data.cables; });

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

    $scope.toCart = function () {
        var cart = JSON.parse(localStorage.getItem('cart'));

        if (cart.length <= 0) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "There are currently no cables in your cart.";
            $scope.notification_button = "Close";
        } else {
            $location.path("/cart");
        }
    };

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
        var conn_1, conn_2;

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
        localStorage.setItem('clength', val);

        $scope.cableCost();
    };

    $scope.notificationHide = function () {
        $scope.notification = false;
    };

    $scope.cableCost = function () {
        $http.get("../wp-content/plugins/cable-wizard/app/data/cable-cost.php", {params: {'part_id': $scope.part_id, 'length': $scope.clength, 'conn_1': $scope.conn_1.con_part_no, 'conn_2': $scope.conn_2.con_part_no}}).then(function (response) { $scope.cable_price = response.data.prices; });
    };

    $scope.cableCost = function (cover) {
        $http.get("../wp-content/plugins/cable-wizard/app/data/cable-cost.php", {params: {'part_id': $scope.part_id, 'length': $scope.clength, 'covering': cover, 'conn_1': $scope.conn_1.con_part_no, 'conn_2': $scope.conn_2.con_part_no}}).then(function (response) { $scope.cable_price = response.data.prices; });
    };

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

    // update length depending on measurement type
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
                $scope.clength = $scope.clength.toFixed(0);
                $scope.clength = parseInt($scope.clength, 10);

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
                len = len / 2.54;
                len = len.toFixed(0);
            }

            len = $filter('noComma')(len);

            rflabsPart = conn_1_part_no + '-' + part_no + covering + '-' + len + '-' + conn_2_part_no;
            return rflabsPart;
        }
    };

    $scope.addCart = function (name, part_no, k1, k2, covering) {
        var cart = JSON.parse(localStorage.getItem('cart')) || [],
            conn_1,
            conn_1_part_no,
            conn_1_series,
            conn_1_description,
            conn_1_max_freq,
            conn_1_rank,
            conn_1_hash,
            conn_2,
            conn_2_part_no,
            conn_2_series,
            conn_2_description,
            conn_2_max_freq,
            conn_2_rank,
            conn_2_hash,
            newCart,
            i,
            len;

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
        } else if ($scope.clength > 3024 && $scope.metric === true) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This application has a maximum length of 3024 cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
        } else if ($scope.clength > 1200 && $scope.metric === false) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This application has a maximum length of 1200 in. Please contact the factory for custom lengths.";
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
            conn_1_series = conn_1.con_series;
            conn_1_max_freq = conn_1.con_max_freq;
            conn_1_rank = conn_1.con_rank;
            conn_1_hash = conn_1.$$hashKey;

            localStorage.conn_2 = localStorage.getItem('conn_2');
            conn_2 = JSON.parse(localStorage.conn_2);
            conn_2_part_no = conn_2.con_part_no;
            conn_2_series = conn_2.con_series;
            conn_2_max_freq = conn_2.con_max_freq;
            conn_2_rank = conn_2.con_rank;
            conn_2_hash = conn_2.$$hashKey;

            for (i = 0; i < $scope.connectors.length; i += 1) {
                if ($scope.connectors[i].con_part_no === conn_1_part_no) {
                    conn_1_description = $scope.connectors[i].con_description;
                }

                if ($scope.connectors[i].con_part_no === conn_2_part_no) {
                    conn_2_description = $scope.connectors[i].con_description;
                }
            }

            if ($scope.metric === true) { len = $scope.clength / 2.54; } else { len = $scope.clength; }

            len = len.toFixed(1);
            len = parseFloat(len);

            newCart = {
                'id': $scope.part_id,
                'name': name,
                'part_no': part_no,
                'k1': k1,
                'k2': k2,
                'conn_1_part_no': conn_1_part_no,
                'conn_1_series': conn_1_series,
                'conn_1_description': conn_1_description,
                'conn_1_max_freq': conn_1_max_freq,
                'conn_1_rank': conn_1_rank,
                'conn_1_hash': conn_1_hash,
                'conn_2_part_no': conn_2_part_no,
                'conn_2_series': conn_2_series,
                'conn_2_description': conn_2_description,
                'conn_2_max_freq': conn_2_max_freq,
                'conn_2_rank': conn_2_rank,
                'conn_2_hash': conn_2_hash,
                'covering': covering,
                'quantity': 1,
                'length': len,
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

    $scope.cableCovering = function (cover) {
        $scope.cableCost(cover);
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
        $scope.conn_2 = '';
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

            if (!objects_1 && !objects_2) {
                localStorage.setItem('conn_1', jsonString);
                $scope.conn_1 = JSON.parse(localStorage.getItem('conn_1'));
            } else {
                localStorage.setItem('conn_1', jsonString);
                $scope.conn_1 = JSON.parse(localStorage.getItem('conn_1'));

                conn_1 = JSON.parse(localStorage.conn_1);
                conn_2 = JSON.parse(localStorage.conn_2);

                con_rank_1 = conn_1.$$hashKey;
                con_rank_2 = conn_2.$$hashKey;

                $scope.cableCost();

                if (con_rank_1 > con_rank_2) {
                    $scope.notification = true;
                    $scope.notification_title = "Error";
                    $scope.notification_message = "Connector weighting protocol has switched connector placement to conform with standard naming protocol.";
                    $scope.notification_button = "Close";

                    localStorage.setItem('conn_1', '');
                    localStorage.setItem('conn_1', JSON.stringify(conn_2));
                    localStorage.setItem('conn_2', '');
                    localStorage.setItem('conn_2', JSON.stringify(conn_1));

                    $scope.conn_1 = '';
                    $scope.conn_1 = conn_2;
                    $scope.conn_2 = '';
                    $scope.conn_2 = conn_1;

                    $scope.droppedObjects1 = [];
                    $scope.droppedObjects1.push(conn_2);
                    $scope.droppedObjects2 = [];
                    $scope.droppedObjects2.push(conn_1);
                }
            }
        } else if (index_2 === -1 && objects_2 === 0) {
            $scope.droppedObjects2.push(data);

            jsonString = JSON.stringify(data);

            localStorage.setItem('conn_2', jsonString);
            $scope.conn_2 = JSON.parse(localStorage.getItem('conn_2'));

            conn_1 = JSON.parse(localStorage.conn_1);
            conn_2 = JSON.parse(localStorage.conn_2);

            con_rank_1 = conn_1.$$hashKey;
            con_rank_2 = conn_2.$$hashKey;

            $scope.cableCost();

            if (con_rank_1 > con_rank_2) {
                $scope.notification = true;
                $scope.notification_title = "Error";
                $scope.notification_message = "Connector weighting protocol has switched connector placement to conform with standard naming protocol.";
                $scope.notification_button = "Close";

                localStorage.setItem('conn_1', '');
                localStorage.setItem('conn_1', JSON.stringify(conn_2));
                localStorage.setItem('conn_2', '');
                localStorage.setItem('conn_2', JSON.stringify(conn_1));

                $scope.conn_1 = '';
                $scope.conn_1 = conn_2;
                $scope.conn_2 = '';
                $scope.conn_2 = conn_1;

                $scope.droppedObjects1 = [];
                $scope.droppedObjects1.push(conn_2);
                $scope.droppedObjects2 = [];
                $scope.droppedObjects2.push(conn_1);
            }
        } else if (objects_1 > 0 && objects_2 > 0) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "Only one connector allowed.";
            $scope.notification_button = "Close";
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
