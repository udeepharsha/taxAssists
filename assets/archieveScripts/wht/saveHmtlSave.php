<?php
	// Start the buffering //
	ob_start();
	
	?>

	<?php
		$monthCovered = $_POST['monthCovered'];
		$year = $_POST['year'];
		$taxNo = $_POST['taxNo'];
		$firsTaxOffice = $_POST['firsTaxOffice'];
		$stateTaxFillingOffice = $_POST['stateTaxFillingOffice'];
		$taxStationCode = $_POST['taxStationCode'];
		$table1 = $_POST['table1'];
		$table2 = $_POST['table2'];
	?>

	<style type="text/css">
		table, th, td{
			text-align: left;
		}
	</style>
	
	<table border="1">
		<tr>
			<th>Month covered:</th>
			<th>Year:</th>
			<th>Tax Identification No.</th>
			<th>FIRS tax filing office</th>
			<th>State tax filing office (If applicable)</th>
			<th>Tax station code (For state if applicable)</th>
		</tr>

		<tr>
			<td><?php echo $monthCovered; ?></td>
			<td><?php echo $year; ?></td>
			<td><?php echo $taxNo; ?></td>
			<td><?php echo $firsTaxOffice; ?></td>
			<td><?php echo $stateTaxFillingOffice; ?></td>
			<td><?php echo $taxStationCode; ?></td>
		</tr>
	</table>

	<?php

	echo "<br/><br/>For suppliers of services<br/>";

	echo $table1;
	
	if(!empty($table2)){

	echo "<br/><br/>For suppliers of goods<br/>";

	echo $table2;
	}

?>
	<br/><br/>

	<button onclick="printPage()">Print Results</button>

	<script>
		function printPage(){
		    window.print();
		}
	</script>
<?php
	
	$rand = rand(900000, 100000000000000000000);
	$docName = $rand.".php";

	// Get the content that is in the buffer and put it in your file //
	if(file_put_contents('../../files/'.$docName, ob_get_contents())){
		echo "#".$docName;
	}
?>