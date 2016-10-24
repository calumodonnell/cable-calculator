/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

// cartCtrl controller
app.controller('cartCtrl', ['$scope', '$filter', 'cables', 'connectors', function ($scope, $filter, cables, connectors) {
    "use strict";

    var initializing = false;

    $scope.cart = JSON.parse(localStorage.getItem('cart'));

    cables.then(function (data) {
        $scope.cables = data;
    });

    connectors.then(function (data) {
        $scope.connectors = data;
    });

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

    $scope.showWelcome = function () {
        if ((localStorage.getItem('cart') === '[]' || localStorage.getItem('cart') === '') && (localStorage.getItem('clength') === '' || localStorage.getItem('clength') === 'null' || localStorage.getItem('clength') === 'NaN') && (localStorage.getItem('max_freq') === '' || localStorage.getItem('max_freq') === 'null')) {
            $scope.notification = true;
            $scope.notification_title = "Welcome";
            $scope.notification_message = "Welcome to the Cable Calculator.";
            $scope.notification_button = "Enter";
            localStorage.setItem('measure', 'false');
        }
    };
    $scope.showWelcome();

    $scope.rflabsPartNo = function (len, index) {
        var cart,
            part_no,
            conn_1_part_no,
            conn_2_part_no,
            covering,
            rflabsPart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        part_no = cart[index].part_no;
        conn_1_part_no = cart[index].conn_1_part_no;
        conn_2_part_no = cart[index].conn_2_part_no;
        covering = cart[index].covering;

        if (covering === undefined) { covering = ''; }

        if (localStorage.getItem('metric') === true) {
            len = len / 2.52;
        }

        len = $filter('noComma')(len);

        rflabsPart = conn_1_part_no + '-' + part_no + covering + '-' + len + '-' + conn_2_part_no;
        return rflabsPart;
    };

    $scope.cartLength = function () {
        var total,
            cart;

        if (localStorage.getItem('cart')) { cart = JSON.parse(localStorage.getItem('cart')); }

        if (cart === '' || cart === '[]' || cart === undefined || cart === null) {
            total = 0;
        } else {
            total = cart.length;
        }

        return total;
    };

    $scope.totalQuantity = function () {
        var total = 0,
            i,
            cart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        if (cart === '[]' || cart === '' || cart === undefined || cart === null) {
            total = 0;
        } else {
            for (i = 0; i < cart.length; i += 1) {
                total = total + cart[i].quantity;
            }
        }

        return total;
    };

    $scope.dateNow = function () {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    };

    $scope.unitPrice = function (len, quantity, conn1Price, conn2Price, index) {
        var cart,
            i,
            qm,
            marginRate = 0,
            hourlyRate = 0,
            overHeadRate = 0,
            shipHand = 0,
            matYield = 0,
            qm1 = 0,
            qm2 = 0,
            qm3 = 0,
            qm4 = 0,
            qm5 = 0,
            qm6 = 0,
            qm7 = 0,
            qm8 = 0,
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
            coat_n_cable_base = 0,
            coat_n_adder_back = 0,
            coat_n_base = 0,
            coat_n_adder_base_time = 0,
            coat_n_time_rp = 0,
            coat_w_cable_base = 0,
            coat_w_adder_back = 0,
            coat_w_base = 0,
            coat_w_adder_base_time = 0,
            coat_w_time_rp = 0,
            coat_tv_cable_base = 0,
            coat_tv_adder_back = 0,
            coat_tv_base = 0,
            coat_tv_adder_base_time = 0,
            coat_tv_time_rp = 0,
            coat_a_cable_base = 0,
            coat_a_adder_back = 0,
            coat_a_base = 0,
            coat_a_adder_base_time = 0,
            coat_a_time_rp = 0,
            coat_aw_cable_base = 0,
            coat_aw_adder_back = 0,
            coat_aw_base = 0,
            coat_aw_adder_base_time = 0,
            coat_aw_time_rp = 0,
            coat_an_cable_base = 0,
            coat_an_adder_back = 0,
            coat_an_base = 0,
            coat_an_adder_base_time = 0,
            coat_an_time_rp = 0,
            coat_ej_cable_base = 0,
            coat_ej_adder_back = 0,
            coat_ej_base = 0,
            coat_ej_adder_base_time = 0,
            coat_ej_time_rp = 0,
            coat_ew_cable_base = 0,
            coat_ew_adder_back = 0,
            coat_ew_base = 0,
            coat_ew_adder_base_time = 0,
            coat_ew_time_rp = 0,
            coat_mc_cable_base = 0,
            coat_mc_adder_back = 0,
            coat_mc_base = 0,
            coat_mc_adder_base_time = 0,
            coat_mc_time_rp = 0;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        //console.log($scope.cables.length);

        if ($scope.cables.length) {
            for (i = 0; i < $scope.cables.length; i += 1) {
                if (cart[index].id === $scope.cables[i].id) {
                    marginRate = parseFloat($scope.cables[i].margin_rate);
                    hourlyRate = parseFloat($scope.cables[i].hour_lab_rate);
                    overHeadRate = parseFloat($scope.cables[i].overhead_rate);
                    shipHand = parseFloat($scope.cables[i].ship_handling);
                    matYield = parseFloat($scope.cables[i].material_yield);

                    qm1 = parseFloat($scope.cables[i].qm1);
                    qm2 = parseFloat($scope.cables[i].qm2);
                    qm3 = parseFloat($scope.cables[i].qm3);
                    qm4 = parseFloat($scope.cables[i].qm4);
                    qm5 = parseFloat($scope.cables[i].qm5);
                    qm6 = parseFloat($scope.cables[i].qm6);
                    qm7 = parseFloat($scope.cables[i].qm7);
                    qm8 = parseFloat($scope.cables[i].qm8);

                    coat_n_cable_base = parseFloat($scope.cables[i].coat_n_cable_base);
                    coat_n_adder_back = parseFloat($scope.cables[i].coat_n_adder_back);
                    coat_n_base = parseFloat($scope.cables[i].coat_n_base);
                    coat_n_adder_base_time = parseFloat($scope.cables[i].coat_n_adder_base_time);
                    coat_n_time_rp = parseFloat($scope.cables[i].coat_n_time_rp);

                    coat_w_cable_base = parseFloat($scope.cables[i].coat_w_cable_base);
                    coat_w_adder_back = parseFloat($scope.cables[i].coat_w_adder_back);
                    coat_w_base = parseFloat($scope.cables[i].coat_w_base);
                    coat_w_adder_base_time = parseFloat($scope.cables[i].coat_w_adder_base_time);
                    coat_w_time_rp = parseFloat($scope.cables[i].coat_w_time_rp);

                    coat_tv_cable_base = parseFloat($scope.cables[i].coat_tv_cable_base);
                    coat_tv_adder_back = parseFloat($scope.cables[i].coat_tv_adder_back);
                    coat_tv_base = parseFloat($scope.cables[i].coat_tv_base);
                    coat_tv_adder_base_time = parseFloat($scope.cables[i].coat_tv_adder_base_time);
                    coat_tv_time_rp = parseFloat($scope.cables[i].coat_tv_time_rp);

                    coat_a_cable_base = parseFloat($scope.cables[i].coat_a_cable_base);
                    coat_a_adder_back = parseFloat($scope.cables[i].coat_a_adder_back);
                    coat_a_base = parseFloat($scope.cables[i].coat_a_base);
                    coat_a_adder_base_time = parseFloat($scope.cables[i].coat_a_adder_base_time);
                    coat_a_time_rp = parseFloat($scope.cables[i].coat_a_time_rp);

                    coat_aw_cable_base = parseFloat($scope.cables[i].coat_aw_cable_base);
                    coat_aw_adder_back = parseFloat($scope.cables[i].coat_aw_adder_back);
                    coat_aw_base = parseFloat($scope.cables[i].coat_aw_base);
                    coat_aw_adder_base_time = parseFloat($scope.cables[i].coat_aw_adder_base_time);
                    coat_aw_time_rp = parseFloat($scope.cables[i].coat_aw_time_rp);

                    coat_an_cable_base = parseFloat($scope.cables[i].coat_an_cable_base);
                    coat_an_adder_back = parseFloat($scope.cables[i].coat_an_adder_back);
                    coat_an_base = parseFloat($scope.cables[i].coat_an_base);
                    coat_an_adder_base_time = parseFloat($scope.cables[i].coat_an_adder_base_time);
                    coat_an_time_rp = parseFloat($scope.cables[i].coat_an_time_rp);

                    coat_ej_cable_base = parseFloat($scope.cables[i].coat_ej_cable_base);
                    coat_ej_adder_back = parseFloat($scope.cables[i].coat_ej_adder_back);
                    coat_ej_base = parseFloat($scope.cables[i].coat_ej_base);
                    coat_ej_adder_base_time = parseFloat($scope.cables[i].coat_ej_adder_base_time);
                    coat_ej_time_rp = parseFloat($scope.cables[i].coat_ej_time_rp);

                    coat_ew_cable_base = parseFloat($scope.cables[i].coat_ew_cable_base);
                    coat_ew_adder_back = parseFloat($scope.cables[i].coat_ew_adder_back);
                    coat_ew_base = parseFloat($scope.cables[i].coat_ew_base);
                    coat_ew_adder_base_time = parseFloat($scope.cables[i].coat_ew_adder_base_time);
                    coat_ew_time_rp = parseFloat($scope.cables[i].coat_ew_time_rp);

                    coat_mc_cable_base = parseFloat($scope.cables[i].coat_mc_cable_base);
                    coat_mc_adder_back = parseFloat($scope.cables[i].coat_mc_adder_back);
                    coat_mc_base = parseFloat($scope.cables[i].coat_mc_base);
                    coat_mc_adder_base_time = parseFloat($scope.cables[i].coat_mc_adder_base_time);
                    coat_mc_time_rp = parseFloat($scope.cables[i].coat_mc_time_rp);
                }
            }
        }

        switch (cart[index].covering) {
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

        quantity = parseFloat(quantity);

        if ((quantity <= 3) && (quantity >= 1)) {
            qm = qm1;
        } else if ((quantity <= 9) && (quantity >= 4)) {
            qm = qm2;
        } else if ((quantity <= 24) && (quantity >= 10)) {
            qm = qm3;
        } else if ((quantity <= 49) && (quantity >= 25)) {
            qm = qm4;
        } else if ((quantity <= 99) && (quantity >= 50)) {
            qm = qm5;
        } else if ((quantity <= 249) && (quantity >= 100)) {
            qm = qm6;
        } else if ((quantity <= 499) && (quantity >= 250)) {
            qm = qm7;
        } else if ((quantity <= 500) && (quantity >= 1000)) {
            qm = qm8;
        }

        cableCost = (cableBase * len / 12) + adderBack;
        laborCost = (laborTime + laborAdd) + laborCalc * len;
        totalLoadedMaterial = (parseFloat(conn1Price) + parseFloat(conn2Price) + cableCost) / matYield * (1 + shipHand);
        totalLoadedLabor = (laborCost / 60 * hourlyRate) * overHeadRate;
        unitPrice = (totalLoadedMaterial + (totalLoadedLabor * qm)) / (1 - marginRate);

        unitPrice = unitPrice.toFixed(2);

        return unitPrice;
    };

    $scope.cablePrice = function (len, quantity, conn1Price, conn2Price, index) {
        var cart,
            unitPrice;

        unitPrice = $scope.unitPrice(len, quantity, conn1Price, conn2Price, index);

        unitPrice = unitPrice * quantity;

        unitPrice = unitPrice.toFixed(2);

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);
        cart[index].price = unitPrice;
        localStorage.cart = JSON.stringify(cart);

        return unitPrice;
    };

    $scope.totalPrice = function () {
        var total = 0,
            cart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        angular.forEach(cart, function (value) {
            total = total + parseFloat(value.price);
        });

        return total;
    };

    $scope.notificationHide = function () {
        $scope.notification = false;
    };

    $scope.deleteItem = function (index) {
        $scope.cart.splice(index, 1);

        localStorage.cart = localStorage.getItem('cart');

        var cart = JSON.parse(localStorage.cart);

        cart.splice(index, 1);

        localStorage.cart = JSON.stringify(cart);
    };

    $scope.duplicateItem = function (index) {
        localStorage.cart = localStorage.getItem('cart');
        var cart = JSON.parse(localStorage.cart),
            assembly = cart[index];

        if (cart.length >= 12) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The cart has reached its limit of 12 items. Items must be deleted before anymore can be added.";
            $scope.notification_button = "Close";
        } else {
            cart.push(assembly);
            localStorage.cart = JSON.stringify(cart);
            $scope.cart = JSON.parse(localStorage.getItem('cart'));
        }
    };

    $scope.clearCart = function () {
        $scope.cart = "";
        localStorage.setItem('cart', '[]');
    };

    $scope.storeQuantity = function (quantity, index) {
        localStorage.cart = localStorage.getItem('cart');

        var cart = JSON.parse(localStorage.cart);

        cart[index].quantity = quantity;

        localStorage.cart = JSON.stringify(cart);
    };

    $scope.lengthCheck = function (len, index) {
        if (len < 15 && $scope.metric === true) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This program has a minimum length of 15 cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            len = 15;
        } else if (len < 6 && $scope.metric === false) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "This program has a maximum length of 6 in. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            len = 6;
        } else if (len > 3024 && $scope.metric === true) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The program has a maximum length of 3024 cm. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            len = 3024;
        } else if (len > 1200 && $scope.metric === false) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "The program has a maximum length of 1200 in. Please contact the factory for custom lengths.";
            $scope.notification_button = "Close";
            len = 1200;
        }

        localStorage.cart = localStorage.getItem('cart');
        var cart = JSON.parse(localStorage.cart);

        if (len === null) {
            len = 6;
            cart[index].length = len;
        } else {
            cart[index].length = len;
        }

        localStorage.cart = JSON.stringify(cart);

        $scope.cart = JSON.parse(localStorage.getItem('cart'));
    };

    $scope.showQuotation = function () {
        var cart = '[]';

        if (localStorage.getItem('cart')) { cart = JSON.parse(localStorage.getItem('cart')); }

        if (cart === '' || cart === '[]' || cart === undefined || cart === null || cart.length === 0) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "Your cart is empty. Items need to be added to your cart before you can print your quotation.";
            $scope.notification_button = "Close";
        } else if (cart) {
            $scope.print_quotation = true;
        }
    };

    $scope.quotationHide = function () {
        $scope.print_quotation = false;
    };

    $scope.showDrawing = function (val) {
        $scope.print_drawing = true;
        $scope.drawing = val;
    };

    $scope.drawingHide = function () {
        $scope.print_drawing = false;
    };

    function printElement(elem) {
        var $printSection = document.getElementById("printSection"),
            domClone;

        if (!$printSection) {
            $printSection = document.createElement("div");
            $printSection.id = "printSection";
            document.body.appendChild($printSection);
        }

        domClone = elem.cloneNode(true);
        $printSection.innerHTML = '';
        $printSection.appendChild(domClone);
        window.print();
        $printSection.innerHTML = '';
    }

    $scope.printQuotation = function () {
        printElement(document.getElementById("print-quotation"));
    };

    $scope.printDrawing = function () {
        printElement(document.getElementById("print-drawing"));
    };

    $scope.covering = function (cover) {
        switch (cover) {
        case 'W':
            return "Weatherized";
        case 'TV':
            return "Thermal Vacuum";
        case 'A':
            return "Armor";
        case 'AW':
            return "Armor/Weatherized";
        case 'AN':
            return "Armor/Neoprene";
        case 'E':
            return "Extended Boot";
        case 'EW':
            return "Extended Boot/Weatherized";
        case 'MC':
            return "Monocoil";
        default:
            return "None";
        }
    };

    $scope.$watch('metric', function () {
        if (initializing) {
            initializing = false;
        } else {
            localStorage.setItem('measure', $scope.metric);

            var len;

            if ($scope.metric === true) {
                $scope.clength = $scope.clength * 2.52;
            } else if ($scope.metric === false) {
                $scope.clength = $scope.clength / 2.52;
            }
            len = $scope.clength.toFixed(0);
            $scope.clength = parseInt(len, 10);

            localStorage.setItem('clength', $scope.clength);
        }
    });

    $scope.calcLoss = function (k1, k2, len, freq) {
        var loss = 0;

        loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);

        return loss.toFixed(2);
    };
}]);
