/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/


//[{"id":"72","rf_part":"BMS-085-12.0-BMR","name":"085 Semi-Rigid","conn_1":"BMS - BNC Male Straight","conn_2":"BMR - BNC Male Right Angle","macola":"085B1B2#00012","quantity":3,"length":6,"covering":"MC","price":496,"max_freq":1}, {"id":"72","rf_part":"BMS-085-12.0-BMR","name":"085 Semi-Rigid","conn_1":"BMS - BNC Male Straight","conn_2":"BMR - BNC Male Right Angle","macola":"085B1B2#00012","quantity":3,"length":6,"covering":"MC","price":496,"max_freq":1}]


// cartCtrl controller
app.controller('cartCtrl', function ($scope) {
    "use strict";

    $scope.cart = JSON.parse(localStorage.getItem('cart'));

    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
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

    $scope.totalQuantity = function () {
        var total = 0,
            i,
            cart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        for (i = 0; i < cart.length; i += 1) {
            total = total + cart[i].quantity;
        }

        return total;
    };

    $scope.cablePrice = function (len, quantity, index) {
        var addHard = 1,
            laborTime = 1,
            laborAdd = 1,
            laborCalc = 1,
            matYield = 0.95,
            shipHand = 0.03,
            hourlyRate = 10.75,
            overHeadRate = 2.85,
            marginRate = 0.57,
            coveringPrice = 1,
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

        return total.toFixed(2);
    };

    $scope.totalPrice = function () {
        var total = 0,
            i,
            cart;

        localStorage.cart = localStorage.getItem('cart');
        cart = JSON.parse(localStorage.cart);

        for (i = 0; i < cart.length; i += 1) {
            total = total + cart[i].price;
        }

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

        cart.push(assembly);

        localStorage.cart = JSON.stringify(cart);

        $scope.cart = JSON.parse(localStorage.getItem('cart'));
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


    if (localStorage.getItem('measure') === 'true') {
        $scope.metric = true;
    } else {
        $scope.metric = false;
    }

    $scope.printDiv = function () {
        var pdf = new jsPDF('p', 'pt', 'a4'),
            source = "<html> <head> <title>Cable Assembly Cart Summary</title> <style type='text/css'> html{font-family: sans-serif; line-height: 1.15; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;}body{margin: 0;}article, aside, footer, header, nav, section{display: block;}h1{font-size: 2em; margin: 0.67em 0;}figcaption, figure, main{display: block;}figure{margin: 1em 40px;}hr{box-sizing: content-box; height: 0; overflow: visible;}pre{font-family: monospace, monospace; font-size: 1em;}a{background-color: transparent; -webkit-text-decoration-skip: objects;}a:active, a:hover{outline-width: 0;}abbr[title]{border-bottom: none; text-decoration: underline; text-decoration: underline dotted;}b, strong{font-weight: inherit;}b, strong{font-weight: bolder;}code, kbd, samp{font-family: monospace, monospace; font-size: 1em;}dfn{font-style: italic;}mark{background-color: #ff0; color: #000;}small{font-size: 80%;}sub, sup{font-size: 75%; line-height: 0; position: relative; vertical-align: baseline;}sub{bottom: -0.25em;}sup{top: -0.5em;}audio, video{display: inline-block;}audio:not([controls]){display: none; height: 0;}img{border-style: none;}svg:not(:root){overflow: hidden;}button, input, optgroup, select, textarea{font-family: sans-serif; font-size: 100%;/ line-height: 1.15; margin: 0;}button, input{overflow: visible;}button, select{text-transform: none;}button, html [type='button'], [type='reset'], [type='submit']{-webkit-appearance: button;}button::-moz-focus-inner, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner{border-style: none; padding: 0;}button:-moz-focusring, [type='button']:-moz-focusring, [type='reset']:-moz-focusring, [type='submit']:-moz-focusring{outline: 1px dotted ButtonText;}fieldset{border: 1px solid #c0c0c0; margin: 0 2px; padding: 0.35em 0.625em 0.75em;}legend{box-sizing: border-box; color: inherit; display: table; max-width: 100%; padding: 0; white-space: normal;}progress{display: inline-block; vertical-align: baseline;}textarea{overflow: auto;}[type='checkbox'], [type='radio']{box-sizing: border-box; padding: 0;}[type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button{height: auto;}[type='search']{-webkit-appearance: textfield; outline-offset: -2px;}[type='search']::-webkit-search-cancel-button, [type='search']::-webkit-search-decoration{-webkit-appearance: none;}::-webkit-file-upload-button{-webkit-appearance: button; font: inherit;}details, menu{display: block;}summary{display: list-item;}canvas{display: inline-block;}template{display: none;}[hidden]{display: none;}/***********/ body{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color: #58595B; font-weight: 300;}body, table{font-size: 10px;}.pdf-header{margin-bottom: 20px;}p{margin: 0; margin-bottom: 5px;}b{font-weight: 600}.logo-header{vertical-align: top; text-align: right;}.logo-header img{width: 80px; height: auto;}.pdf-content{margin-bottom: 20px;}table{width: 100%;}td, th{padding: 4px 8px}tbody tr:nth-child(even){background-color: #F2F2F2;}.pdf-header:nth-child(even){}.pdf-footer{clear: both;}.pdf-footer .sales-disclaimer{display: inline-block;}.pdf-footer .printed-date{display: inline-block;}</style> </head> <body> <div class='pdf-container'> <header class='pdf-header'> <table> <tr> <td class='address-header'> <p><b>Florida RF Labs, Inc.</b></p><p>8851 SW Old Kansas Ave.</p><p>Stuart, FL 34997</p><p>Tel: (772) 286-9300</p><p>Fax: (772) 283-5286</p><p><a href='http://www.emc-rflabs.com'>www.emc-rflabs.com</a></p></td><td class='logo-header'> <img src='../img/rflabs.jpg'> </td></tr></table> </header> <div class='pdf-content'> <h1>Cable Assembly Cart Summary</h1> <table> <thead> <tr> <th>Order Number</th> <th>Part Number</th> <th>Quantity</th> <th>Unit Price</th> <th>Ext. Amount</th> </tr></thead> <tbody> <tr> <td>AL141LLSPS1S1#00060</td><td>SMS-AL141LLSP-6.0-SMS</td><td>1</td><td>$124.49</td><td>$124.49</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$124.49</td><td>4 - 9 <br>$100.58</td><td>10 - 24 <br>$78.68</td><td>25 - 49 <br>$68.55</td><td>50 - 99 <br>$60.67</td><td>100+ <br>$52.78</td></tr></table> </td></tr><tr> <td>085S1S2#00060</td><td>SMS-085-6.0-SMR</td><td>1</td><td>$85.33</td><td>$85.33</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$85.33</td><td>4 - 9 <br>$68.49</td><td>10 - 24 <br>$51.65</td><td>25 - 49 <br>$45.92</td><td>50 - 99 <br>$40.37</td><td>100+ <br>$34.81</td></tr></table> </td></tr></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td>Total: $209.82</td></tr></tfoot> </table> </div><footer class='pdf-footer'> <div class='sales-disclaimer'> <p>THIS QUOTE IS SUBJECT TO ALL EXPORT CONTROL REGULATIONS OF THE UNITED STATES.</p><p>Cable Assemblies have a $250.00 line item minimum requirement.</p><p>Component Product line has a $1000.00 line item minimum requirement.</p><p>Lead times quoted are ARO (after receipt of order) and does not include transit time.</p><p>Prices are based on the information available at the time of quotation. Quality Assurance provisions, First Article Verification, Source Inspection and Special Packaging requirements not quoted and appear on the purchase order may affect prices quoted herein. Florida RF Labs reserves the right to amend this quotation if these requirements are not quoted and appear on the purchase order.</p><p>Click <a href='http://www.emc-rflabs.com/Rflabs/media/Generic-Library/General%20Information/432F024-EMC-RF-LABS-SALES-TERMS-AND-CONDITIONS.pdf' target='_blank'>here</a> for T&Cs</p></div><div class='printed-date'> <p>PRINTED: <span id='currentdate'>09/14/2016</span></p></div></footer> </div></body></html>",
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
                //pdf.save('cable-wizard-quotation.pdf');
                pdf.output('dataurlnewwindow');
            },
            margins
        );
    };

    $scope.printDrawing = function () {
        var pdf = new jsPDF('p', 'pt', 'a4'),
            source = "<html> <head> <title>Cable Assembly Cart Summary</title> <style type='text/css'> .pdf-container{font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif; color: #58595B; font-weight: 300; font-size: 12px;}.pdf-header{margin-bottom: 20px;}.address-header{display: inline-block;}p{margin: 0; margin-bottom: 5px;}b{font-weight: 600}.logo-header{display: inline-block; vertical-align: top; float: right;}.logo-header img{width: 80px; height: auto;}.pdf-content{margin-bottom: 20px;}table{width: 100%;}td, th{padding: 4px 8px}tbody tr:nth-child(even){background-color: #F2F2F2;}.pdf-footer{clear: both;}.pdf-footer .sales-disclaimer{display: inline-block;}.pdf-footer .printed-date{display: inline-block;}</style> </head> <body> <div class='pdf-container'> <header class='pdf-header'> <div class='address-header'> <p><b>Florida RF Labs, Inc.</b></p><p>8851 SW Old Kansas Ave.</p><p>Stuart, FL 34997</p><p>Tel: (772) 286-9300</p><p>Fax: (772) 283-5286</p><p><a href='http://www.emc-rflabs.com'>www.emc-rflabs.com</a></p></div><div class='logo-header'> <img src='../wp-content/plugins/cable-wizard/img/rflabs.jpg'> </div></header> <div class='pdf-content'> <h1>Cable Assembly Cart Summary</h1> <table> <thead> <tr> <th>Order Number</th> <th>Part Number</th> <th>Quantity</th> <th>Unit Price</th> <th>Ext. Amount</th> </tr></thead> <tbody> <tr> <td>AL141LLSPS1S1#00060</td><td>SMS-AL141LLSP-6.0-SMS</td><td>1</td><td>$124.49</td><td>$124.49</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$124.49</td><td>4 - 9 <br>$100.58</td><td>10 - 24 <br>$78.68</td><td>25 - 49 <br>$68.55</td><td>50 - 99 <br>$60.67</td><td>100+ <br>$52.78</td></tr></table> </td></tr><tr> <td>085S1S2#00060</td><td>SMS-085-6.0-SMR</td><td>1</td><td>$85.33</td><td>$85.33</td></tr><tr> <td>Price Breaks</td><td colspan='4'> <table> <tr> <td>1 - 3 <br>$85.33</td><td>4 - 9 <br>$68.49</td><td>10 - 24 <br>$51.65</td><td>25 - 49 <br>$45.92</td><td>50 - 99 <br>$40.37</td><td>100+ <br>$34.81</td></tr></table> </td></tr></tbody> <tfoot> <tr> <td></td><td></td><td></td><td></td><td>Total: $209.82</td></tr></tfoot> </table> </div><footer class='pdf-footer'> <div class='sales-disclaimer'> <p>THIS QUOTE IS SUBJECT TO ALL EXPORT CONTROL REGULATIONS OF THE UNITED STATES.</p><p>Cable Assemblies have a $250.00 line item minimum requirement.</p><p>Component Product line has a $1000.00 line item minimum requirement.</p><p>Lead times quoted are ARO (after receipt of order) and does not include transit time.</p><p>Prices are based on the information available at the time of quotation. Quality Assurance provisions, First Article Verification, Source Inspection and Special Packaging requirements not quoted and appear on the purchase order may affect prices quoted herein. Florida RF Labs reserves the right to amend this quotation if these requirements are not quoted and appear on the purchase order.</p><p>Click <a href='http://www.emc-rflabs.com/Rflabs/media/Generic-Library/General%20Information/432F024-EMC-RF-LABS-SALES-TERMS-AND-CONDITIONS.pdf' target='_blank'>here</a> for T&Cs</p></div><div class='printed-date'> <p>PRINTED: <span id='currentdate'>09/14/2016</span></p></div></footer> </div></body></html>",
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
});
