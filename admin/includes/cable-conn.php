<?php
// @author calum o'donnell

if (isset($_GET['part_id'])) {
    $part_id = $_GET['part_id'];
}

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$sql = "SELECT co.id, co.con_part_no, co.con_series, co.con_description, co.con_img FROM cw_connector_list co, cw_cable_connector_pricing cp WHERE cp.cable_id = " . $part_id . " AND cp.connector_id = co.id ORDER BY co.con_part_no ASC";

$cable_conn_list = $wpdb->get_results($sql);

$output = "";

foreach($cable_conn_list as $conn) :
  if ($output != "") { $output .= ","; }
  $output .= ' { "connector_id" : "' . $conn->id . '", ';
  $output .= '"con_part_no" : "' . $conn->con_part_no . '", ';
  $output .= '"con_series" : "' . $conn->con_series . '", ';
  $output .= '"con_description" : "' . $conn->con_description . '", ';
  $output .= '"con_img" : "' . $conn->con_img . '" } ';
endforeach;

$output ='{"cable_conn":[ '.$output.']}';

echo($output);
?>
