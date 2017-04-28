<?php
// @author calum o'donnell

// database functions
global $wpdb;

// page title
$title = __('Standard Cable List');

// get page no from url
if(isset($_GET['pg'])) :
    $p =$_GET['pg'];
else :
    $p = 1;
endif;

$max = 10;
$limit = ($p - 1) * $max;
$prev = $p - 1;
$next = $p + 1;
$limits = (int)($p - 1) * $max;

$sql = "SELECT * FROM cw_standard_cable_list ORDER BY part_no ASC";

// query sql statement to get results
$query = $sql . " LIMIT $limits, $max";
$cable_list = $wpdb->get_results($query);

// get total no results
$query = $wpdb->get_results($sql);
$total_cables = $wpdb->num_rows;

$total_posts = ceil($total_cables / $max);
$lpm1 = $total_posts - 1;
?>

<div class="wrap">
	<h1>
		<?php echo esc_html( $title ); ?>
		<a class="page-title-action" title="Add New" href="<?php echo admin_url( 'admin.php?page=add-standard-cable')?>">Add New</a>
		<?php
			// if s url parameter available, show search query
			if (isset($_REQUEST['s'])) :
				echo "<span class='subtitle'>Search results for '" . $_REQUEST['s'] . "'</span>";
			endif;
		?>
	</h1>
	<?php if(isset($_SESSION['deleted'])) : ?>
		<div class="error notice">
			<p>
				<?php
					echo $_SESSION['deleted'];
					unset($_SESSION['deleted']);
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
	<h2 class="screen-reader-text">Standard Cables List</h2>
	<table class="wp-list-table widefat fixed striped posts">
		<thead>
			<tr>
				<th scope="col" id="name" class="manage-column column-name column-primary <?php if (isset($_REQUEST['orderby']) && $_REQUEST['orderby'] == 'name'): echo "sorted"; else : echo 'sortable'; endif; ?> <?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="#">
						<span>Part Number</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
			</tr>
		</thead>
		<tbody id="the-list">
			<?php
				// if $cable_list true then display results else show no entries found
				if($cable_list) :
					// foreach cable in the cable list display data
					foreach($cable_list as $cable) :
						// start row with cable data
						?>
						<tr id="cable-<?php echo $cable->id; ?>" class="iedit author-self level-0 post-<?php echo $cable->id; ?> type-post available-publish format-standard hentry category-uncategorised">
							<td><?php echo stripslashes($cable->conn_1) . "-" . stripslashes($cable->part_no) . "-" . number_format(stripslashes($cable->length), 1) . "-" . stripslashes($cable->conn_2); ?>
								<div class="row-actions">
									<span class="delete">
										<a title="Delete this item" href="<?php echo admin_url( 'admin.php?page=add-standard-cable&amp;action=delete&amp;standard_id=' . $cable->id)?>">Delete</a>
									</span>
								</div>
							</td>
						</tr>
						<?php
					endforeach;
				else :
					echo '<tr><td colspan="1" align="center"><strong>' . __('No entries found') . '</strong></td></tr>';
				endif;
			?>
		</tbody>
	</table>
	<div class="tablenav bottom">
		<div class="tablenav-pages">
			<span class="displaying-num"><?php echo $total_cables; ?> items</span>
			<span class="pagination-links">
				<?php
					if ( $total_cables > $max ) :
						echo pagination('cable-wizard', $total_cables, $total_posts, $p, $lpm1, $prev, $next);
					endif;
				?>
			</span>
		</div>
	</div>
</div>
