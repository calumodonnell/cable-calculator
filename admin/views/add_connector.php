<?php
	// @author Calum O'Donnell

	$title = __('Add New Connector');

	global $wpdb;
?>

<div class="wrap">
	<h1><?php echo esc_html( $title ); ?></h1>
	<p>Fields marked with an * are required</p>
	<form name="add_connector" id="add_connector" action="<?php echo admin_url('admin.php?page=add-connector&amp;action=add'); ?>" method="post" enctype="multipart/form-data">
		<table>
			<tr>
				<td class="td-width">Part No *</td>
				<td><input type="text" class="cw_input" name="con_part_no" id="con_part_no" required /></td>
			</tr>
			<tr>
				<td>Series *</td>
				<td><input type="text" class="cw_input" name="con_series" id="con_series" required /></td>
			</tr>
			<tr>
				<td>Description</td>
				<td><input type="text" class="cw_input" name="con_description" id="con_description" /></td>
			</tr>
			<tr>
				<td>Macola Code</td>
				<td><input type="text" class="cw_input" name="con_mac_code" id="con_mac_code" /></td>
			</tr>
			<tr>
				<td>Max. Frequency</td>
				<td><input type="number" class="cw_input" name="con_max_freq" id="con_max_freq" /></td>
			</tr>
			<tr>
				<td>Connector Image</td>
				<td><input type="file" class="cw_input" name="con_img" id="con_img" accept="image/*" /></td>
			</tr>
			<tr>
				<td>Available</td>
				<td><input type="checkbox" class="cw_input" name="con_status" id="con_status" /></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="submit" class="button button-primary button-large" name="submit" id="submit" value="Add Cable" /></td>
			</tr>
		</table>
	</form>
</div>
