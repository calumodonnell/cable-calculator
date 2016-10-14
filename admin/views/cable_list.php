<?php
// @author calum o'donnell

// database functions
global $wpdb;

// page title
$title = __('Cable List');

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

// if statement for different cable results based on url parameters
if (isset($_REQUEST['orderby']) && $_REQUEST['order'] == 'asc' ) :
	$sql = "SELECT * FROM cw_cable_list ORDER BY " . $_REQUEST['orderby'] . " ASC";
elseif (isset($_REQUEST['orderby']) && $_REQUEST['order'] == 'desc' ) :
	$sql = "SELECT * FROM cw_cable_list ORDER BY " . $_REQUEST['orderby'] . " DESC";
elseif (isset($_REQUEST['s'])) :
	$search = $_REQUEST['s'];
	$sql = "SELECT * FROM cw_cable_list WHERE name LIKE '%$search%' OR part_no LIKE '%$search%' OR max_freq LIKE '%$search%' OR diameter LIKE '%$search%'";
else :
	$sql = "SELECT * FROM cw_cable_list ORDER BY name ASC";
endif;

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
		<a class="page-title-action" title="Add New" href="<?php echo admin_url( 'admin.php?page=add-cable')?>">Add New</a>
		<?php
			// if s url parameter available, show search query
			if (isset($_REQUEST['s'])) :
				echo "<span class='subtitle'>Search results for '" . $_REQUEST['s'] . "'</span>";
			endif;
		?>
	</h1>
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
	<h2 class="screen-reader-text">Filter Cables</h2>
	<div class="tablenav top">
		<form id="cable-filter" method="get" action="admin.php">
			<input type="hidden" name="page" value="cable-wizard" />
			<p class="search-box">
				<label class="screen-reader-text" for="cable-search-input">Search:</label>
				<input type="search" id="cable-search-input" name="s">
				<input type="submit" id="search-submit" class="button" value="Search">
			</p>
		</form>
	</div>
	<h2 class="screen-reader-text">Cables list</h2>
	<table class="wp-list-table widefat fixed striped posts">
		<thead>
			<tr>
				<th scope="col" id="name" class="manage-column column-name column-primary <?php if (isset($_REQUEST['orderby']) && $_REQUEST['orderby'] == 'name'): echo "sorted"; else : echo 'sortable'; endif; ?> <?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=cable-wizard&orderby=name&order=<?php if (isset($_REQUEST['orderby']) && $_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Cable Name</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="part_no" class="manage-column column-part-no <?php if (isset($_REQUEST['part_no']) && $_REQUEST['orderby'] == 'part_no'): echo "sorted"; else : echo 'sortable'; endif; ?> <?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=cable-wizard&orderby=part_no&order=<?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Part No</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="max_freq" class="manage-column column-max-freq <?php if (isset($_REQUEST['orderby']) && $_REQUEST['orderby'] == 'max_freq'): echo "sorted"; else : echo 'sortable'; endif; ?> <?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=cable-wizard&orderby=max_freq&order=<?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Max Frequency (GHz)</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
        <th scope="col" id="date_modified" class="manage-column column-date-modified <?php if (isset($_REQUEST['orderby']) && $_REQUEST['orderby'] == 'date_modified'): echo "sorted"; else : echo 'sortable'; endif; ?> <?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=cable-wizard&orderby=date_modified&order=<?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Date</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
        <th scope="col" id="available" class="manage-column column-available <?php if (isset($_REQUEST['orderby']) && $_REQUEST['orderby'] == 'available'): echo "sorted"; else : echo 'sortable'; endif; ?> <?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=cable-wizard&orderby=available&order=<?php if (isset($_REQUEST['order']) && $_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Available</span>
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
							<td><?php echo stripslashes($cable->name); ?>
								<div class="row-actions">
									<span class="edit">
										<a title="Edit this item" href="<?php echo admin_url( 'admin.php?page=add-cable&amp;action=edit&amp;cable_id=' . $cable->id)?>">Edit</a>
									</span> |
									<span class="delete">
										<a title="Delete this item" href="<?php echo admin_url( 'admin.php?page=add-cable&amp;action=delete&amp;cable_id=' . $cable->id)?>">Delete</a>
									</span>
								</div>
							</td>
							<td><?php echo stripslashes($cable->part_no); ?></td>
							<td><?php echo stripslashes($cable->max_freq); ?></td>
              <td>Modified<br>
                <?php
                  $var = stripslashes($cable->date_modified);
                  echo date("m/d/Y", strtotime($var));
                ?>
              </td>
              <td>
								<?php
									// display yes or no depending on availability
									if ($cable->available === 'on') :
										echo "Yes";
									else :
										echo "No";
									endif;
								?>
							</td>
						</tr>
						<?php
					endforeach;
				else :
					echo '<tr><td colspan="6" align="center"><strong>' . __('No entries found') . '</strong></td></tr>';
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
