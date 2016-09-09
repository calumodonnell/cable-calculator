/*jslint browser:true*/
/*global $, jQuery, alert,*/

jQuery(document).ready(function () {
    "use strict";

    jQuery("#delete-cable").click(function () {
        if (confirm("Are you sure you want to delete this cable?")) {
            return true;
        } else {
            return false;
        }
    });

    jQuery("#delete-connector").click(function () {
        if (confirm("Are you sure you want to delete this connector?")) {
            return true;
        } else {
            return false;
        }
    });
});
