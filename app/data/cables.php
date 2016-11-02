<?php
// @author calum o'donnell

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$output = "";

$cable_list = $wpdb->get_results("SELECT * FROM cw_cable_list WHERE available = 'on' ORDER BY name ASC");

$i = 0;
$len = count($cable_list);

foreach( $cable_list as $key => $cable ) {
    $output .= ' { "id" : "' . $cable->id . '", ';
    $output .= '"name" : "' . $cable->name . '", ';
    $output .= '"part_no" : "' . $cable->part_no . '", ';
    $output .= '"max_freq" : "' . $cable->max_freq . '", ';
    $output .= '"diameter" : "' . $cable->diameter . '", ';
    $output .= '"typ_atten_k1" : "' . $cable->typ_atten_k1 . '", ';
    $output .= '"typ_atten_k2" : "' . $cable->typ_atten_k2 . '", ';
    $output .= '"outdoor" : "' . $cable->outdoor . '", ';
    $output .= '"indoor" : "' . $cable->indoor . '", ';
    $output .= '"test" : "' . $cable->test . '", ';
    $output .= '"price" : "' . $cable->price . '", ';
    $output .= '"flex" : "' . $cable->flex . '", ';
    $output .= '"cable_img" : "' . $cable->cable_img . '", ';

    $output .= '"connectors" : ' ;

    $price_list = $wpdb->get_results("SELECT cw_cable_connector_pricing.con_part_no, cw_cable_connector_pricing.con_series, cw_cable_connector_pricing.con_max_freq FROM cw_cable_connector_pricing INNER JOIN cw_connector_list ON cw_cable_connector_pricing.connector_id = cw_connector_list.id WHERE cable_id = " . $cable->id);

    if ( $i == $len - 1 ) {
        $output .= json_encode($price_list) . '}';
    } else {
        $output .= json_encode($price_list) . '},';
    }

    $i++;
}

$output ='{"cables":[ '.$output.']}';

echo($output);
?>
