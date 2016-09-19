/*jslint browser:true*/
/*global $, jQuery, alert, angular, console, app*/

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
