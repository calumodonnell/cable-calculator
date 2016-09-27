/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// connectorCtrl controller

app.controller('connectorCtrl', ['$scope', '$http', '$location', '$filter', 'connectors', function ($scope, $http, $location, $filter, connectors) {
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
        var loss = 0,
            freq = 0,
            len = 0;

        if ($scope.clength) { freq = $scope.clength; }

        if ($scope.search_freq) { len = $scope.search_freq; }

        if (jQuery("#loss").hasClass("metric")) {
            loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);
        } else if (jQuery("#loss").hasClass("imperial")) {
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

    $scope.macolaPartNo = function (part_no, conn_1_part_no, conn_2_part_no, len, covering) {
        var conn_1 = localStorage.getItem('conn_1'),
            conn_2 = localStorage.getItem('conn_2'),
            macolaPart,
            conn_1_mac_code,
            conn_2_mac_code,
            i;

        if (covering === undefined) { covering = ''; }

        if (conn_1 === '' && conn_2 === '') {
            return '2 Parts Missing';
        } else if ((conn_1 !== '' && conn_2 === '') || (conn_1 === '' && conn_2 !== '')) {
            return '1 Part Missing';
        } else if (conn_1 !== undefined && conn_1 !== '' && conn_2 !== undefined && conn_2 !== '') {
            len = $filter('rfLength')(len);

            for (i = 0; i < $scope.connectors.length; i += 1) {
                if ($scope.connectors[i].con_part_no === conn_1_part_no) {
                    conn_1_mac_code = $scope.connectors[i].con_mac_code;
                }

                if ($scope.connectors[i].con_part_no === conn_2_part_no) {
                    conn_2_mac_code = $scope.connectors[i].con_mac_code;
                }
            }

            macolaPart = part_no + conn_1_mac_code + conn_2_mac_code + '#' + len + covering;
            return macolaPart;
        }
    };

    $scope.rflabsPartNo = function (conn_1_part_no, part_no, covering, len, conn_2_part_no) {
        var conn_1 = localStorage.getItem('conn_1'),
            conn_2 = localStorage.getItem('conn_2'),
            rflabsPart;

        if (covering === undefined) { covering = ''; }

        if (conn_1 === '' && conn_2 === '') {
            return '2 Parts Missing';
        } else if ((conn_1 !== '' && conn_2 === '') || (conn_1 === '' && conn_2 !== '')) {
            return '1 Part Missing';
        } else if (conn_1 !== undefined && conn_1 !== '' && conn_2 !== undefined && conn_2 !== '') {
            len = $filter('noComma')(len);

            rflabsPart = conn_1_part_no + '-' + part_no + covering + '-' + len + '-' + conn_2_part_no;
            return rflabsPart;
        }
    };

    $scope.addCart = function (name, part_no) {
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
                macolaPart = localStorage.getItem('macolaPart'),
                rflabsPart = localStorage.getItem('rflabsPart'),
                newCart =
                    {
                        'id': $scope.part_id,
                        'name': name,
                        'part_no': part_no,
                        'conn_1': 'SMS - SMA Male Straight',
                        'conn_2': 'SMS - SMA Male Straight',
                        'quantity': 1,
                        'length': $scope.clength
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
        $scope.conn_1 = localStorage.getItem('conn_1');
        $scope.droppedObjects1 = [];
    };

    $scope.clearBin_2 = function () {
        localStorage.setItem('conn_2', '');
        $scope.conn_2 = localStorage.getItem('conn_2');
        $scope.droppedObjects2 = [];
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

    $scope.printDrawing = function () {
        var pdf = new jsPDF('p', 'pt', 'a4'),
            source = "<html> <head> <title>Cable Assembly Cart Summary</title> <style type='text/css'> .pdf-container{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color: #58595B; font-weight: 300; font-size: 12px;}.pdf-header{margin-bottom: 20px;}.address-header{display: inline-block;}p{margin: 0; margin-bottom: 5px;}b{font-weight: 600}.logo-header{display: inline-block; vertical-align: top; float: right;}.logo-header img{width: 80px; height: auto;}.pdf-content{margin-bottom: 20px;}table{width: 100%;}td, th{padding: 4px 8px}tbody tr:nth-child(even){background-color: #F2F2F2;}.pdf-footer{clear: both;}.pdf-footer .sales-disclaimer{display: inline-block;}.pdf-footer .printed-date{display: inline-block;}</style> </head> <body> <div class='pdf-container'> <header class='pdf-header'> <div class='address-header'> <p><b>Florida RF Labs, Inc.</b></p><p>8851 SW Old Kansas Ave.</p><p>Stuart, FL 34997</p><p>Tel: (772) 286-9300</p><p>Fax: (772) 283-5286</p><p><a href='http://www.emc-rflabs.com'>www.emc-rflabs.com</a></p></div><div class='logo-header'> <img src='../wp-content/plugins/cable-wizard/img/rflabs.png'> </div></header> <div class='pdf-content'> <h1>Cable Assembly Cart Summary</h1> <table> <thead> <tr> <th>Order Number</th> <th>Part Number</th> <th>Quantity</th> <th>Unit Price</th> <th>Ext. Amount</th> </tr></thead> <tbody> <tr> <td>AL141LLSPS1S1#00060</td><td>SMS-AL141LLSP-6.0-SMS</td><td>1</td><td>$124.49</td><td>$124.49</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$124.49</td><td>4 - 9 <br>$100.58</td><td>10 - 24 <br>$78.68</td><td>25 - 49 <br>$68.55</td><td>50 - 99 <br>$60.67</td><td>100+ <br>$52.78</td></tr></table> </td></tr><tr> <td>085S1S2#00060</td><td>SMS-085-6.0-SMR</td><td>1</td><td>$85.33</td><td>$85.33</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$85.33</td><td>4 - 9 <br>$68.49</td><td>10 - 24 <br>$51.65</td><td>25 - 49 <br>$45.92</td><td>50 - 99 <br>$40.37</td><td>100+ <br>$34.81</td></tr></table> </td></tr></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td>Total: $209.82</td></tr></tfoot> </table> </div><footer class='pdf-footer'> <div class='sales-disclaimer'> <p>THIS QUOTE IS SUBJECT TO ALL EXPORT CONTROL REGULATIONS OF THE UNITED STATES.</p><p>Cable Assemblies have a $250.00 line item minimum requirement.</p><p>Component Product line has a $1000.00 line item minimum requirement.</p><p>Lead times quoted are ARO (after receipt of order) and does not include transit time.</p><p>Prices are based on the information available at the time of quotation. Quality Assurance provisions, First Article Verification, Source Inspection and Special Packaging requirements not quoted and appear on the purchase order may affect prices quoted herein. Florida RF Labs reserves the right to amend this quotation if these requirements are not quoted and appear on the purchase order.</p><p>Click <a href='http://www.emc-rflabs.com/Rflabs/media/Generic-Library/General%20Information/432F024-EMC-RF-LABS-SALES-TERMS-AND-CONDITIONS.pdf' target='_blank'>here</a> for T&Cs</p></div><div class='printed-date'> <p>PRINTED: <span id='currentdate'>09/14/2016</span></p></div></footer> </div></body></html>",
            margins = {
                top: 40,
                bottom: 60,
                left: 40,
                width: 522
            };

        pdf.fromHTML(
            source,
            margins.left,
            margins.top,
            {
                'width': margins.width
            },
            function () {
                //pdf.save('cable-wizard-drawing.pdf');
                pdf.output('dataurlnewwindow');
            },
            margins
        );
    };
}]);
