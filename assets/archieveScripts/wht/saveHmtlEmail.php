<?php
	// Start the buffering //
	ob_start();
	
	?>

	<?php
		$name = "TaxAssist";
		$userEmail = $_POST['userEmail'];
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

	echo "<br/><br/>For suppliers of goods<br/>";

	echo $table2;

	$rand = rand(900000, 100000000000000000000);
	$docName = $rand.".php";

	// Get the content that is in the buffer and put it in your file //
	if(file_put_contents('../../files/'.$docName, ob_get_contents())){    
	    $sendto   = $userEmail;
	    $downloadLink = "http://vi-mtaxassist.com/files/".$docName;

	    $subject  = "WHT Calculation Form: ".$name;
	    $headers  = "From: " . strip_tags($name) . "\r\n";
	    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
	    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

	    $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	    $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>WHT Calculation Form</h2>\r\n";
	    $msg .= "<p><strong>User Email: </strong> ".$userEmail."</p>\r\n\r";
	    $msg .= "<p><a href='".$downloadLink."' target='_blank'><strong>View my calculation results!</strong></a></p>\r\n";
	    $msg .= "</body></html>";


	    if(@mail($sendto, $subject, $msg, $headers)) {
	        echo "#".$docName;
	    }
	}
?>