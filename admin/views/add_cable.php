<?php
// @author Calum O'Donnell

if(preg_match('#' . basename(__FILE__) . '#', $_SERVER['PHP_SELF']))
	die('You are not allowed to call this page directly.');

$title = __('Add New Cable');

global $wpdb;

$sql = "SELECT * FROM cw_connector_list ORDER BY con_part_no ASC";
$connector_list = $wpdb->get_results($sql);
?>

<div class="wrap">
	<h1><?php echo esc_html( $title ); ?></h1>
	<p>Fields marked with an * are required</p>
	<form name="add_cable" id="add_cable" action="<?php echo admin_url('admin.php?page=add-cable&amp;action=add'); ?>" method="post" enctype="multipart/form-data">
		<table cellspacing="5">
			<tr>
				<td width="150">Cable Name *</td>
				<td><input type="text" class="cw_input" name="name" id="name"/></td>
			</tr>
			<tr>
				<td>Part No *</td>
				<td><input type="text" class="cw_input" name="part_no" id="part_no"></td>
			</tr>
			<tr>
				<td>Max. Frequency *</td>
				<td><input type="text" class="cw_input" name="max_freq" id="max_freq"> GHz</td>
			</tr>
			<tr>
				<td>Diameter *</td>
				<td><input type="text" class="cw_input" name="diameter" id="diameter"> in</td>
				<td></td>
			</tr>
			<tr>
				<td>Min. Bend *</td>
				<td><input type="text" class="cw_input" name="min_bend" id="min_bend"> in</td>
			</tr>
			<tr>
				<td>Typical Attenuation K1 *</td>
				<td><input type="text" class="cw_input" name="typ_atten_k1" id="typ_atten_k1"></td>
			</tr>
			<tr>
				<td>Typical Attenuation K2 *</td>
				<td><input type="text" class="cw_input" name="typ_atten_k2" id="typ_atten_k2"></td>
			</tr>
			<tr>
				<td>Outdoor *</td>
				<td><input type="checkbox" class="cw_input" name="outdoor" id="outdoor"></td>
			</tr>
			<tr>
				<td>Indoor *</td>
				<td><input type="checkbox" class="cw_input" name="indoor" id="indoor"></td>
			</tr>
			<tr>
				<td>Test *</td>
				<td><input type="checkbox" class="cw_input" name="test" id="test"></td>
			</tr>
			<tr id="price_select">
				<td>Price *</td>
				<td>
					<select class = "cw_input" name ="price" id="price">
						<option value=''></option>
						<option value='Premium'>Premium</option>
						<option value='Moderate'>Moderate</option>
						<option value='Economy'>Economy</option>
					</select>
				</td>
			</tr>
			<tr id="flex_select">
				<td>Flex *</td>
				<td>
					<select class = "cw_input" name ="flex" id="flex">
						<option value=''></option>
						<option value='Good'>Good</option>
						<option value='Fair'>Fair</option>
						<option value='Poor'>Poor</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>Cable Image</td>
				<td><input type="file" class="cw_input" name="cable_img" id="cable_img" accept="image/*"></td>
			</tr>
			<tr>
				<td>Available?</td>
				<td><input type="checkbox" class="cw_input" name="available" id="available"></td>
			</tr>
			<tr>
				<td>
					<h2>Cable Pricing</h2>
				</td>
			</tr>
			<tr>
				<td>Margin Rate *</td>
				<td><input type="text" class="cw_input" name="margin_rate" id="margin_rate"/></td>
			</tr>
			<tr>
				<td>Hourly Labor Rate *</td>
				<td><input type="text" class="cw_input" name="hour_lab_rate" id="hour_lab_rate"/></td>
			</tr>
			<tr>
				<td>Overhead Rate *</td>
				<td><input type="text" class="cw_input" name="overhead_rate" id="overhead_rate"/></td>
			</tr>
			<tr>
				<td>Ship Handling *</td>
				<td><input type="text" class="cw_input" name="ship_handling" id="ship_handling"/></td>
			</tr>
			<tr>
				<td>QM1 *</td>
				<td><input type="text" class="cw_input" name="qm1" id="qm1"/>
				</td>
			</tr>
			<tr>
				<td>QM2 *</td>
				<td><input type="text" class="cw_input" name="qm2" id="qm2"/></td>
			</tr>
			<tr>
				<td>QM3 *</td>
				<td><input type="text" class="cw_input" name="qm3" id="qm3"/></td>
			</tr>
			<tr>
				<td>QM4 *</td>
				<td><input type="text" class="cw_input" name="qm4" id="qm4"/></td>
			</tr>
			<tr>
				<td>QM5 *</td>
				<td><input type="text" class="cw_input" name="qm5" id="qm5"/></td>
			</tr>
			<tr>
				<td>QM6 *</td>
				<td><input type="text" class="cw_input" name="qm6" id="qm6"/></td>
			</tr>
			<tr>
				<td>QM7 *</td>
				<td><input type="text" class="cw_input" name="qm7" id="qm7"/></td>
			</tr>
			<tr>
				<td>QM8 *</td>
				<td><input type="text" class="cw_input" name="qm8" id="qm8"/></td>
			</tr>
			<tr>
				<td>
						<h2>Cable Coating Pricing</h2>
				</td>
			</tr>
			<tr>
				<td>
						<b>None</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_n_cable_base" id="coat_n_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_n_adder_back" id="coat_n_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_n_base" id="coat_n_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_n_adder_base_time" id="coat_n_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_n_time_rp" id="coat_n_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Weatherized</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_w_cable_base" id="coat_w_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_w_adder_back" id="coat_w_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_w_base" id="coat_w_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_w_adder_base_time" id="coat_w_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_w_time_rp" id="coat_w_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Thermal Vaccum</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_tv_cable_base" id="coat_tv_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_tv_adder_back" id="coat_tv_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_tv_base" id="coat_tv_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_tv_adder_base_time" id="coat_tv_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_tv_time_rp" id="coat_tv_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Armor</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_a_cable_base" id="coat_a_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_a_adder_back" id="coat_a_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_a_base" id="coat_a_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_a_adder_base_time" id="coat_a_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_a_time_rp" id="coat_a_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Armorized/Weatherized Jacket</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_aw_cable_base" id="coat_aw_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_aw_adder_back" id="coat_aw_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_aw_base" id="coat_aw_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_aw_adder_base_time" id="coat_aw_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_aw_time_rp" id="coat_aw_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Armor/Neoprene Jacket</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_an_cable_base" id="coat_an_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_an_adder_back" id="coat_an_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_an_base" id="coat_an_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_an_adder_base_time" id="coat_an_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_an_time_rp" id="coat_an_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Extended Jacket</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_ej_cable_base" id="coat_ej_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_ej_adder_back" id="coat_ej_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_ej_base" id="coat_ej_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_ej_adder_base_time" id="coat_ej_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_ej_time_rp" id="coat_ej_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Extended Boots/Weatherized</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_ew_cable_base" id="coat_ew_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_ew_adder_back" id="coat_ew_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_ew_base" id="coat_ew_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_ew_adder_base_time" id="coat_ew_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_ew_time_rp" id="coat_ew_time_rp"/></td>
			</tr>
			<tr>
				<td>
						<b>Monocoil</b>
				</td>
			</tr>
			<tr>
				<td>Cable Base</td>
				<td><input type="text" class="cw_input" name="coat_mc_cable_base" id="coat_mc_cable_base"/></td>
			</tr>
			<tr>
				<td>Adder Back</td>
				<td><input type="text" class="cw_input" name="coat_mc_adder_back" id="coat_mc_adder_back"/></td>
			</tr>
			<tr>
				<td>Base</td>
				<td><input type="text" class="cw_input" name="coat_mc_base" id="coat_mc_base"/></td>
			</tr>
			<tr>
				<td>Adder Base Time</td>
				<td><input type="text" class="cw_input" name="coat_mc_adder_base_time" id="coat_mc_adder_base_time"/></td>
			</tr>
			<tr>
				<td>Time R/P</td>
				<td><input type="text" class="cw_input" name="coat_mc_time_rp" id="coat_mc_time_rp"/></td>
			</tr>
			<tr>
				<td>
					<h2>Connector Pricing</h2>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<p>A connector must be listed on the Connector List before a price can be set to it.</p>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<table class="input_fields_wrap">
						<tr>
							<td width="150">Connectors</td>
							<td>Part No</td>
							<td>Price</td>
						</tr>
						<tr class='connector_field'>
							<td></td>
							<td>
								<select class = "cw_input" name ="connector_part[]" id="connector">
									<option value=""></option>
									<?php
										if($connector_list) {
											foreach($connector_list as $connector) {
												echo "<option value='" . stripslashes($connector->id) . "'>" . stripslashes($connector->con_part_no) . "</option>";
											}
										}
									?>
								</select>
							</td>
							<td>$ <input type="text" class="cw_input" name="connector_price[]" id="connector_price"/></td>
							<td><a href="" class="add_field button button-secondary button-large">+</a></td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td></td>
				<td><input type="submit" class="button button-primary button-large" name="submit" id="submit" value="Add Cable" /></td>
			</tr>
		</table>
	</form>
</div>
<script>
	jQuery(document).ready(function () {
		"use strict";

		jQuery(document).on('click', ".add_field", function (e) {
				e.preventDefault();
				jQuery(".input_fields_wrap").append("<tr class='connector_field'><td></td><td><select class='cw_input' name='connector_part[]' id='connector'><option value=''></option><?php if($connector_list){foreach($connector_list as $connector){echo "<option value='" . stripslashes($connector->id) . "'>" . stripslashes($connector->con_part_no) . "</option>";}}?></select></td><td>$ <input type='text' class='cw_input' name='connector_price[]' id='connector_price'/></td><td><a href='' class='remove_field button button-secondary button-large'>x</a></td></tr>");
				return false;
		});

		jQuery(document).on('click', ".remove_field", function (e) {
				e.preventDefault();
				jQuery(this).parents('.connector_field').remove();
				return false;
		});
	});
</script>
