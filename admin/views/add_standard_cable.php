<?php
// @author Calum O'Donnell

	$title = __('Add New Cable');

	global $wpdb;

	$connector_sql = "SELECT con_part_no FROM cw_connector_list ORDER BY con_part_no ASC";
	$connectors = $wpdb->get_results($connector_sql);

  $cable_sql = "SELECT name, part_no FROM cw_cable_list ORDER BY name ASC";
  $cables = $wpdb->get_results($cable_sql);
?>

<div class="wrap">
	<h1><?php echo esc_html( $title ); ?></h1>
	<p>Fields marked with an * are required</p>
	<form name="add_cable" id="add_cable" action="<?php echo admin_url('admin.php?page=add-standard-cable&amp;action=add'); ?>" method="post" enctype="multipart/form-data">
		<table>
      <tr>
				<td>Cable Part *</td>
				<td>
          <select class='cw_input' name='part_no' id='part_no' required>
            <option value=''>&nbsp;</option>
            <?php
              if($cables) {
                foreach($cables as $cable) {
                  echo "<option value='" . stripslashes($cable->part_no) . "'>" . stripslashes($cable->name) . "</option>";
                }
              }
            ?>
          </select>
				</td>
			</tr>
      <tr>
				<td>Connnector 1 *</td>
				<td>
          <select class='cw_input' name='conn_1' id='conn_1' required>
            <option value=''>&nbsp;</option>
            <?php
              if($connectors) {
                foreach($connectors as $connector) {
                  echo "<option value='" . stripslashes($connector->con_part_no) . "'>" . stripslashes($connector->con_part_no) . "</option>";
                }
              }
            ?>
          </select>
				</td>
			</tr>
      <tr>
				<td>Connnector 2 *</td>
				<td>
          <select class='cw_input' name='conn_2' id='conn_2' required>
            <option value=''>&nbsp;</option>
            <?php
              if($connectors) {
                foreach($connectors as $connector) {
                  echo "<option value='" . stripslashes($connector->con_part_no) . "'>" . stripslashes($connector->con_part_no) . "</option>";
                }
              }
            ?>
          </select>
				</td>
			</tr>
			<tr>
				<td>Cable Length (in) *</td>
				<td><input type="text" class="cw_input" name="length" id="length" required /></td>
			</tr>
			<tr>
				<td></td>
				<td><input type="submit" class="button button-primary button-large" name="submit" id="submit" value="Add Cable" /></td>
			</tr>
		</table>
	</form>
</div>
