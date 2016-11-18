<?php
// @author calum o'donnell

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$sql = "SELECT con_series, max(con_max_freq) as max_freq FROM cw_connector_list GROUP BY(con_series) ORDER BY con_series ASC";

$connector_list = $wpdb->get_results($sql);

$output = "";

foreach($connector_list as $connector) :
  if ($output != "") {$output .= ",";}
  $output .= ' { "con_series" : "' . $connector->con_series . '", ';
  $output .= '"con_max_freq" : "' . $connector->max_freq . '" } ';
endforeach;

$output ='{"series":[ '.$output.']}';

echo($output);
?>
