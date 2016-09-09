<?php
// @author calum o'donnell

include_once($_SERVER['DOCUMENT_ROOT'] . "/micro/wp-load.php");

global $wpdb;

$sql = "SELECT DISTINCT c1.con_series, c2.cable_id FROM cw_connector_list c1, cw_cable_connector_pricing c2 WHERE c1.id = c2.connector_id";

$cable_list = $wpdb->get_results($sql);

$output = json_encode($cable_list);

$output ='{ "series" : ' . $output . ' } ';

echo($output);
?>
