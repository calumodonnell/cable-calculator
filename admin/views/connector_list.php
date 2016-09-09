<?php
// @author calum o'donnell

// database functions
global $wpdb;

// page title
$title = __('Connectors List');

// get page no from url
if(isset($_GET['pg'])) :
    $p = $_GET['pg'];
else :
    $p = 1;
endif;

$max = 10;
$limit = ($p - 1) * $max;
$prev = $p - 1;
$next = $p + 1;
$limits = (int)($p - 1) * $max;

// if statement for different connector results based on url parameters
if (isset($_REQUEST['orderby']) && $_REQUEST['order'] == 'asc' ) :
	$sql = "SELECT * FROM cw_connector_list ORDER BY " . $_REQUEST['orderby'] . " ASC";
elseif (isset($_REQUEST['orderby']) && $_REQUEST['order'] == 'desc' ) :
	$sql = "SELECT * FROM cw_connector_list ORDER BY " . $_REQUEST['orderby'] . " DESC";
elseif (isset($_REQUEST['s'])) :
	$search = $_REQUEST['s'];
	$sql = "SELECT * FROM cw_connector_list WHERE con_part_no LIKE '%$search%' OR con_series LIKE '%$search%' OR con_description LIKE '%$search%' OR con_mac_code LIKE '%$search%' OR con_max_freq LIKE '%$search%' OR con_status LIKE '%$search%'";
else :
	$sql = "SELECT * FROM cw_connector_list ORDER BY con_part_no ASC";
endif;

// query sql statement to get results
$query = $sql . " LIMIT $limits, $max";
$connector_list = $wpdb->get_results($query);

// get total no results
$query = $wpdb->get_results($sql);
$total_connectors = $wpdb->num_rows;

$total_posts = ceil($total_connectors / $max);
$lpm1 = $total_posts - 1;
?>

<div class="wrap">
	<h1>
		<?php echo esc_html( $title ); ?>
		<a class="page-title-action" title="Add New" href="<?php echo admin_url( 'admin.php?page=add-connector')?>">Add New</a>
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
	<h2 class="screen-reader-text">Filter Connectors</h2>
	<div class="tablenav top">
		<form id="cable-filter" method="get" action="admin.php">
			<input type="hidden" name="page" value="connector-list" />
			<p class="search-box">
				<label class="screen-reader-text" for="connector-search-input">Search:</label>
				<input type="search" id="connector-search-input" name="s">
				<input type="submit" id="search-submit" class="button" value="Search">
			</p>
		</form>
	</div>
	<h2 class="screen-reader-text">Connectors list</h2>
	<table class="wp-list-table widefat fixed striped posts">
		<thead>
			<tr>
				<th scope="col" id="con_part_no" class="manage-column column-con-part-no column-primary <?php if ($_REQUEST['orderby'] == 'con_part_no'): echo "sorted"; else : echo "sortable"; endif; ?> <?php if ($_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=connector-list&orderby=con_part_no&order=<?php if ($_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Connector Part No</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="con_series" class="manage-column column-con-series <?php if ($_REQUEST['orderby'] == 'con_series'): echo "sorted"; else : echo "sortable"; endif; ?> <?php if ($_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=connector-list&orderby=con_series&order=<?php if ($_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Connector Series</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="con_description" class="manage-column column-con-description <?php if ($_REQUEST['orderby'] == 'con_description'): echo "sorted"; else : echo "sortable"; endif; ?> <?php if ($_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=connector-list&orderby=con_description&order=<?php if ($_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Description</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="con_mac_code" class="manage-column column-con-mac-code <?php if ($_REQUEST['orderby'] == 'con_mac_code'): echo "sorted"; else : echo "sortable"; endif; ?> <?php if ($_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=connector-list&orderby=con_mac_code&order=<?php if ($_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Macola Code</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="con_max_freq" class="manage-column column-max-freq <?php if ($_REQUEST['orderby'] == 'con_max_freq'): echo "sorted"; else : echo "sortable"; endif; ?> <?php if ($_REQUEST['order'] == 'desc'): echo 'desc'; else: echo 'asc'; endif; ?>">
					<a href="./admin.php?page=connector-list&orderby=con_max_freq&order=<?php if ($_REQUEST['order'] == 'desc'): echo 'asc'; else: echo 'desc'; endif; ?>">
						<span>Max Frequency (GHz)</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
				<th scope="col" id="con_status" class="manage-column column-con-status <?php if ($_REQUEST['orderby'] == 'con_status'): echo "sorted"; else : echo "sortable"; endif; ?> <?php if ($_REQUEST['order'] == 'asc'): echo 'asc'; else: echo 'desc'; endif; ?>">
					<a href="./admin.php?page=connector-list&orderby=con_status&order=<?php if ($_REQUEST['order'] == 'asc'): echo 'desc'; else: echo 'asc'; endif; ?>">
						<span>Available (?)</span>
						<span class="sorting-indicator"></span>
					</a>
				</th>
			</tr>
		</thead>
		<tbody id="the-list">
			<?php
				// if $connector_list true then display results else show no entries found
				if($connector_list) :
					// foreach connector in the connector list display data
					foreach($connector_list as $connector) :
						// start row with connector data
						?>
						<tr id="connector-<?php echo $connector->id; ?>" class="iedit author-self level-0 post-<?php echo $cable->id; ?> type-post status-publish format-standard hentry category-uncategorised">
							<td><?php echo stripslashes($connector->con_part_no); ?>
								<div class="row-actions">
									<span class="edit">
										<a title="Edit this item" id="edit-cable" href="<?php echo admin_url( 'admin.php?page=add-connector&amp;action=edit&amp;connectorid=' . $connector->id )?>">Edit</a>
									</span> |
									<span class="delete">
										<a title="Delete this item" id="delete-connector" href="<?php echo admin_url( 'admin.php?page=add-connector&amp;action=delete&amp;connectorid=' . $connector->id )?>">Delete</a>
									</span>
								</div>
							</td>
							<td scope="row"><?php echo stripslashes($connector->con_series); ?></td>
							<td scope="row"><?php echo stripslashes($connector->con_description); ?></td>
							<td scope="row"><?php echo stripslashes($connector->con_mac_code); ?></td>
							<td scope="row"><?php echo stripslashes($connector->con_max_freq); ?></td>
							<td scope="row">
								<?php
									// display yes or no depending on availability
									if ($connector->con_status === 'on') :
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
			<span class="displaying-num"><?php echo $total_connectors; ?> items</span>
			<span class="pagination-links">
				<?php
					if ( $total_connectors > $max ) :
						echo pagination('connector-list', $total_connectors, $total_posts, $p, $lpm1, $prev, $next);
					endif;
				?>
			</span>
		</div>
	</div>
</div>
