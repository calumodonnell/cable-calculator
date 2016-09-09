<?php
// @author calum o'donnell

include_once($_SERVER['DOCUMENT_ROOT'] . "/micro/wp-load.php");

global $wpdb;

$sql = "SELECT * FROM cw_connector_list ORDER BY con_series ASC";

$connector_list = $wpdb->get_results($sql);

$output = "";

$output = json_encode($connector_list);

$output ='{"connectors": '.$output.'}';

echo($output);
?>
