<?php
	// Start the buffering //
	ob_start();
	
	?>

	<?php
		$name = "TaxAssist";
		$userEmail = $_POST['userEmail'];
		$monthUnderReview = $_POST['monthUnderReview'];
		$yearUnderReview = $_POST['yearUnderReview'];
		$taxNo = $_POST['taxNo'];
		$vatNo = $_POST['vatNo'];
		$firsTaxOffice = $_POST['firsTaxOffice'];
		$outputSalesIncome = $_POST['outputSalesIncome'];
		$exemptedZero = $_POST['exemptedZero'];
		$totalSuppliesVat = $_POST['totalSuppliesVat'];
		$outputVat = $_POST['outputVat'];
		$vatOnLocalSupplies = $_POST['vatOnLocalSupplies'];
		$vatOnImportedGoods = $_POST['vatOnImportedGoods'];
		$vatOnSubcontracted = $_POST['vatOnSubcontracted'];
		$totalInputTaxClaimable = $_POST['totalInputTaxClaimable'];
		$excessInputVat = $_POST['excessInputVat'];
		$vatPayableForMonth = $_POST['vatPayableForMonth'];
		$authorizedSignatory = $_POST['authorizedSignatory'];
		$designation = $_POST['designation'];
		$signature = $_POST['signature'];
		$companyStampAndDate = $_POST['companyStampAndDate'];
	?>

	<style type="text/css">
		table, th, td{
			text-align: left;
		}
	</style>
	
	<table border="1">
		<tr>
			<th>Month under review1</th>
			<td><?php echo $monthUnderReview; ?></td>
		</tr>

		<tr>
			<th>Year under review</th>
			<td><?php echo $yearUnderReview; ?></td>
		</tr>

		<tr>
			<th>Tax Identification No.</th>
			<td><?php echo $taxNo; ?></td>
		</tr>

		<tr>
			<th>Vat No.</th>
			<td><?php echo $vatNo; ?></td>
		</tr>

		<tr>
			<th>Firs Tax Office</th>
			<td><?php echo $firsTaxOffice; ?></td>
		</tr>

		<tr>
			<th>Sales / Income for the month on all goods and services sold</th>
			<td><?php echo $outputSalesIncome; ?></td>
		</tr>

		<tr>
			<th>Exempted / Zero rated sales:</th>
			<td><?php echo $exemptedZero; ?></td>
		</tr>

		<tr>
			<th>Total supplies subject to VAT</th>
			<td><?php echo $totalSuppliesVat; ?></td>
		</tr>

		<tr>
			<th>Output VAT for the Month</th>
			<td><?php echo $outputVat; ?></td>
		</tr>

		<tr>
			<th>VAT paid on local supplies</th>
			<td><?php echo $vatOnLocalSupplies; ?></td>
		</tr>

		<tr>
			<th>VAT paid on imported goods</th>
			<td><?php echo $vatOnImportedGoods; ?></td>
		</tr>

		<tr>
			<th>VAT paid on subcontracted services</th>
			<td><?php echo $vatOnSubcontracted; ?></td>
		</tr>

		<tr>
			<th>Total input Tax claimable</th>
			<td><?php echo $totalInputTaxClaimable; ?></td>
		</tr>

		<tr>
			<th>Excess input VAT brought forward from previous month</th>
			<td><?php echo $excessInputVat; ?></td>
		</tr>

		<tr>
			<th>VAT payable for the month</th>
			<td><?php echo $vatPayableForMonth; ?></td>
		</tr>

		<tr>
			<th>Authorized Signatory</th>
			<td><?php echo $authorizedSignatory; ?></td>
		</tr>

		<tr>
			<th>Designation</th>
			<td><?php echo $designation; ?></td>
		</tr>

		<tr>
			<th>Signature</th>
			<td><?php echo $signature; ?></td>
		</tr>

		<tr>
			<th>Company stamp and date</th>
			<td><?php echo $companyStampAndDate; ?></td>
		</tr>
	</table>

	<?php

	$rand = rand(900000, 100000000000000000000);
	$docName = $rand.".php";

	// Get the content that is in the buffer and put it in your file //
	if(file_put_contents('../../files/'.$docName, ob_get_contents())){    
	    $sendto   = $userEmail;
	    $downloadLink = "http://vi-mtaxassist.com/files/".$docName;

	    $subject  = "VAT Calculation Form: ".$name;
	    $headers  = "From: " . strip_tags($name) . "\r\n";
	    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
	    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

	    $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	    $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>VAT Calculation Form</h2>\r\n";
	    $msg .= "<p><strong>User Email: </strong> ".$userEmail."</p>\r\n\r";
	    $msg .= "<p><a href='".$downloadLink."' target='_blank'><strong>View my calculation results!</strong></a></p>\r\n";
	    $msg .= "</body></html>";


	    if(@mail($sendto, $subject, $msg, $headers)) {
	        echo "#".$docName;
	    }
	}
?>