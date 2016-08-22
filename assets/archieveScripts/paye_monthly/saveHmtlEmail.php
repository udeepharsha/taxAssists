<?php
	// Start the buffering //
	ob_start();
	
	?>

	<?php
		$name = "TaxAssist";
		$userEmail = $_POST['userEmail'];
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

	echo "<br/><br/>Monthly Values<br/>";

	echo $table;

	$rand = rand(900000, 100000000000000000000);
	$docName = $rand.".php";

	// Get the content that is in the buffer and put it in your file //
	if(file_put_contents('../../files/'.$docName, ob_get_contents())){    
	    $sendto   = $userEmail;
	    $downloadLink = "http://vi-mtaxassist.com/files/".$docName;

	    $subject  = "PAYE Calculation Form: ".$name;
	    $headers  = "From: " . strip_tags($name) . "\r\n";
	    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
	    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

	    $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	    $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>PAYE Calculation Form</h2>\r\n";
	    $msg .= "<p><strong>User Email: </strong> ".$userEmail."</p>\r\n\r";
	    $msg .= "<p><a href='".$downloadLink."' target='_blank'><strong>View my calculation results!</strong></a></p>\r\n";
	    $msg .= "</body></html>";


	    if(@mail($sendto, $subject, $msg, $headers)) {
	        echo "#".$docName;
	    }
	}
?>