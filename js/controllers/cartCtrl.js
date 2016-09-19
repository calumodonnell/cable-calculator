app.controller('cartCtrl', function ($scope, $log) {
    "use strict";

    $scope.cart = JSON.parse(localStorage.getItem('cart'));
    $scope.quantity = parseInt(localStorage.getItem('cart', 'quantity'), 10);
    $scope.clength = parseInt(localStorage.getItem('cart', 'length'), 10);

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


    $scope.totalPrice = function () {
        var total = 0,
            i,
            product,
            cart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        for (i = 0; i < cart.length; i += 1) {
            total = total + cart[i].price;
        }

        return total;
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

    $scope.errorHide = function () {
        $scope.err = false;
    };

    var initializing = true;

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

    $scope.storeQuantity = function (quantity, index) {
        localStorage.cart = localStorage.getItem('cart');

        var cart = JSON.parse(localStorage.cart);

        cart[index].quantity = quantity;

        localStorage.cart = JSON.stringify(cart);
    };

    $scope.storeLength = function (val, index) {
        localStorage.cart = localStorage.getItem('cart');
        var cart = JSON.parse(localStorage.cart);

        if (val === null) {
            val = 6;
            cart[index].length = val;
        } else {
            cart[index].length = val;
        }

        localStorage.cart = JSON.stringify(cart);
    };


    $scope.lengthCheck = function (len, index) {
        if (len < 15 && $scope.metric === true) {
            $scope.err = true;
            $scope.error_message = "This program has a minimum length of 15 cm. Please contact the factory for custom lengths.";
        } else if (len < 6 && $scope.metric === false) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 6 in. Please contact the factory for custom lengths.";
        } else if (len > 3024 && $scope.metric === true) {
            $scope.err = true;
            $scope.error_message = "This program has a minimum length of 15 cm. Please contact the factory for custom lengths.";
        } else if (len > 1200 && $scope.metric === false) {
            $scope.err = true;
            $scope.error_message = "This program has a maxiumum length of 6 in. Please contact the factory for custom lengths.";
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


    $scope.printDiv = function () {
        var pdf = new jsPDF('p', 'pt', 'a4'),
            source = "<html> <head> <title>Cable Assembly Cart Summary</title> <style type='text/css'> .pdf-container{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color: #58595B; font-weight: 300; font-size: 12px;}.pdf-header{margin-bottom: 20px;}.address-header{display: inline-block;}p{margin: 0; margin-bottom: 5px;}b{font-weight: 600}.logo-header{display: inline-block; vertical-align: top; float: right;}.logo-header img{width: 80px; height: auto;}.pdf-content{margin-bottom: 20px;}table{width: 100%;}td, th{padding: 4px 8px}tbody tr:nth-child(even){background-color: #F2F2F2;}.pdf-footer{clear: both;}.pdf-footer .sales-disclaimer{display: inline-block;}.pdf-footer .printed-date{display: inline-block;}</style> </head> <body> <div class='pdf-container'> <header class='pdf-header'> <div class='address-header'> <p><b>Florida RF Labs, Inc.</b></p><p>8851 SW Old Kansas Ave.</p><p>Stuart, FL 34997</p><p>Tel: (772) 286-9300</p><p>Fax: (772) 283-5286</p><p><a href='http://www.emc-rflabs.com'>www.emc-rflabs.com</a></p></div><div class='logo-header'> <img src='./wp-content/plugins/cable-wizard/img/rflabs.png'> </div></header> <div class='pdf-content'> <h1>Cable Assembly Cart Summary</h1> <table> <thead> <tr> <th>Order Number</th> <th>Part Number</th> <th>Quantity</th> <th>Unit Price</th> <th>Ext. Amount</th> </tr></thead> <tbody> <tr> <td>AL141LLSPS1S1#00060</td><td>SMS-AL141LLSP-6.0-SMS</td><td>1</td><td>$124.49</td><td>$124.49</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$124.49</td><td>4 - 9 <br>$100.58</td><td>10 - 24 <br>$78.68</td><td>25 - 49 <br>$68.55</td><td>50 - 99 <br>$60.67</td><td>100+ <br>$52.78</td></tr></table> </td></tr><tr> <td>085S1S2#00060</td><td>SMS-085-6.0-SMR</td><td>1</td><td>$85.33</td><td>$85.33</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$85.33</td><td>4 - 9 <br>$68.49</td><td>10 - 24 <br>$51.65</td><td>25 - 49 <br>$45.92</td><td>50 - 99 <br>$40.37</td><td>100+ <br>$34.81</td></tr></table> </td></tr></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td>Total: $209.82</td></tr></tfoot> </table> </div><footer class='pdf-footer'> <div class='sales-disclaimer'> <p>THIS QUOTE IS SUBJECT TO ALL EXPORT CONTROL REGULATIONS OF THE UNITED STATES.</p><p>Cable Assemblies have a $250.00 line item minimum requirement.</p><p>Component Product line has a $1000.00 line item minimum requirement.</p><p>Lead times quoted are ARO (after receipt of order) and does not include transit time.</p><p>Prices are based on the information available at the time of quotation. Quality Assurance provisions, First Article Verification, Source Inspection and Special Packaging requirements not quoted and appear on the purchase order may affect prices quoted herein. Florida RF Labs reserves the right to amend this quotation if these requirements are not quoted and appear on the purchase order.</p><p>Click <a href='http://www.emc-rflabs.com/Rflabs/media/Generic-Library/General%20Information/432F024-EMC-RF-LABS-SALES-TERMS-AND-CONDITIONS.pdf' target='_blank'>here</a> for T&Cs</p></div><div class='printed-date'> <p>PRINTED: <span id='currentdate'>09/14/2016</span></p></div></footer> </div></body></html>",
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
                pdf.save('cable-wizard-quotation.pdf');
            },
            margins
        );
    };

    $scope.printDrawing = function () {
        var pdf = new jsPDF('p', 'pt', 'a4'),
            source = "<html> <head> <title>Cable Assembly Cart Summary</title> <style type='text/css'> .pdf-container{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color: #58595B; font-weight: 300; font-size: 12px;}.pdf-header{margin-bottom: 20px;}.address-header{display: inline-block;}p{margin: 0; margin-bottom: 5px;}b{font-weight: 600}.logo-header{display: inline-block; vertical-align: top; float: right;}.logo-header img{width: 80px; height: auto;}.pdf-content{margin-bottom: 20px;}table{width: 100%;}td, th{padding: 4px 8px}tbody tr:nth-child(even){background-color: #F2F2F2;}.pdf-footer{clear: both;}.pdf-footer .sales-disclaimer{display: inline-block;}.pdf-footer .printed-date{display: inline-block;}</style> </head> <body> <div class='pdf-container'> <header class='pdf-header'> <div class='address-header'> <p><b>Florida RF Labs, Inc.</b></p><p>8851 SW Old Kansas Ave.</p><p>Stuart, FL 34997</p><p>Tel: (772) 286-9300</p><p>Fax: (772) 283-5286</p><p><a href='http://www.emc-rflabs.com'>www.emc-rflabs.com</a></p></div><div class='logo-header'> <img src='./wp-content/plugins/cable-wizard/img/rflabs.png'> </div></header> <div class='pdf-content'> <h1>Cable Assembly Cart Summary</h1> <table> <thead> <tr> <th>Order Number</th> <th>Part Number</th> <th>Quantity</th> <th>Unit Price</th> <th>Ext. Amount</th> </tr></thead> <tbody> <tr> <td>AL141LLSPS1S1#00060</td><td>SMS-AL141LLSP-6.0-SMS</td><td>1</td><td>$124.49</td><td>$124.49</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$124.49</td><td>4 - 9 <br>$100.58</td><td>10 - 24 <br>$78.68</td><td>25 - 49 <br>$68.55</td><td>50 - 99 <br>$60.67</td><td>100+ <br>$52.78</td></tr></table> </td></tr><tr> <td>085S1S2#00060</td><td>SMS-085-6.0-SMR</td><td>1</td><td>$85.33</td><td>$85.33</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$85.33</td><td>4 - 9 <br>$68.49</td><td>10 - 24 <br>$51.65</td><td>25 - 49 <br>$45.92</td><td>50 - 99 <br>$40.37</td><td>100+ <br>$34.81</td></tr></table> </td></tr></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td>Total: $209.82</td></tr></tfoot> </table> </div><footer class='pdf-footer'> <div class='sales-disclaimer'> <p>THIS QUOTE IS SUBJECT TO ALL EXPORT CONTROL REGULATIONS OF THE UNITED STATES.</p><p>Cable Assemblies have a $250.00 line item minimum requirement.</p><p>Component Product line has a $1000.00 line item minimum requirement.</p><p>Lead times quoted are ARO (after receipt of order) and does not include transit time.</p><p>Prices are based on the information available at the time of quotation. Quality Assurance provisions, First Article Verification, Source Inspection and Special Packaging requirements not quoted and appear on the purchase order may affect prices quoted herein. Florida RF Labs reserves the right to amend this quotation if these requirements are not quoted and appear on the purchase order.</p><p>Click <a href='http://www.emc-rflabs.com/Rflabs/media/Generic-Library/General%20Information/432F024-EMC-RF-LABS-SALES-TERMS-AND-CONDITIONS.pdf' target='_blank'>here</a> for T&Cs</p></div><div class='printed-date'> <p>PRINTED: <span id='currentdate'>09/14/2016</span></p></div></footer> </div></body></html>",
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
                pdf.save('cable-wizard-drawing.pdf');
            },
            margins
        );
    };
});
