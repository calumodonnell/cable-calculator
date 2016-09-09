<?php
/*
@author Calum O'Donnell
*/

if(preg_match('#' . basename(__FILE__) . '#', $_SERVER['PHP_SELF']))
	die('You are not allowed to call this page directly.');

$title = __('Default Settings');

global $wpdb;

$sql = "SELECT * FROM cw_default_settings WHERE id='1' LIMIT 1";
$default = $wpdb->get_results($sql,'ARRAY_A');
?>

<div class="wrap">
	<?php if(isset($_SESSION['edited'])) : ?>
		<div class="update-nag notice">
			<p>
				<?php
					echo $_SESSION['edited'];
					unset($_SESSION['edited']);
				?>
			</p>
		</div>
	<?php endif; ?>
	<?php if(isset($_SESSION['added'])) : ?>
		<div class="updated notice">
			<p>
				<?php
					echo $_SESSION['added'];
					unset($_SESSION['added']);
				?>
			</p>
		</div>
	<?php endif; ?>
	<h2><?php echo esc_html( $title ); ?></h2>
	<p>Fields marked with an * are required</p>
	<form name="default-settings" id="default-settings" action="<?php echo admin_url('admin.php?page=default-settings&amp;action=add'); ?>" method="post" enctype="multipart/form-data">
		<table cellspacing="5">
			<tr>
				<td width="150">Material Yield *</td>
				<td>
          <input type="hidden" class="cw_input" name="default_id" id="default_id" value="<?php echo stripslashes($default[0]['id']); ?>"/>
					<input type="text" class="cw_input" name="material_yield" id="material_yield" value="<?php echo stripslashes($default[0]['material_yield']); ?>"/>
				</td>
			</tr>
			<tr>
				<td></td>
				<td><input type="submit" class="button button-primary button-large" name="submit" id="submit" value="Save" /></td>
			</tr>
		</table>
	</form>
</div>
