<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Wht extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this -> load -> library(array('session'));
		$this -> load -> library('upload');
		$this -> load -> helper(array('url'));
		$this -> load -> model('wht_model');
	}

	public function index()
	{
		$data['wht_data'] = $this->wht_model->loadWthData();
		$this->load->view('wht/wht' , $data);
	}

	public function individualSuppliers()
	{
		$this->load->view('wht/wht-individual-suppliers');
	}

	public function assistMe()
	{
		$this->load->view('wht/wht-assist-me');
	}

	public function spoolReports()
	{
		$this->load->view('wht/wht-spool-reports');
	}

	public function loadWatReports(){
		echo $this->wht_model->loadWatReports();
	}

	public function loadWatReportsIndividuals(){
		echo $this->wht_model->loadWatReportsIndividuals();
	}

	public function individualSuppliersSubmit(){
		if (isset($_POST['save'])) {
			$datau['month_covered'] = $this->input->post('monthCovered');
			$datau['year'] = $this->input->post('year');
			$datau['tax_no'] = $this->input->post('taxNo');
			$datau['firs_tax_office'] = $this->input->post('firsTaxOffice');
			$datau['state_tax_filling_office'] = $this->input->post('stateTaxFillingOffice');
			$datau['tax_station_code'] = $this->input->post('taxStationCode');
			$datau['suppliers_of_service'] = $this->input->post('suppliersOfService');
			$datau['suppliers_of_goods'] = $this->input->post('suppliersOfGoods');
			$datau['user_id'] = $this->session->userdata('user_id');
			echo $this->wht_model->individualSuppliersSubmit($datau);
		}
	}

	public function submitWht(){

		if (isset($_POST['save'])) {
			$datau['month_covered'] = $this->input->post('monthCovered');
			$datau['year'] = $this->input->post('year');
			$datau['tax_no'] = $this->input->post('taxNo');
			$datau['firs_tax_office'] = $this->input->post('firsTaxOffice');
			$datau['state_tax_filling_office'] = $this->input->post('stateTaxFillingOffice');
			$datau['tax_station_code'] = $this->input->post('taxStationCode');
			$datau['suppliers_of_service'] = $this->input->post('suppliersOfService');
			$datau['suppliers_of_goods'] = $this->input->post('suppliersOfGoods');
			$datau['user_id'] = $this->session->userdata('user_id');
			echo $this->wht_model->submitWht($datau);
		}

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

	public function loadWhtDetails(){
		echo json_encode($this->wht_model->loadWhtDetails());
	}

	public function downloadCorporateExcel(){
		$id = $this->input->post('id');
		echo $this->wht_model->downloadCorporateExcel($id);
	}

	public function downloadIndividualExcel(){
		$id = $this->input->post('id');
		echo $this->wht_model->downloadIndividualExcel($id);
	}

	public function loadWhtIndividualDetails(){
		echo json_encode($this->wht_model->loadWhtIndividualDetails());
	}

	public function archiveForMonth(){
		if (isset($_POST['archive'])) {
			$datau['month_covered'] = $this->input->post('monthCovered');
			$datau['year'] = $this->input->post('year');
			$datau['tax_no'] = $this->input->post('taxNo');
			$datau['firs_tax_office'] = $this->input->post('firsTaxOffice');
			$datau['state_tax_filling_office'] = $this->input->post('stateTaxFillingOffice');
			$datau['tax_station_code'] = $this->input->post('taxStationCode');
			$datau['suppliers_of_service'] = $this->input->post('suppliersOfService');
			$datau['suppliers_of_goods'] = $this->input->post('suppliersOfGoods');
			$datau['user_id'] = $this->session->userdata('user_id');
			$datau['month_archived'] = $datau['month_covered']." ".$datau['year'];
			echo $this->wht_model->archiveForMonth($datau);
		}
	}

	public function archiveForMonthIndividualSuppliers(){
		if (isset($_POST['archive'])) {
			$datau['month_covered'] = $this->input->post('monthCovered');
			$datau['year'] = $this->input->post('year');
			$datau['tax_no'] = $this->input->post('taxNo');
			$datau['firs_tax_office'] = $this->input->post('firsTaxOffice');
			$datau['state_tax_filling_office'] = $this->input->post('stateTaxFillingOffice');
			$datau['tax_station_code'] = $this->input->post('taxStationCode');
			$datau['suppliers_of_service'] = $this->input->post('suppliersOfService');
			$datau['suppliers_of_goods'] = $this->input->post('suppliersOfGoods');
			$datau['user_id'] = $this->session->userdata('user_id');
			$datau['month_archived'] = $datau['month_covered']." ".$datau['year'];
			echo $this->wht_model->archiveForMonthIndividualSuppliers($datau);
		}
	}

	public function saveHtml(){
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

			echo "<br/><br/>For suppliers of goods<br/>";

			echo $table2;
			
			$rand = rand(90, 10000);
			$docName = $rand.".php";

			// Get the content that is in the buffer and put it in your file //
			if(file_put_contents('files/'.$docName, ob_get_contents())){
				echo "#".$docName;
			}
	}

	public function saveHmtlSave(){
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
			
			$rand = rand(9000, 1000);
			$docName = $rand.".php";

			// Get the content that is in the buffer and put it in your file //
			if(file_put_contents('files/'.$docName, ob_get_contents())){
				echo "#".$docName;
			}
	}

	public function saveHmtlEmail(){
		// Start the buffering //
		ob_start();
		
		?>

		<?php
			$name = "TaxAssist";
			$userEmail = $this->session->userdata('email');
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

		$rand = rand(900, 10000);
		$docName = $rand.".php";

		// Get the content that is in the buffer and put it in your file //
		if(file_put_contents('files/'.$docName, ob_get_contents())){    
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

		    $this->load->library('email'); 

			$this->email->from($name, 'TaxAssist');
			$this->email->to($sendto);
			$this->email->subject($subject);
			$this->email->message($msg); 

		    if($this->email->send()) {
		        echo "#".$docName;
		    }
		}
	}

}