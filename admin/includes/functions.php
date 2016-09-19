<?php
// author calum o'donnell

// registers sessions
function register_session(){
    if( !session_id() )
        session_start();
}
add_action('init','register_session');

// set default settings for cable wizard
function cw_default_settings(){
	global $wpdb;

	$default_sql = "UPDATE cw_default_settings SET material_yield = '" . $_POST['material_yield'] . "' WHERE id = '" . $_POST['default_id'] . "'";
	$default_query = $wpdb->query($default_sql);

  if($default_query) :
		$_SESSION['added'] = "Default settings updated successfully";
  else :
    $_SESSION['edited'] = "There was an issue updating your settings. Please try again";
	endif;

  echo "<script> location.replace('admin.php?page=default-settings'); </script>";
}

function cw_add_cable(){
	global $wpdb;

  $cable_img = '';

  $current_date = date("Y-m-d");

  if(isset($_POST['outdoor'])){ $outdoor = $_POST['outdoor']; } else { $outdoor = ""; }
  if(isset($_POST['indoor'])){ $indoor = $_POST['indoor']; } else { $indoor = ""; }
  if(isset($_POST['test'])){ $test = $_POST['test']; } else { $test = ""; }
  if(isset($_POST['available'])){ $available = $_POST['available']; } else { $available = ""; }

  if (file_exists($_FILES['cable_img']['tmp_name']) || is_uploaded_file($_FILES['cable_img']['tmp_name'])) :
    if (isset($_FILES["cable_img"]["error"])) :
      if ($_FILES["cable_img"]["error"] > 0) :
        $error = "Error: " . $_FILES["cable_img"]["error"];
      else :
        $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
        $filename = $_FILES["cable_img"]["name"];
        $filetype = $_FILES["cable_img"]["type"];
        $filesize = $_FILES["cable_img"]["size"];

        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists($ext, $allowed)) die($error = "Select a valid image file format. Please try again.");

        $maxsize = 5 * 1024 * 1024;
        if ($filesize > $maxsize) die($error = "Image size is larger than the 5 Mb limit. Please try again.");

        if (in_array($filetype, $allowed)) :
          if (file_exists("upload/" . $_FILES["cable_img"]["name"])) :
            $error = $_FILES["cable_img"]["name"] . " already exists.";
          else :
            move_uploaded_file($_FILES["cable_img"]["tmp_name"], "../wp-content/uploads/cable-wizard/" . $_FILES["cable_img"]["name"]);
            $con_img = basename($_FILES["cable_img"]["name"]);
          endif;
        else :
          $error = "Sorry, there was an error uploading the image. Please try again.";
        endif;
      endif;
    else :
      $error = "Sorry, there was an error uploading the image. Please try again.";
    endif;
  endif;

  if (!isset($error)) :
  	$cable_sql = "INSERT INTO cw_cable_list (`name`, `part_no`, `max_freq`, `diameter`, `min_bend`, `typ_atten_k1`, `typ_atten_k2`, `outdoor`, `indoor`, `test`, `price`, `flex`, `cable_img`, `margin_rate`, `hour_lab_rate`, `overhead_rate`, `ship_handling`, `qm1`, `qm2`, `qm3`, `qm4`, `qm5`, `qm6`, `qm7`, `qm8`, `available`, `coat_n_cable_base`, `coat_n_adder_back`, `coat_n_base`, `coat_n_adder_base_time`, `coat_n_time_rp`, `coat_w_cable_base`, `coat_w_adder_back`, `coat_w_base`, `coat_w_adder_base_time`, `coat_w_time_rp`, `coat_tv_cable_base`, `coat_tv_adder_back`, `coat_tv_base`, `coat_tv_adder_base_time`, `coat_tv_time_rp`, `coat_a_cable_base`, `coat_a_adder_back`, `coat_a_base`, `coat_a_adder_base_time`, `coat_a_time_rp`, `coat_aw_cable_base`, `coat_aw_adder_back`, `coat_aw_base`, `coat_aw_adder_base_time`, `coat_aw_time_rp`, `coat_an_cable_base`, `coat_an_adder_back`, `coat_an_base`, `coat_an_adder_base_time`, `coat_an_time_rp`, `coat_ej_cable_base`, `coat_ej_adder_back`, `coat_ej_base`, `coat_ej_adder_base_time`, `coat_ej_time_rp`, `coat_ew_cable_base`, `coat_ew_adder_back`, `coat_ew_base`, `coat_ew_adder_base_time`, `coat_ew_time_rp`, `coat_mc_cable_base`, `coat_mc_adder_back`, `coat_mc_base`, `coat_mc_adder_base_time`, `coat_mc_time_rp`, `date_created`, `date_modified`) VALUES ('" . $_POST['name'] . "', '" . $_POST['part_no'] . "', '" . $_POST['max_freq'] . "', '" . $_POST['diameter'] . "', '" . $_POST['min_bend'] . "', '" . $_POST['typ_atten_k1'] .  "', '" . $_POST['typ_atten_k2'] . "', '" . $outdoor . "', '" . $indoor . "', '" . $test . "', '" . $_POST['price'] . "', '" . $_POST['flex'] . "', '$cable_img', '" . $_POST['margin_rate'] . "', '" . $_POST['hour_lab_rate'] . "', '" . $_POST['overhead_rate'] . "', '" . $_POST['ship_handling'] . "', '" . $_POST['qm1'] . "', '" . $_POST['qm2'] . "', '" . $_POST['qm3'] . "', '" . $_POST['qm4'] . "', '" . $_POST['qm5'] . "', '" . $_POST['qm6'] . "', '" . $_POST['qm7'] . "', '" . $_POST['qm8'] . "', '" . $available . "', '" . $_POST['coat_n_cable_base'] . "', '" . $_POST['coat_n_adder_back'] . "', '" . $_POST['coat_n_base'] . "', '" . $_POST['coat_n_adder_base_time'] . "', '" . $_POST['coat_n_time_rp'] . "', '" . $_POST['coat_w_cable_base'] . "', '" . $_POST['coat_w_adder_back'] . "', '" . $_POST['coat_w_base'] . "', '" . $_POST['coat_w_adder_base_time'] . "', '" . $_POST['coat_w_time_rp'] . "', '" . $_POST['coat_tv_cable_base'] . "', '" . $_POST['coat_tv_adder_back'] . "', '" . $_POST['coat_tv_base'] . "', '" . $_POST['coat_tv_adder_base_time'] . "', '" . $_POST['coat_tv_time_rp'] . "', '" . $_POST['coat_a_cable_base'] . "', '" . $_POST['coat_a_adder_back'] . "', '" . $_POST['coat_a_base'] . "', '" . $_POST['coat_a_adder_base_time'] . "', '" . $_POST['coat_a_time_rp'] . "', '" . $_POST['coat_aw_cable_base'] . "', '" . $_POST['coat_aw_adder_back'] . "', '" . $_POST['coat_aw_base'] . "', '" . $_POST['coat_aw_adder_base_time'] . "', '" . $_POST['coat_aw_time_rp'] . "', '" . $_POST['coat_an_cable_base'] . "', '" . $_POST['coat_an_adder_back'] . "', '" . $_POST['coat_an_base'] . "', '" . $_POST['coat_an_adder_base_time'] . "', '" . $_POST['coat_an_time_rp'] . "', '" . $_POST['coat_ej_cable_base'] . "', '" . $_POST['coat_ej_adder_back'] . "', '" . $_POST['coat_ej_base'] . "', '" . $_POST['coat_ej_adder_base_time'] . "', '" . $_POST['coat_ej_time_rp'] . "', '" . $_POST['coat_ew_cable_base'] . "', '" . $_POST['coat_ew_adder_back'] . "', '" . $_POST['coat_ew_base'] . "', '" . $_POST['coat_ew_adder_base_time'] . "', '" . $_POST['coat_ew_time_rp'] . "', '" . $_POST['coat_mc_cable_base'] . "', '" . $_POST['coat_mc_adder_back'] . "', '" . $_POST['coat_mc_base'] . "', '" . $_POST['coat_mc_adder_base_time'] . "', '" . $_POST['coat_mc_time_rp'] . "', '" . $current_date . "', '" . $current_date . "')";
  	$cable_query = $wpdb->query($cable_sql);

    if (isset($cable_query)) :
    	$cable_id_sql = "SELECT * FROM cw_cable_list WHERE name = '" . $_POST['name'] . "' AND part_no = '" . $_POST['part_no'] . "' LIMIT 1";
    	$cable_id_query = $wpdb->get_results($cable_id_sql, 'ARRAY_A');

      $cable_id = $cable_id_query[0]['id'];

      if (!empty($_POST['connector_part']) && array_filter($_POST['connector_part'])) :
      	foreach( $_POST['connector_part'] as $row => $value ) :
          $connector_sql = "SELECT con_series, con_part_no FROM cw_connector_list WHERE id = '" . $_POST['connector_part'][$row] . "' LIMIT 1";
          $connector = $wpdb->get_results($connector_sql, 'ARRAY_A');

          if (isset($connector)) :
        		$pricing_sql = "INSERT INTO cw_cable_connector_pricing (cable_id, connector_id, con_part_no, con_series, price) VALUES ('" . $cable_id . "', '" . $_POST['connector_part'][$row] . "', '" . $connector[0]['con_part_no'] . "', '" . $connector[0]['con_series'] . "', '" . $_POST['connector_price'][$row] . "')";
        		$pricing_query = $wpdb->query($pricing_sql);
          endif;
      	endforeach;
      endif;
    endif;
  endif;

	if(isset($cable_query)) :
		$_SESSION['added'] = "A new cable was added successfully";
  else :
    if(isset($error)) :
      $_SESSION['edited'] = $error;
    else :
      $_SESSION['edited'] = "There was a problem adding the new cable. Please try again";
    endif;
  endif;

  echo "<script> location.replace('admin.php?page=cable-wizard'); </script>";
}


function cw_edit_cable(){
	global $wpdb;

  $current_date = date("Y-m-d");

  if(isset($_POST['outdoor'])){ $outdoor = $_POST['outdoor']; } else { $outdoor = ""; }
  if(isset($_POST['indoor'])){ $indoor = $_POST['indoor']; } else { $indoor = ""; }
  if(isset($_POST['test'])){ $test = $_POST['test']; } else { $test = ""; }
  if(isset($_POST['available'])){ $available = $_POST['available']; } else { $available = ""; }

  if (file_exists($_FILES['cable_img']['tmp_name']) || is_uploaded_file($_FILES['cable_img']['tmp_name'])) :
    if (isset($_FILES["cable_img"]["error"])) :
      if ($_FILES["cable_img"]["error"] > 0) :
        $error = "Error: " . $_FILES["cable_img"]["error"];
      else :
        $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
        $filename = $_FILES["cable_img"]["name"];
        $filetype = $_FILES["cable_img"]["type"];
        $filesize = $_FILES["cable_img"]["size"];

        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists($ext, $allowed)) die($error = "Select a valid image file format. Please try again.");

        $maxsize = 5 * 1024 * 1024;
        if ($filesize > $maxsize) die($error = "Image size is larger than the 5 Mb limit. Please try again.");

        if (in_array($filetype, $allowed)) :
          if (file_exists("upload/" . $_FILES["cable_img"]["name"])) :
            $error = $_FILES["cable_img"]["name"] . " already exists.";
          else :
            move_uploaded_file($_FILES["cable_img"]["tmp_name"], "../wp-content/uploads/cable-wizard/" . $_FILES["cable_img"]["name"]);
            $cable_img = basename($_FILES["cable_img"]["name"]);
          endif;
        else :
          $error = "Sorry, there was an error uploading the image. Please try again.";
        endif;
      endif;
    else :
      $error = "Sorry, there was an error uploading the image. Please try again.";
    endif;
  elseif (isset($_POST['cable_img'])) :
    $cable_img = $_POST['cable_img'];
  else :
    $cable_img = '';
  endif;

	if(isset($_POST['cable_id']) && !isset($error)) :
		$cable_sql = "UPDATE cw_cable_list SET name = '" . $_POST['name'] . "', part_no = '" . $_POST['part_no'] . "', max_freq = '" . $_POST['max_freq'] . "', diameter = '" . $_POST['diameter'] . "', min_bend = '" . $_POST['min_bend'] . "', typ_atten_k1 = '" . $_POST['typ_atten_k1'] . "', typ_atten_k2 = '" . $_POST['typ_atten_k2'] . "', outdoor = '" . $outdoor . "', indoor = '" . $indoor . "', test = '" . $test . "', price = '" . $_POST['price'] . "', flex = '" . $_POST['flex'] . "', cable_img = '" . $cable_img . "', margin_rate = '" . $_POST['margin_rate'] . "', hour_lab_rate = '" . $_POST['hour_lab_rate'] . "', overhead_rate = '" . $_POST['overhead_rate'] . "', ship_handling = '" . $_POST['ship_handling'] . "', qm1 = '" . $_POST['qm1'] . "', qm2 = '" . $_POST['qm2'] . "', qm3 = '" . $_POST['qm3'] . "', qm4 = '" . $_POST['qm4'] . "', qm5 = '" . $_POST['qm5'] . "', qm6 = '" . $_POST['qm6'] . "', qm7 = '" . $_POST['qm7'] . "', qm8 = '" . $_POST['qm8'] . "', available = '" . $available . "', coat_n_cable_base = '" . $_POST['coat_n_cable_base'] . "', coat_n_adder_back = '" . $_POST['coat_n_adder_back'] . "', coat_n_base = '" . $_POST['coat_n_base'] . "', coat_n_adder_base_time = '" . $_POST['coat_n_adder_base_time'] . "', coat_n_time_rp = '" . $_POST['coat_n_time_rp'] . "', coat_w_cable_base = '" . $_POST['coat_w_cable_base'] . "', coat_w_adder_back = '" . $_POST['coat_w_adder_back'] . "', coat_w_base = '" . $_POST['coat_w_base'] . "', coat_w_adder_base_time = '" . $_POST['coat_w_adder_base_time'] . "', coat_w_time_rp = '" . $_POST['coat_w_time_rp'] . "', coat_tv_cable_base = '" . $_POST['coat_tv_cable_base'] . "', coat_tv_adder_back = '" . $_POST['coat_tv_adder_back'] . "', coat_tv_base = '" . $_POST['coat_tv_base'] . "', coat_tv_adder_base_time = '" . $_POST['coat_tv_adder_base_time'] . "', coat_tv_time_rp = '" . $_POST['coat_tv_time_rp'] . "', coat_a_cable_base = '" . $_POST['coat_a_cable_base'] . "', coat_a_adder_back = '" . $_POST['coat_a_adder_back'] . "', coat_a_base = '" . $_POST['coat_a_base'] . "', coat_a_adder_base_time = '" . $_POST['coat_a_adder_base_time'] . "', coat_a_time_rp = '" . $_POST['coat_a_time_rp'] . "', coat_aw_cable_base = '" . $_POST['coat_aw_cable_base'] . "', coat_aw_adder_back = '" . $_POST['coat_aw_adder_back'] . "', coat_aw_base = '" . $_POST['coat_aw_base'] . "', coat_aw_adder_base_time = '" . $_POST['coat_aw_adder_base_time'] . "', coat_aw_time_rp = '" . $_POST['coat_aw_time_rp'] . "', coat_an_cable_base = '" . $_POST['coat_an_cable_base'] . "', coat_an_adder_back = '" . $_POST['coat_an_adder_back'] . "', coat_an_base = '" . $_POST['coat_an_base'] . "', coat_an_adder_base_time = '" . $_POST['coat_an_adder_base_time'] . "', coat_an_time_rp = '" . $_POST['coat_an_time_rp'] . "', coat_ej_cable_base = '" . $_POST['coat_ej_cable_base'] . "', coat_ej_adder_back = '" . $_POST['coat_ej_adder_back'] . "', coat_ej_base = '" . $_POST['coat_ej_base'] . "', coat_ej_adder_base_time = '" . $_POST['coat_ej_adder_base_time'] . "', coat_ej_time_rp = '" . $_POST['coat_ej_time_rp'] . "', coat_ew_cable_base = '" . $_POST['coat_ew_cable_base'] . "', coat_ew_adder_back = '" . $_POST['coat_ew_adder_back'] . "', coat_ew_base = '" . $_POST['coat_ew_base'] . "', coat_ew_adder_base_time = '" . $_POST['coat_ew_adder_base_time'] . "', coat_ew_time_rp = '" . $_POST['coat_ew_time_rp'] . "', coat_mc_cable_base = '" . $_POST['coat_mc_cable_base'] . "', coat_mc_adder_back = '" . $_POST['coat_mc_adder_back'] . "', coat_mc_base = '" . $_POST['coat_mc_base'] . "', coat_mc_adder_base_time = '" . $_POST['coat_mc_adder_base_time'] . "', coat_mc_time_rp = '" . $_POST['coat_mc_time_rp'] . "', date_modified = '" . $current_date . "' WHERE id = '" . $_POST['cable_id'] . "' ";
		$cable_query = $wpdb->query($cable_sql);

		$delete_query = "DELETE FROM cw_cable_connector_pricing WHERE cable_id = '" . $_POST['cable_id'] . "'";
	  $delete_query = $wpdb->query($delete_query);

    if (!empty($_POST['connector_part']) && array_filter($_POST['connector_part'])) :
      foreach( $_POST['connector_part'] as $row => $value ) :
        $connector_sql = "SELECT con_series, con_part_no FROM cw_connector_list WHERE id = '" . $_POST['connector_part'][$row] . "' LIMIT 1";
        $connector = $wpdb->get_results($connector_sql, 'ARRAY_A');

        if(isset($connector)):
      		$pricing_sql = "INSERT INTO cw_cable_connector_pricing (cable_id, connector_id, con_part_no, con_series, price) VALUES ('" . $_POST['cable_id'] . "', '" . $_POST['connector_part'][$row] . "', '" . $connector[0]['con_part_no'] . "', '" . $connector[0]['con_series'] . "', '" . $_POST['connector_price'][$row] . "')";
      		$pricing_query = $wpdb->query($pricing_sql);
        endif;
    	endforeach;
    endif;
	endif;

	if(isset($cable_query) || isset($pricing_query) || isset($connector_query)) :
		$_SESSION['added'] = "The cable was updated successfully";
	else :
    if (isset($error)) :
		  $_SESSION['edited'] = $error;
    else :
      $_SESSION['edited'] = "There was a problem editing this cable. Please try again";
    endif;
	endif;

  echo "<script> location.replace('admin.php?page=cable-wizard'); </script>";
}


function cw_delete_cable() {
	global $wpdb;

  $cable_id = $_GET['cable_id'];

  $delete_cable_sql = "DELETE FROM cw_cable_list WHERE id='$cable_id'";
  $delete_cable_query = $wpdb->query($delete_cable_sql);

  $delete_price_sql = "DELETE FROM cw_cable_connector_pricing WHERE cable_id='$cable_id'";
  $delete_price_query = $wpdb->query($delete_price_sql);

	if($delete_cable_query || $delete_price_query) :
		$_SESSION['deleted']="Cable deleted successfully";
		?>
		<script>window.location.href ="<?php echo admin_url("admin.php?page=cable-wizard");?>";</script>
		<?php
		exit();
	endif;
}


// add new connector data function
function cw_add_connector() {
	global $wpdb;

  $con_img = "";

  $current_date = date("Y-m-d");

  if(isset($_POST['con_status'])){ $con_status = $_POST['con_status']; } else { $con_status = ""; }

  if (file_exists($_FILES['con_img']['tmp_name']) || is_uploaded_file($_FILES['con_img']['tmp_name'])) :
    if (isset($_FILES["con_img"]["error"])) :
      if ($_FILES["con_img"]["error"] > 0) :
        $error = "Error: " . $_FILES["con_img"]["error"];
      else :
        $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
        $filename = $_FILES["con_img"]["name"];
        $filetype = $_FILES["con_img"]["type"];
        $filesize = $_FILES["con_img"]["size"];

        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists($ext, $allowed)) die($error = "Select a valid image file format. Please try again.");

        $maxsize = 5 * 1024 * 1024;
        if ($filesize > $maxsize) die($error = "Image size is larger than the 5 Mb limit. Please try again.");

        if (in_array($filetype, $allowed)) :
          if (file_exists("upload/" . $_FILES["con_img"]["name"])) :
            $error = $_FILES["con_img"]["name"] . " already exists.";
          else :
            move_uploaded_file($_FILES["con_img"]["tmp_name"], "../wp-content/uploads/cable-wizard/" . $_FILES["con_img"]["name"]);
            $con_img = basename($_FILES["con_img"]["name"]);
          endif;
        else :
          $error = "Sorry, there was an error uploading the image. Please try again.";
        endif;
      endif;
    else :
      $error = "Sorry, there was an error uploading the image. Please try again.";
    endif;
  endif;

	if (!isset($error)) :
    $connector_sql = "INSERT INTO cw_connector_list (`con_series`, `con_part_no`, `con_description`, `con_mac_code`, `con_max_freq`, `con_img`, `con_status`, `date_created`, `date_modified`)  VALUES ('" . $_POST['con_series'] . "', '" . $_POST['con_part_no'] . "', '" . $_POST['con_description'] . "', '" . $_POST['con_mac_code'] . "', '" . $_POST['con_max_freq'] . "', '" . $con_img . "', '" . $con_status . "', '" . $current_date . "', '" . $current_date . "')";
		$connector_query = $wpdb->query($connector_sql);
	endif;

  if(isset($connector_query)) :
    $_SESSION['added'] = "A new connector was added successfully";
  else :
    if(isset($error)) :
      $_SESSION['edited'] = $error;
    else :
      $_SESSION['edited'] = "There was a problem adding the new connector. Please try again";
    endif;
  endif;

  echo "<script> location.replace('admin.php?page=connector-list'); </script>";
}


// edit connector data function
function cw_edit_connector() {
	global $wpdb;

  $current_date = date("Y-m-d");

  if(isset($_POST['con_status'])){ $con_status = $_POST['con_status']; } else { $con_status = ""; }

  if (file_exists($_FILES['con_img']['tmp_name']) || is_uploaded_file($_FILES['con_img']['tmp_name'])) :
    if (isset($_FILES['con_img']['error'])) :
      if ($_FILES['con_img']['error'] > 0) :
        $error = "Error: " . $_FILES['con_img']['error'];
      else :
        $allowed = array("jpg" => "image/jpg", "jpeg" => "image/jpeg", "gif" => "image/gif", "png" => "image/png");
        $filename = $_FILES["con_img"]["name"];
        $filetype = $_FILES["con_img"]["type"];
        $filesize = $_FILES["con_img"]["size"];

        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if (!array_key_exists($ext, $allowed)) die($error = "Select a valid image file format. Please try again.");

        $maxsize = 5 * 1024 * 1024;
        if ($filesize > $maxsize) die($error = "Image size is larger than the 5 Mb limit. Please try again.");

        if (in_array($filetype, $allowed)) :
            if (file_exists("upload/" . $_FILES["con_img"]["name"])) :
                $error = $_FILES["photo"]["con_img"] . " already exists.";
            else :
                move_uploaded_file($_FILES["con_img"]["tmp_name"], "../wp-content/uploads/cable-wizard/" . $_FILES["con_img"]["name"]);
                $con_img = basename($_FILES["con_img"]["name"]);
            endif;
        else :
            $error = "Sorry, there was an error uploading the image. Please try again.";
        endif;
      endif;
    else :
      $error = "Sorry, there was an error uploading the image. Please try again.";
    endif;
  elseif (isset($_POST['con_img'])) :
    $con_img = $_POST['con_img'];
  else :
    $con_img = '';
  endif;

	if(isset($_POST['con_id']) && !isset($error)) :
	  $connector_sql = "UPDATE cw_connector_list SET con_series = '" . $_POST['con_series'] . "', con_part_no = '" . $_POST['con_part_no'] . "', con_description = '" . $_POST['con_description'] . "', con_mac_code = '" . $_POST['con_mac_code'] . "', con_max_freq = '" . $_POST['con_max_freq'] . "', con_img = '" . $con_img . "', con_status = '" . $con_status . "', date_modified = '" . $current_date . "' WHERE id = '" . $_POST['con_id'] . "'";
    $connector_query = $wpdb->query($connector_sql);
	endif;

	if(isset($connector_query)) :
		$_SESSION['added'] = "The connector was updated successfully";
	else :
    if (isset($error)) :
      $_SESSION['edited'] = $error;
    else :
      $_SESSION['edited'] = "There was a problem editing this connector. Please try again";
    endif;
	endif;

  echo "<script> location.replace('admin.php?page=connector-list'); </script>";
}


// delete connector
function cw_delete_connector(){
	global $wpdb;

  $delete_sql = "DELETE FROM cw_connector_list WHERE id='" . $_REQUEST['connectorid'] . "'";
  $delete_query = $wpdb->query($delete_sql);

	if($delete_query) :
		$_SESSION['deleted'] = "Connector deleted successfully";
  else :
    $_SESSION['edited'] = "There was an issue deleting the connector. Please try again";
	endif;

  echo "<script> location.replace('admin.php?page=connector-list'); </script>";
}


// pagination on all list pages
function pagination($location, $total_record, $total_posts, $pages, $lpm1, $prev, $next) {
  if($total_posts > 1) {
    $pagination = "";
		if ($pages > 1) {
			$pagination .= "<a href='?";
			foreach($_GET as $key => $value){
				$pagination .= $key . "=" . $value . "&";
			}
			$pagination .= "pg=$prev' class='prev-page'>‹</a>";
		} else {
			$pagination .= "<span class='tablenav-pages-navspan'>‹</span> ";
		}

		$count_pages = ($total_posts / 10) * 10;
		$pagination .= "<span id='table-paging' class='paging-input'>$pages of <span class='total-pages'>$count_pages</span></span>";

    if ($pages < $count_pages) {
			$pagination .= " <a href='?";
			foreach ($_GET as $key => $value) {
				$pagination .= $key . "=" . $value . "&";
			}
			$pagination .= "pg=$next' class='next-page'><span class='screen-reader-text'>Next page</span><span aria-hidden='true'>›</span></a>";

		} else {
			$pagination.= " <span class='tablenav-pages-navspan'>›</span>\n";
		}
	}
  return $pagination;
}


// display cable wizard on site to users
function cw_application() {
  ?>
  <div class='cable-wizard' ng-app='cable-wizard'>
    <div ng-view></div>
    <div ng-include="'./wp-content/plugins/cable-wizard/templates/footer.html'"></div>
    <noscript>
      <div class='no-script'>
        <p>You must have JavaScript enabled to use this app.</p>
      </div>
    </noscript>
  </div>
  <?php
}
?>
