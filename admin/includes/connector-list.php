<?php
// @author calum o'donnell

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$sql = "SELECT * FROM cw_connector_list ORDER BY con_series ASC";

$connector_list = $wpdb->get_results($sql);

$output = "";

$output = json_encode($connector_list);

$output ='{"connectors": '.$output.'}';

echo($output);
?>
