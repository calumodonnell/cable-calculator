<?php
/*
Plugin Name: Cable Wizard
Description: Cable Wizard
Version: 1.0
Author: Calum O'Donnell
Author URI: http://calumodonnell.co.uk
*/

$siteurl = get_option('siteurl');
define('SR_FOLDER', dirname(plugin_basename(__FILE__)));
define('SR_URL', $siteurl.'/wp-content/plugins/' . SR_FOLDER);
define('SR_FILE_PATH', dirname(__FILE__));
define('SR_DIR_NAME', basename(SR_FILE_PATH));

global $wpdb;
global $cw_db_version;

$cw_db_version = '1.0';

include('admin/includes/functions.php');

add_shortcode('show_cable_wizard', 'cw_show_cable_wizard');

function cw_install() {
	global $wpdb;

	$con_price_sql = "CREATE TABLE cw_cable_connector_pricing (
		`id` int(250) NOT NULL AUTO_INCREMENT,
	  `cable_id` int(11) NOT NULL,
	  `connector_id` int(11) NOT NULL,
		`con_part_no` varchar(20) NOT NULL,
		`con_series` varchar(20) NOT NULL,
	  `price` decimal(5,2) NOT NULL,
		PRIMARY KEY (`id`))";

	require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );
	dbDelta( $con_price_sql );

	$cable_sql = "CREATE TABLE cw_cable_list (
		`id` int(11) NOT NULL AUTO_INCREMENT,
	  `name` varchar(80) DEFAULT NULL,
	  `part_no` varchar(20) DEFAULT NULL,
	  `max_freq` decimal(10,2) DEFAULT NULL,
	  `diameter` decimal(10,3) DEFAULT NULL,
	  `min_bend` decimal(10,2) DEFAULT NULL,
	  `typ_atten_k1` decimal(10,7) DEFAULT NULL,
	  `typ_atten_k2` decimal(10,7) DEFAULT NULL,
	  `outdoor` varchar(20) DEFAULT NULL,
	  `indoor` varchar(20) DEFAULT NULL,
	  `test` varchar(20) DEFAULT NULL,
	  `price` varchar(20) DEFAULT NULL,
	  `flex` varchar(20) DEFAULT NULL,
	  `cable_img` varchar(120) DEFAULT NULL,
	  `margin_rate` decimal(10,2) DEFAULT NULL,
	  `hour_lab_rate` decimal(10,2) DEFAULT NULL,
	  `overhead_rate` decimal(10,2) DEFAULT NULL,
	  `ship_handling` decimal(10,2) DEFAULT NULL,
	  `qm1` decimal(10,2) DEFAULT NULL,
	  `qm2` decimal(10,2) DEFAULT NULL,
	  `qm3` decimal(10,2) DEFAULT NULL,
	  `qm4` decimal(10,2) DEFAULT NULL,
	  `qm5` decimal(10,2) DEFAULT NULL,
	  `qm6` decimal(10,2) DEFAULT NULL,
	  `qm7` decimal(10,2) DEFAULT NULL,
	  `qm8` decimal(10,2) DEFAULT NULL,
	  `status` varchar(20) DEFAULT NULL,
		`coat_n_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_n_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_n_base` decimal(10,2) DEFAULT NULL,
	  `coat_n_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_n_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_w_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_w_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_w_base` decimal(10,2) DEFAULT NULL,
	  `coat_w_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_w_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_tv_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_tv_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_tv_base` decimal(10,2) DEFAULT NULL,
	  `coat_tv_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_tv_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_a_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_a_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_a_base` decimal(10,2) DEFAULT NULL,
	  `coat_a_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_a_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_aw_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_aw_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_aw_base` decimal(10,2) DEFAULT NULL,
	  `coat_aw_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_aw_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_an_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_an_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_an_base` decimal(10,2) DEFAULT NULL,
	  `coat_an_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_an_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_ej_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_ej_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_ej_base` decimal(10,2) DEFAULT NULL,
	  `coat_ej_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_ej_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_ew_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_ew_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_ew_base` decimal(10,2) DEFAULT NULL,
	  `coat_ew_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_ew_time_rp` decimal(10,2) DEFAULT NULL,
	  `coat_mc_cable_base` decimal(10,2) DEFAULT NULL,
	  `coat_mc_adder_back` decimal(10,2) DEFAULT NULL,
	  `coat_mc_base` decimal(10,2) DEFAULT NULL,
	  `coat_mc_adder_base_time` decimal(10,2) DEFAULT NULL,
	  `coat_mc_time_rp` decimal(10,2) DEFAULT NULL,
		PRIMARY KEY (`id`))";

	require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );
	dbDelta( $cable_sql );

	$connector_sql = "CREATE TABLE cw_connector_list (
		`id` int(11) NOT NULL AUTO_INCREMENT,
	  `con_series` varchar(40) DEFAULT NULL,
	  `con_part_no` varchar(40) DEFAULT NULL,
	  `con_description` varchar(100) DEFAULT NULL,
		`con_loss` decimal(3,3) DEFAULT NULL,
	  `con_mac_code` varchar(40) DEFAULT NULL,
	  `con_max_freq` int(11) DEFAULT NULL,
	  `con_img` varchar(120) DEFAULT NULL,
	  `con_status` varchar(20) DEFAULT NULL,
		PRIMARY KEY (`id`))";

	require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );
	dbDelta( $connector_sql );

	add_option("table_db_version", $cw_db_version);
}
register_activation_hook(__FILE__, 'cw_install');


function cw_admin_menu() {
	$parent_slug = 'cable-wizard';

	add_menu_page("", "Cable Wizard", 'read', $parent_slug, "cw_cable_list", 'dashicons-screenoptions', 81);
	add_submenu_page($parent_slug, 'Cable List', 'Cable List', 'read', $parent_slug, 'cw_cable_list');
	add_submenu_page($parent_slug, 'Connector List', 'Connector List', 'read', 'connector-list', 'cw_connector_list');
	add_submenu_page($parent_slug, 'Add New Cable', 'Add New Cable', 'read', 'add-cable', 'cw_cable_functions');
	add_submenu_page($parent_slug, 'Add New Connector', 'Add New Connector', 'read', 'add-connector', 'cw_connector_functions');
}
add_action('admin_menu', 'cw_admin_menu');


function cw_admin_load() {
	wp_enqueue_style('cw-admin-style',  SR_URL . '/admin/css/style.css', '');
	wp_enqueue_style('cw-admin-style',  SR_URL . '/admin/js/custom.min.js', '');
}
add_action('admin_init', 'cw_admin_load');


function cw_load() {
	wp_enqueue_script('angularjs', '//ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js');
	wp_enqueue_script('angularjs-ui-route', '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js');
	wp_enqueue_script('hotkeys', SR_URL . '/app/assets/libs/hotkeys.min.js');
	wp_enqueue_style('bootstrap-css', '//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css');
	wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');

	wp_enqueue_style('cw-app-style',  SR_URL . '/app/assets/css/style.css', '');
	wp_enqueue_style('cw-app-drawing',  SR_URL . '/app/assets/css/drawing.css', 'print');
	wp_enqueue_style('cw-app-quotation',  SR_URL . '/app/assets/css/quotation.css', 'print');

	wp_enqueue_script('app', SR_URL .'/app/app.js');
	wp_enqueue_script('cables', SR_URL .'/app/services/cables.js');
	wp_enqueue_script('series', SR_URL .'/app/services/series.js');
	wp_enqueue_script('covering', SR_URL .'/app/services/covering.js');
	wp_enqueue_script('connectors', SR_URL .'/app/services/connectors.js');
	wp_enqueue_script('back', SR_URL .'/app/directives/back.js');
	wp_enqueue_script('metricWatch', SR_URL .'/app/directives/metricWatch.js');
	wp_enqueue_script('noComma', SR_URL .'/app/filters/noComma.js');
	wp_enqueue_script('rfLength', SR_URL .'/app/filters/rfLength.js');
	wp_enqueue_script('cableCtrl', SR_URL .'/app/controllers/cableCtrl.js');
	wp_enqueue_script('connectorCtrl', SR_URL .'/app/controllers/connectorCtrl.js');
	wp_enqueue_script('cartCtrl', SR_URL .'/app/controllers/cartCtrl.js');
	wp_enqueue_script('editCtrl', SR_URL .'/app/controllers/editCtrl.js');
}
add_action('wp_loaded', 'cw_load');


function cw_show_cable_wizard() {
	cw_application();
}


function cw_cable_list(){
	include('admin/views/cable_list.php');
}


function cw_connector_list(){
	include('admin/views/connector_list.php');
}


function cw_cable_functions(){
	global $wpdb;

	if (!isset($_REQUEST['action'])) :
		include('admin/views/add_cable.php');
	endif;

	if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'add') :
		cw_add_cable();
	endif;

	if (isset($_REQUEST['edit']) && $_REQUEST['action'] == 'edit') :
		cw_edit_cable();
	endif;

	if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'edit' && isset($_REQUEST['cable_id'])) :
		include('admin/views/edit_cable.php');
	endif;

	if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete' && $_REQUEST['action'] != 'edit') :
		cw_delete_cable();
	endif;
}


function cw_connector_functions() {
	global $wpdb;

	if (!isset($_REQUEST['action'])) :
		include('admin/views/add_connector.php');
	endif;

	if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'add') :
		cw_add_connector();
	endif;

	if (isset($_REQUEST['edit']) && $_REQUEST['action'] == 'edit') :
		cw_edit_connector();
	endif;

	if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'edit' && $_REQUEST['connectorid']) :
		include('admin/views/edit_connector.php');
	endif;

	if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'delete' && $_REQUEST['action'] != 'edit') :
		cw_delete_connector();
	endif;
}
?>
