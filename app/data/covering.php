<?php
// @author calum o'donnell

if (isset($_GET['part_id'])) {
    $part_id = $_GET['part_id'];
}

$output = Array();

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$cover_list = $wpdb->get_results("SELECT * FROM cw_cable_list WHERE id = '$part_id' && available = 'on' ORDER BY name ASC LIMIT 1");

foreach( $cover_list as $key => $cover ) {
    if ($cover->coat_w_cable_base !== '0.00') { $output[] = '{"cover": "Weatherized", "letter": "W"}'; }
    if ($cover->coat_tv_cable_base !== '0.00') { $output[] = '{"cover": "Thermal Vacuum", "letter": "TV"}'; }
    if ($cover->coat_a_cable_base !== '0.00') { $output[] = '{"cover": "Armor", "letter": "A"}'; }
    if ($cover->coat_aw_cable_base !== '0.00') { $output[] = '{"cover": "Armor/Weatherized", "letter": "AW"}'; }
    if ($cover->coat_an_cable_base !== '0.00') { $output[] = '{"cover": "Armor/Neoprene", "letter": "AN"}'; }
    if ($cover->coat_mc_cable_base !== '0.00') { $output[] = '{"cover": "Monocoil", "letter": "MC"}'; }
}

echo '{"covering":[' . implode(',', $output) . ']}';
?>
