<?php
// @author calum o'donnell

include_once($_SERVER['DOCUMENT_ROOT'] . "/micro/wp-load.php");

global $wpdb;

$sql = "SELECT material_yield  FROM cw_default_settings";

$connector_list = $wpdb->get_results($sql);

$cable_list = $wpdb->get_results($sql);

$output = json_encode($cable_list);

$output ='{ "default" : ' . $output . ' } ';

echo($output);
?>
