<?php
// @author calum o'donnell

if (isset($_GET['part_id'])) {
    $part_id = $_GET['part_id'];
}

$output = "";

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$cable_list = $wpdb->get_results("SELECT * FROM cw_cable_list WHERE id = '$part_id' && available = 'on' ORDER BY name ASC LIMIT 1");

foreach( $cable_list as $key => $cable ) {
    $output .= ' { "name" : "' . $cable->name . '", ';
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
    $output .= '"extended_boots" : "' . $cable->extended_boots . '", ';
    $output .= '"extended_boots_price" : "' . $cable->extended_boots_price . '", ';

    $output .= '"connectors" : [' ;

    $price_list = $wpdb->get_results("SELECT cw_cable_connector_pricing.con_part_no, cw_cable_connector_pricing.con_series, price, cw_cable_connector_pricing.con_max_freq, con_rank FROM cw_cable_connector_pricing INNER JOIN cw_connector_list ON cw_cable_connector_pricing.connector_id = cw_connector_list.id WHERE cable_id = " . $part_id);

    $i = 0;
    $len = count($price_list);

    foreach ($price_list as $key => $connector) {
        if ( $i == $len - 1 ) {
            $output .= '{ "con_part_no" : "' . $connector->con_part_no . '", ';
            $output .= '"con_series" : "' . $connector->con_series . '", ';
            $output .= '"con_max_freq" : "' . $connector->con_max_freq . '", ';
            $output .= '"con_rank" : "' . $connector->con_rank . '" }]}';
        } else {
            $output .= '{ "con_part_no" : "' . $connector->con_part_no . '", ';
            $output .= '"con_series" : "' . $connector->con_series . '", ';
            $output .= '"con_max_freq" : "' . $connector->con_max_freq . '", ';
            $output .= '"con_rank" : "' . $connector->con_rank . '" },';
        }

        $i++;
    }
}

$output ='{"cables":[ '.$output.']}';

echo($output);
?>
