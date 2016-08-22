<?php
	// Start the buffering //
	ob_start();
	
	?>

	<?php
		$month = $_POST['month'];
		$year = $_POST['year'];
		$taxNo = $_POST['taxNo'];
		$taxId = $_POST['taxId'];
		$stateBir = $_POST['stateBir'];
		$taxStationCode = $_POST['taxStationCode'];
		$table = $_POST['table'];
	?>

	<style type="text/css">
		table, th, td{
			text-align: left;
		}
	</style>
	
	<table border="1">
		<tr>
			<th>Month</th>
			<th>Year:</th>
			<th>Tax Identification No.</th>
			<th>Tax ID - State Board of Internal Revenue</th>
			<th>State BIR tax station</th>
			<th>Tax station code</th>
		</tr>

		<tr>
			<td><?php echo $month; ?></td>
			<td><?php echo $year; ?></td>
			<td><?php echo $taxNo; ?></td>
			<td><?php echo $taxId; ?></td>
			<td><?php echo $stateBir; ?></td>
			<td><?php echo $taxStationCode; ?></td>
		</tr>
	</table>

	<?php

	echo "<br/><br/><h2>Monthly Values</h2>";

	echo $table;
	
	$rand = rand(900000, 100000000000000000000);
	$docName = $rand.".php";

	// Get the content that is in the buffer and put it in your file //
	if(file_put_contents('../../files/'.$docName, ob_get_contents())){
		echo "#".$docName;
	}
?>