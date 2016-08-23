<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this -> load -> library(array('session'));
		$this -> load -> library('upload');
		$this -> load -> helper(array('url'));
		$this -> load -> model('home_model');
	}

	public function index()
	{
		$data['vat_data'] = $this->home_model->loadVatData();
		$this->load->view('home/vat' , $data);
	}

	public function spoolReports()
	{
		$this->load->view('home/spool-reports');
	}

	public function assistMe()
	{
		$this->load->view('home/assist-me');
	}

	public function logOut()
	{
		$data = new stdClass();
		if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {

			foreach ($_SESSION as $key => $value) {
				unset($_SESSION[$key]);
			}
			redirect(base_url());

		} else {
			redirect(base_url());
		}
	}

	public function submitVat()
	{

		if (isset($_POST['save'])) {
			$datau['month_under_review'] = $this->input->post('monthUnderReview');
			$datau['year_under_review'] = $this->input->post('yearUnderReview');
			$datau['tax_no'] = $this->input->post('taxNo');
			$datau['vat_no'] = $this->input->post('vatNo');
			$datau['firs_tax_office'] = $this->input->post('firsTaxOffice');
			$datau['output_sales_income'] = $this->input->post('outputSalesIncome');
			$datau['exempted_zero'] = $this->input->post('exemptedZero');
			$datau['total_supplies_vat'] = $this->input->post('totalSuppliesVat');
			$datau['output_vat'] = $this->input->post('outputVat');
			$datau['vat_on_local_supplies'] = $this->input->post('vatOnLocalSupplies');
			$datau['vat_on_imported_goods'] = $this->input->post('vatOnImportedGoods');
			$datau['vat_on_subcontracted'] = $this->input->post('vatOnSubcontracted');
			$datau['total_input_tax_claimable'] = $this->input->post('totalInputTaxClaimable');
			$datau['excess_input_vat'] = $this->input->post('excessInputVat');
			$datau['vat_payable_for_month'] = $this->input->post('vatPayableForMonth');
			$datau['authorized_signatory'] = $this->input->post('authorizedSignatory');
			$datau['designation'] = $this->input->post('designation');
			$datau['signature'] = $this->input->post('signature');
			$datau['company_stamp_and_date'] = $this->input->post('companyStampAndDate');
			$datau['user_id'] = $this->session->userdata('user_id');
			echo $this->home_model->submitVat($datau);
		}
	}

	public function saveHtmlSave(){

		// Start the buffering //
		ob_start();
		
		?>

		<?php
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

		<h2>VAT Report</h2><br/>

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

		<br/><br/>

		<button onclick="printPage()">Print Results</button>

		<script>
			function printPage(){
			    window.print();
			}
		</script>
		
		<?php

		$rand = rand(90, 1000000);
		$docName = $rand.".php";

		// Get the content that is in the buffer and put it in your file //
		if(file_put_contents('files/'.$docName, ob_get_contents())){
			echo "#".$docName;
		}
	}

	public function archiveForMonth(){
		if (isset($_POST['archive'])) {
			$datas['month_under_review'] = $this->input->post('monthUnderReview');
			$datas['year_under_review'] = $this->input->post('yearUnderReview');
			$datas['tax_no'] = $this->input->post('taxNo');
			$datas['vat_no'] = $this->input->post('vatNo');
			$datas['firs_tax_office'] = $this->input->post('firsTaxOffice');
			$datas['output_sales_income'] = $this->input->post('outputSalesIncome');
			$datas['exempted_zero'] = $this->input->post('exemptedZero');
			$datas['total_supplies_vat'] = $this->input->post('totalSuppliesVat');
			$datas['output_vat'] = $this->input->post('outputVat');
			$datas['vat_on_local_supplies'] = $this->input->post('vatOnLocalSupplies');
			$datas['vat_on_imported_goods'] = $this->input->post('vatOnImportedGoods');
			$datas['vat_on_subcontracted'] = $this->input->post('vatOnSubcontracted');
			$datas['total_input_tax_claimable'] = $this->input->post('totalInputTaxClaimable');
			$datas['excess_input_vat'] = $this->input->post('excessInputVat');
			$datas['vat_payable_for_month'] = $this->input->post('vatPayableForMonth');
			$datas['authorized_signatory'] = $this->input->post('authorizedSignatory');
			$datas['designation'] = $this->input->post('designation');
			$datas['signature'] = $this->input->post('signature');
			$datas['company_stamp_and_date'] = $this->input->post('companyStampAndDate');
			$datas['user_id'] = $this->session->userdata('user_id');
			echo $this->home_model->archiveForMonth($datas);
		}
	}

	public function saveHtml(){
		// Start the buffering //
		ob_start();
		
		?>

		<?php
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

		<h2>VAT Report</h2><br/>

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

		$rand = rand(90, 10000);
		$docName = $rand.".php";

		// Get the content that is in the buffer and put it in your file //
		if(file_put_contents('files/'.$docName, ob_get_contents())){
			echo "#".$docName;
		}
	}

	public function saveHtmlEmail(){
		// Start the buffering //
		ob_start();
		
		?>

		<?php
			$name = "TaxAssist";
			$userEmail = $this->session->userdata('email');
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

		$rand = rand(900, 1000000);
		$docName = $rand.".php";

		// Get the content that is in the buffer and put it in your file //
		if(file_put_contents('files/'.$docName, ob_get_contents())){    
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


		    $this->load->library('email'); 
			$this->email->from($name, 'TaxAssist');

			$this->email->to($sendto);
			$this->email->subject($subject);

			$this->email->message($msg); 

		    if($this->email->send()){
		    	echo "#".$docName;
		    }

		}
	}

	public function loadReports(){
		echo $this->home_model->loadReports();
	}

	public function assistMeProcess(){
		$hiddenValue = @$_POST['hiddenValue'];
		$userEmail = $this->session->userdata('email');
		$type = @$_POST['type'];

		$array = explode("#", $hiddenValue);

		$sendto = 'taxassist@vi-m.com';
		$sendto1 = 'taxassist2@vi-m.com';
		
		$name = "TaxAssist";

	    $subject  = "Assist Me: ".$name;
	    $headers  = "From: " . strip_tags($name) . "\r\n";
	    $headers .= "Reply-To: ". strip_tags($name) . "\r\n";
	    $headers .= "MIME-Version: 1.0\r\n";
	    $headers .= "Content-Type: text/html;charset=utf-8 \r\n";

	    $msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	    $msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Assist Me - ".$type."</h2>\r\n";
	    $msg .= "<p><strong>User Email: </strong>".$userEmail."</p>\r\n\r";
	    $msg .= "<p><strong>Looking for assistance: </strong></p>\r\n\r";

	    for ($i=0; $i < sizeof($array)-1; $i++) {
	    	$var = $array[$i];

	    	$msg .= "<p>".($i+1)."] ".$var."</p>\r\n";
	    }

	    $msg .= "</body></html>";


	    $this->load->library('email'); 

		$this->email->from($name, 'TaxAssist');
		$this->email->to($sendto);
		$this->email->subject($subject);
		$this->email->message($msg); 


	    if($this->email->send()) {
	    	$this->email->from($name, 'TaxAssist');
			$this->email->to($sendto1);
			$this->email->subject($subject);
			$this->email->message($msg); 
	        echo "true";
	    }
	}

}
