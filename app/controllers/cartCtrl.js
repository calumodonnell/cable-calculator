/*jslint browser:true*/
/*global $, jfalert, angular, console, app*/

// cartCtrl controller
app.controller('cartCtrl', ['$scope', '$filter', '$window', '$http', 'cables', function ($scope, $filter, $window, $http, cables) {
    "use strict";

    var initializing = true;

    if (!localStorage.getItem('cart', '')) {
        $window.location.href = './#/';
    }

    $scope.cart = JSON.parse(localStorage.getItem('cart'));

    cables.then(function (data) {
        $scope.cables = data;
    });

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

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

    $scope.cableP = function (id, len, covering, conn_1, conn_2, quantity, index) {
        $http.get("../wp-content/plugins/cable-wizard/app/data/unit-price.php", {params: {'part_id': id, 'length': len, 'covering': covering, 'conn_1': conn_1, 'conn_2': conn_2, 'quantity': quantity}}).then(function (response) {
            var cart,
                unitPrice;

            localStorage.cart = localStorage.getItem('cart');
            cart = JSON.parse(localStorage.cart);

            unitPrice = response.data;

            cart[index].price = unitPrice;
            localStorage.cart = JSON.stringify(cart);
        });
    };

    $scope.cableCost = function () {
        var cart,
            i;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        for (i = 0; i < cart.length; i += 1) {
            $scope.cableP(cart[i].id, cart[i].length, cart[i].covering, cart[i].conn_1_part_no, cart[i].conn_2_part_no, cart[i].quantity, i);
        }
    };

    $scope.cablePrice = function (index) {
        var cart,
            unitPrice;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        unitPrice = cart[index].price;

        return unitPrice;
    };

    $scope.cableCost();

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
        var cart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        if (quantity > 249) {
            $scope.notification = true;
            $scope.notification_title = "Error";
            $scope.notification_message = "Please contact a sales representative for additional pricing information on orders exceeding 249 units. Quantity will now be set to 249.";
            $scope.notification_button = "Close";
            quantity = 249;
        }

        cart[index].quantity = quantity;

        localStorage.cart = JSON.stringify(cart);

        $scope.cableCost();
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
    };

    $scope.lengthStore = function (len, index) {
        localStorage.cart = localStorage.getItem('cart');
        var cart = JSON.parse(localStorage.cart);

        cart[index].length = len;

        localStorage.cart = JSON.stringify(cart);

        $scope.cableCost();
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
        }
    });

    $scope.calcLoss = function (k1, k2, len, freq) {
        var loss = 0;

        loss = ((Math.sqrt((freq * 1000)) * k1) + (k2 * (freq * 1000))) / 100 * (len / 12);

        return loss.toFixed(2);
    };
}]);
