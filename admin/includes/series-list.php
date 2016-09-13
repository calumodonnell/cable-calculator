<?php
// @author calum o'donnell

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$sql = "SELECT DISTINCT con_series, con_max_freq  FROM cw_connector_list ORDER BY con_series ASC";

$connector_list = $wpdb->get_results($sql);

$output = "";

foreach($connector_list as $connector) :
  if ($output != "") {$output .= ",";}
  $output .= ' { "series" : "' . $connector->con_series . '", ';
  $output .= '"con_max_freq" : "' . $connector->con_max_freq . '" } ';
endforeach;

$output ='{"connectors":[ '.$output.']}';

echo($output);
?>
