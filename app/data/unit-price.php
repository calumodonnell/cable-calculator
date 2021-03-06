<?php
// @author calum o'donnell

if (isset($_GET['part_id'])) {
    $part_id = $_GET['part_id'];
}

if (isset($_GET['length'])) {
    $length = $_GET['length'];
} else {
    $length = 0;
}

if (isset($_GET['covering'])) {
    $covering = $_GET['covering'];
} else {
    $covering = '';
}

if (isset($_GET['conn_1'])) {
    $conn_1 = $_GET['conn_1'];
} else {
    $conn_1 = '';
}

if (isset($_GET['conn_2'])) {
    $conn_2 = $_GET['conn_2'];
} else {
    $conn_2 = '';
}

if (isset($_GET['quantity'])) {
    $quantity = $_GET['quantity'];
} else {
    $quantity = 1;
}

$output = "";

$parse_uri = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
require_once( $parse_uri[0] . 'wp-load.php' );

global $wpdb;

$cable_list = $wpdb->get_results("SELECT * FROM cw_cable_list WHERE id = '$part_id' && available = 'on' ORDER BY name ASC LIMIT 1");

$i = 0;
$len = count($cable_list);

foreach( $cable_list as $key => $cable ) {
    $output .= ' { "margin_rate" : "' . $cable->margin_rate . '", ';
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
    $output .= '"coat_mc_cable_base" : "' . $cable->coat_mc_cable_base . '", ';
    $output .= '"coat_mc_adder_back" : "' . $cable->coat_mc_adder_back . '", ';
    $output .= '"coat_mc_base" : "' . $cable->coat_mc_base . '", ';
    $output .= '"coat_mc_adder_base_time" : "' . $cable->coat_mc_adder_base_time . '", ';
    $output .= '"coat_mc_time_rp" : "' . $cable->coat_mc_time_rp . '"}';
}

if ($conn_1) {
    $conn_1_query = $wpdb->get_results("SELECT price FROM cw_cable_connector_pricing WHERE cable_id = '$part_id' && con_part_no = '$conn_1'");

    foreach( $conn_1_query as $key => $conn ) {
        $conn_1_price = $conn->price;
    }
} else {
    $conn_1_price = 0;
}

if ($conn_2) {
    $conn_2_query = $wpdb->get_results("SELECT price FROM cw_cable_connector_pricing WHERE cable_id = '$part_id' && con_part_no = '$conn_2'");

    foreach( $conn_2_query as $key => $conn ) {
        $conn_2_price = $conn->price;
    }
} else {
    $conn_2_price = 0;
}

switch ($covering) {
case 'W':
    $cableBase = $cable->coat_w_cable_base;
    $adderBack = $cable->coat_w_adder_back;
    $laborTime = $cable->coat_w_base;
    $laborAdd = $cable->coat_w_adder_base_time;
    $laborCalc = $cable->coat_w_time_rp;
    break;
case 'TV':
    $cableBase = $cable->coat_tv_cable_base;
    $adderBack = $cable->coat_tv_adder_back;
    $laborTime = $cable->coat_tv_base;
    $laborAdd = $cable->coat_tv_adder_base_time;
    $laborCalc = $cable->coat_tv_time_rp;
    break;
case 'A':
    $cableBase = $cable->coat_a_cable_base;
    $adderBack = $cable->coat_a_adder_back;
    $laborTime = $cable->coat_a_base;
    $laborAdd = $cable->coat_a_adder_base_time;
    $laborCalc = $cable->coat_a_time_rp;
    break;
case 'AW':
    $cableBase = $cable->coat_aw_cable_base;
    $adderBack = $cable->coat_aw_adder_back;
    $laborTime = $cable->coat_aw_base;
    $laborAdd = $cable->coat_aw_adder_base_time;
    $laborCalc = $cable->coat_aw_time_rp;
    break;
case 'AN':
    $cableBase = $cable->coat_an_cable_base;
    $adderBack = $cable->coat_an_adder_back;
    $laborTime = $cable->coat_an_base;
    $laborAdd = $cable->coat_an_adder_base_time;
    $laborCalc = $cable->coat_an_time_rp;
    break;
case 'E':
    $cableBase = $cable->coat_ej_cable_base;
    $adderBack = $cable->coat_ej_adder_back;
    $laborTime = $cable->coat_ej_base;
    $laborAdd = $cable->coat_ej_adder_base_time;
    $laborCalc = $cable->coat_ej_time_rp;
    break;
case 'EW':
    $cableBase = $cable->coat_ew_cable_base;
    $adderBack = $cable->coat_ew_adder_back;
    $laborTime = $cable->coat_ew_base;
    $laborAdd = $cable->coat_ew_adder_base_time;
    $laborCalc = $cable->coat_ew_time_rp;
    break;
case 'MC':
    $cableBase = $cable->coat_mc_cable_base;
    $adderBack = $cable->coat_mc_adder_back;
    $laborTime = $cable->coat_mc_base;
    $laborAdd = $cable->coat_mc_adder_base_time;
    $laborCalc = $cable->coat_mc_time_rp;
    break;
default:
    $cableBase = $cable->coat_n_cable_base;
    $adderBack = $cable->coat_n_adder_back;
    $laborTime = $cable->coat_n_base;
    $laborAdd = $cable->coat_n_adder_base_time;
    $laborCalc = $cable->coat_n_time_rp;
    break;
}

if ($quantity >= 1 && $quantity <= 3) {
    $qm = $cable->qm1;
} else if ($quantity >= 4 && $quantity <= 9) {
    $qm = $cable->qm2;
} else if ($quantity >= 10 && $quantity <= 24) {
    $qm = $cable->qm3;
} else if ($quantity >= 25 && $quantity <= 49) {
    $qm = $cable->qm4;
} else if ($quantity >= 50 && $quantity <= 99) {
    $qm = $cable->qm5;
} else if ($quantity >= 100 && $quantity <= 249) {
    $qm = $cable->qm6;
} else if ($quantity >= 250 && $quantity <= 499) {
    $qm = $cable->qm7;
} else if ($quantity >= 500 && $quantity <= 1000) {
    $qm = $cable->qm8;
}

$conn1Price = $conn_1_price;
$conn2Price = $conn_2_price;
$matYield = $cable->material_yield;
$shipHand = $cable->ship_handling;
$hourlyRate = $cable->hour_lab_rate;
$overHeadRate = $cable->overhead_rate;
$marginRate = $cable->margin_rate;

$cableCost = ($cableBase * $length / 12) + $adderBack;
$laborCost = ($laborTime + $laborAdd) + $laborCalc * $length;
$totalLoadedMaterial = ($conn1Price + $conn2Price + $cableCost) / $matYield * (1 + $shipHand);
$totalLoadedLabor = ($laborCost / 60 * $hourlyRate) * $overHeadRate;
$unitPrice = ($totalLoadedMaterial + ($totalLoadedLabor * $qm)) / (1 - $marginRate);

$totalPrice = $unitPrice * $quantity;

$unitPrice = number_format($unitPrice, 2, '.', '');
$totalPrice = number_format($totalPrice, 2, '.', '');

$quantities = [
    "qm1" => "1",
    "qm2" => "4",
    "qm3" => "10",
    "qm4" => "25",
    "qm5" => "50",
    "qm6" => "100",
];

$qms = [];

foreach ($quantities as $k => $q) {
    if ($length && $conn_1 && $conn_2) {
        if ($q >= 1 && $q <= 3) {
            $qm = $cable->qm1;
        } else if ($q >= 4 && $q <= 9) {
            $qm = $cable->qm2;
        } else if ($q >= 10 && $q <= 24) {
            $qm = $cable->qm3;
        } else if ($q >= 25 && $q <= 49) {
            $qm = $cable->qm4;
        } else if ($q >= 50 && $q <= 99) {
            $qm = $cable->qm5;
        } else if ($q >= 100 && $q <= 249) {
            $qm = $cable->qm6;
        }

        $cableCost = ($cableBase * $length / 12) + $adderBack;
        $laborCost = ($laborTime + $laborAdd) + $laborCalc * $length;
        $totalLoadedMaterial = ($conn1Price + $conn2Price + $cableCost) / $matYield * (1 + $shipHand);
        $totalLoadedLabor = ($laborCost / 60 * $hourlyRate) * $overHeadRate;
        $qmPrice = ($totalLoadedMaterial + ($totalLoadedLabor * $qm)) / (1 - $marginRate);

        $qmPrice = number_format($qmPrice, 2, '.', '');
    } else {
        $qmPrice = number_format(0, 2, '.', '');
    }

    array_push($qms, $qmPrice);
}



echo '{"unitPrice": "' . $unitPrice . '", "totalPrice": "' . $totalPrice . '", "qm1": "' . $qms[0] . '", "qm2": "' . $qms[1] . '", "qm3": "' . $qms[2] . '", "qm4": "' . $qms[3] . '", "qm5": "' . $qms[4] . '", "qm6": "' . $qms[5] . '"}';
?>
