<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Paye extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this -> load -> library(array('session'));
		$this -> load -> library('upload');
		$this -> load -> helper(array('url'));
		$this -> load -> model('paye_model');
	}

	public function index()
	{
		$this->load->view('paye/paye');
	}

	public function payMonthlyEmployement()
	{
		$this->load->view('paye/paye-monthly-employment');
	}

	public function payeYearlyEmployment(){
		$this->load->view('paye/paye-yearly-employment');
	}

	public function payeSpoolReports(){
		$this->load->view('paye/paye-spool-reports');
	}

	public function payeAssistMe(){
		$this->load->view('paye/paye-assist-me');
	}

	public function addNewEmployee(){
		$datau['employee_details'] = json_encode($this->input->post('e_details'));
		$datau['user_id'] = $this->session->userdata('user_id');
		echo $this->paye_model->addNewEmployee($datau);
	}

	public function loadPayEmployee(){
		echo json_encode($this->paye_model->loadPayEmployee());
	}

	public function submitPayMonthly(){
		if (isset($_POST['save'])) {
			$datam['monthly_values'] = '[]';
			$datam['tax_station_code'] = $this->input->post('taxStationCode');
			$datam['state_bir'] = $this->input->post('stateBir');
			$datam['tax_id'] = $this->input->post('taxId');
			$datam['tax_no'] = $this->input->post('taxNo');
			$datam['year'] = $this->input->post('year');
			$datam['month'] = $this->input->post('month');
			$datam['user_id'] = $this->session->userdata('user_id');
			echo $this->paye_model->submitPayMonthly($datam);
		}
	}

	public function removeEmployee(){
		$datau['employee_details'] = json_encode($this->input->post('e_details'));
		$datau['user_id'] = $this->session->userdata('user_id');
		echo json_encode($this->paye_model->removeEmployee($datau));
	}

	public function saveEditedEmployee(){
		$datau['employee_details'] = json_encode($this->input->post('e_details'));
		$datau['user_id'] = $this->session->userdata('user_id');
		echo json_encode($this->paye_model->saveEditedEmployee($datau));
	}

	public function archiveForMonth(){
		if (isset($_POST['archive'])) {
			$datam['monthly_values'] = '[]';
			$datam['tax_station_code'] = $this->input->post('taxStationCode');
			$datam['state_bir'] = $this->input->post('stateBir');
			$datam['tax_id'] = $this->input->post('taxId');
			$datam['tax_no'] = $this->input->post('taxNo');
			$datam['year'] = $this->input->post('year');
			$datam['month'] = $this->input->post('month');
			$datam['user_id'] = $this->session->userdata('user_id');
			echo $this->paye_model->archiveForMonth($datam);
		}
	}

	public function saveHtml(){
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
		
		$rand = rand(900, 100000000);
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

		?>
			<br/><br/>

			<button onclick="printPage()">Print Results</button>

			<script>
				function printPage(){
				    window.print();
				}
			</script>
		<?php

			$rand = rand(9000, 100000000);
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
			if(file_put_contents('files/'.$docName, ob_get_contents())){    
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