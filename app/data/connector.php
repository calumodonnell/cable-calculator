<?php
// @author calum o'donnell

if (isset($_GET['conn'])) {
    $conn = $_GET['conn'];
}

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$sql = "SELECT * FROM cw_connector_list WHERE con_part_no = '$conn' LIMIT 1";

$connector_list = $wpdb->get_results($sql);

echo str_replace(array('[', ']'), '', htmlspecialchars(json_encode($connector_list), ENT_NOQUOTES));
?>
