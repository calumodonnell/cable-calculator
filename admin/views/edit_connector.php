<?php
	// @author Calum O'Donnell

	$title = __('Edit Connector');

	global $wpdb;

	if($_REQUEST['action'] = 'edit' && $_REQUEST['connectorid'] != ''){
		$connector_sql = "SELECT * FROM cw_connector_list where id = '" . $_REQUEST['connectorid'] . "' LIMIT 1";
		$connector = $wpdb->get_results($connector_sql, 'ARRAY_A');
	}
?>

<div class="wrap">
  <h1><?php echo esc_html( $title ); ?></h1>
  <p>Fields marked with an * are required</p>
	<form name="edit_connector" id="edit_connector" action="<?php echo admin_url('admin.php?page=add-connector&action=edit&edit=yes'); ?>" method="post" enctype="multipart/form-data">
		<table>
			<tr>
				<td class="td-width">Part No *</td>
				<td>
					<input type="hidden" class="cw_input" name="con_id" id="con_id" value="<?php echo stripslashes($connector[0]['id']); ?>" />
					<input type="text" class="cw_input" name="con_part_no" id="con_part_no" value="<?php echo stripslashes($connector[0]['con_part_no']); ?>" required />
				</td>
			</tr>
			<tr>
				<td>Series *</td>
				<td><input type="text" class="cw_input" name="con_series" id="con_series" value="<?php echo stripslashes($connector[0]['con_series']);?>" required /></td>
			</tr>
			<tr>
				<td>Description</td>
				<td><input type="text" class="cw_input" name="con_description" id="con_description" value="<?php echo stripslashes($connector[0]['con_description']);?>" /></td>
			</tr>
			<tr>
				<td>Macola Code</td>
				<td><input type="text" class="cw_input" name="con_mac_code" id="con_mac_code" value="<?php echo stripslashes($connector[0]['con_mac_code']);?>" /></td>
			</tr>
			<tr>
				<td>Max. Frequency</td>
				<td><input type="text" class="cw_input" name="con_max_freq" id="con_max_freq"  value="<?php echo stripslashes($connector[0]['con_max_freq']);?>" /></td>
			</tr>
			<tr>
				<td>Connector Image</td>
				<td>
					<p><?php echo stripslashes($connector[0]['con_img']); ?></p>
					<input type="hidden" class="cw_input"  name="con_img" id="con_img" value="<?php echo stripslashes($connector[0]['con_img']); ?>" />
					<input type="file" class="cw_input" name="con_img" id="con_img" accept="image/*">
				</td>
			</tr>
			<tr>
				<td>Available</td>
				<td><input type="checkbox" class="cw_input" name="con_status" id="con_status" <?php if($connector[0]['con_status'] == 'on'){echo "checked";}?> /></td>
			</tr>
			<tr>
				<td>&nbsp;</td>
				<td><input type="submit" class="button button-primary button-large" name="submit" id="submit" value="Edit Cable" /></td>
			</tr>
		</table>
	</form>
</div>
