<?php
// @author calum o'donnell

if (isset($_GET['part_id'])) {
    $part_id = $_GET['part_id'];
}

$output = "";

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$standard_list = $wpdb->get_results("SELECT * FROM cw_standard_cable_list WHERE part_id = '$part_id'");

$i = 0;
$len = count($standard_list);

foreach( $standard_list as $key => $standard ) {
    $output .= '{"part_no" : "' . $standard->part_no . '", ';
    $output .= '"length" : "' . $standard->length . '", ';
    $output .= '"conn_1" : "' . $standard->conn_1 . '", ';
    $output .= '"conn_2" : "' . $standard->conn_2 . '"';

    if ( $i == $len - 1 ) {
        $output .= '}';
    } else {
        $output .= '},';
    }

    $i++;
}

$output ='{"standard":[ '.$output.']}';

echo($output);
?>
