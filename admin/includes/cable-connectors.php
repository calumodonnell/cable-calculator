<?php
// @author calum o'donnell

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$sql = "SELECT DISTINCT co.con_series, cp.cable_id, cp.connector_id, cp.price, co.con_max_freq FROM cw_connector_list co, cw_cable_connector_pricing cp WHERE co.id = cp.connector_id ORDER BY co.con_series ASC";

$con_series_list = $wpdb->get_results($sql);

$output = "";

foreach($con_series_list as $series) :
  if ($output != "") { $output .= ","; }
  $output .= ' { "con_series" : "' . $series->con_series . '", ';
  $output .= '"connector_id" : "' . $series->connector_id . '", ';
  $output .= '"price" : "' . $series->price . '", ';
  $output .= '"cable_id" : "' . $series->cable_id . '", ';
  $output .= '"con_max_freq" : "' . $series->con_max_freq . '" } ';
endforeach;

$output ='{"series":[ '.$output.']}';

echo($output);
?>
