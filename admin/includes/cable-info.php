<?php
// @author calum o'donnell

if (isset($_GET['cable_id'])) {
    $cable_id = $_GET['cable_id'];
}

$output = "";

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$cable_list = $wpdb->get_results("SELECT * FROM cw_cable_list WHERE id = '$cable_id' && available = 'on' ORDER BY name ASC LIMIT 1");

$i = 0;
$len = count($cable_list);

foreach( $cable_list as $key => $cable ) {
    $output .= ' { "name" : "' . $cable->name . '", ';
    $output .= '"part_no" : "' . $cable->part_no . '", ';
    $output .= '"max_freq" : "' . $cable->max_freq . '", ';
    $output .= '"diameter" : "' . $cable->diameter . '", ';
    $output .= '"min_bend" : "' . $cable->min_bend . '", ';
    $output .= '"typ_atten_k1" : "' . $cable->typ_atten_k1 . '", ';
    $output .= '"typ_atten_k2" : "' . $cable->typ_atten_k2 . '", ';
    $output .= '"outdoor" : "' . $cable->outdoor . '", ';
    $output .= '"indoor" : "' . $cable->indoor . '", ';
    $output .= '"test" : "' . $cable->test . '", ';
    $output .= '"price" : "' . $cable->price . '", ';
    $output .= '"flex" : "' . $cable->flex . '", ';
    $output .= '"cable_img" : "' . $cable->cable_img . '", ';
    $output .= '"margin_rate" : "' . $cable->margin_rate . '", ';
    $output .= '"hour_lab_rate" : "' . $cable->hour_lab_rate . '", ';
    $output .= '"overhead_rate" : "' . $cable->overhead_rate . '", ';
    $output .= '"ship_handling" : "' . $cable->ship_handling . '", ';
    $output .= '"material_yield" : "' . $cable->material_yield . '", ';
    $output .= '"qm1" : "' . $cable->qm1 . '", ';
    $output .= '"qm2" : "' . $cable->qm2 . '", ';
    $output .= '"qm3" : "' . $cable->qm3 . '", ';
    $output .= '"qm4" : "' . $cable->qm4 . '", ';
    $output .= '"qm5" : "' . $cable->qm5 . '", ';
    $output .= '"qm6" : "' . $cable->qm6 . '", ';
    $output .= '"qm7" : "' . $cable->qm7 . '", ';
    $output .= '"qm8" : "' . $cable->qm8 . '", ';
    $output .= '"available" : "' . $cable->name . '", ';
    $output .= '"coat_n_cable_base" : "' . $cable->coat_n_cable_base . '", ';
    $output .= '"coat_n_adder_back" : "' . $cable->coat_n_adder_back . '", ';
    $output .= '"coat_n_base" : "' . $cable->coat_n_base . '", ';
    $output .= '"coat_n_adder_base_time" : "' . $cable->coat_n_adder_base_time . '", ';
    $output .= '"coat_n_time_rp" : "' . $cable->coat_n_time_rp . '", ';
    $output .= '"coat_w_cable_base" : "' . $cable->coat_w_cable_base . '", ';
    $output .= '"coat_w_adder_back" : "' . $cable->coat_w_adder_back . '", ';
    $output .= '"coat_w_base" : "' . $cable->coat_w_base . '", ';
    $output .= '"coat_w_adder_base_time" : "' . $cable->coat_w_adder_base_time . '", ';
    $output .= '"coat_w_time_rp" : "' . $cable->coat_w_time_rp . '", ';
    $output .= '"coat_tv_cable_base" : "' . $cable->coat_tv_cable_base . '", ';
    $output .= '"coat_tv_adder_back" : "' . $cable->coat_tv_adder_back . '", ';
    $output .= '"coat_tv_base" : "' . $cable->coat_tv_base . '", ';
    $output .= '"coat_tv_adder_base_time" : "' . $cable->coat_tv_adder_base_time . '", ';
    $output .= '"coat_tv_time_rp" : "' . $cable->coat_tv_time_rp . '", ';
    $output .= '"coat_a_cable_base" : "' . $cable->coat_a_cable_base . '", ';
    $output .= '"coat_a_adder_back" : "' . $cable->coat_a_adder_back . '", ';
    $output .= '"coat_a_base" : "' . $cable->coat_a_base . '", ';
    $output .= '"coat_a_adder_base_time" : "' . $cable->coat_a_adder_base_time . '", ';
    $output .= '"coat_a_time_rp" : "' . $cable->coat_a_time_rp . '", ';
    $output .= '"coat_aw_cable_base" : "' . $cable->coat_aw_cable_base . '", ';
    $output .= '"coat_aw_adder_back" : "' . $cable->coat_aw_adder_back . '", ';
    $output .= '"coat_aw_base" : "' . $cable->coat_aw_base . '", ';
    $output .= '"coat_aw_adder_base_time" : "' . $cable->coat_aw_adder_base_time . '", ';
    $output .= '"coat_aw_time_rp" : "' . $cable->coat_aw_time_rp . '", ';
    $output .= '"coat_an_cable_base" : "' . $cable->coat_an_cable_base . '", ';
    $output .= '"coat_an_adder_back" : "' . $cable->coat_an_adder_back . '", ';
    $output .= '"coat_an_base" : "' . $cable->coat_an_base . '", ';
    $output .= '"coat_an_adder_base_time" : "' . $cable->coat_an_adder_base_time . '", ';
    $output .= '"coat_an_time_rp" : "' . $cable->coat_an_time_rp . '", ';
    $output .= '"coat_ej_cable_base" : "' . $cable->coat_ej_cable_base . '", ';
    $output .= '"coat_ej_adder_back" : "' . $cable->coat_ej_adder_back . '", ';
    $output .= '"coat_ej_base" : "' . $cable->coat_ej_base . '", ';
    $output .= '"coat_ej_adder_base_time" : "' . $cable->coat_ej_adder_base_time . '", ';
    $output .= '"coat_ej_time_rp" : "' . $cable->coat_ej_time_rp . '", ';
    $output .= '"coat_ew_cable_base" : "' . $cable->coat_ew_cable_base . '", ';
    $output .= '"coat_ew_adder_back" : "' . $cable->coat_ew_adder_back . '", ';
    $output .= '"coat_ew_base" : "' . $cable->coat_ew_base . '", ';
    $output .= '"coat_ew_adder_base_time" : "' . $cable->coat_ew_adder_base_time . '", ';
    $output .= '"coat_ew_time_rp" : "' . $cable->coat_ew_time_rp . '", ';
    $output .= '"coat_mc_cable_base" : "' . $cable->coat_mc_cable_base . '", ';
    $output .= '"coat_mc_adder_back" : "' . $cable->coat_mc_adder_back . '", ';
    $output .= '"coat_mc_base" : "' . $cable->coat_mc_base . '", ';
    $output .= '"coat_mc_adder_base_time" : "' . $cable->coat_mc_adder_base_time . '", ';
    $output .= '"coat_mc_time_rp" : "' . $cable->coat_mc_time_rp . '", ';

    $output .= '"connectors" : ' ;

    $price_list = $wpdb->get_results("SELECT cw_cable_connector_pricing.id, cable_id, connector_id, cw_cable_connector_pricing.con_part_no, cw_cable_connector_pricing.con_series, price, cw_cable_connector_pricing.con_max_freq, con_rank FROM cw_cable_connector_pricing INNER JOIN cw_connector_list ON cw_cable_connector_pricing.connector_id = cw_connector_list.id WHERE cable_id = " . $cable_id);

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
