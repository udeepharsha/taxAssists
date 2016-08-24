
			
<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">

<h4>A PHP Error was encountered</h4>

<p>Severity: Notice</p>
<p>Message:  Undefined index: monthCovered</p>
<p>Filename: controllers/Wht.php</p>
<p>Line Number: 225</p>


	<p>Backtrace:</p>
	
		
	
		
	
		
			<p style="margin-left:10px">
			File: C:\wamp64\www\TaxAssists\application\controllers\Wht.php<br />
			Line: 225<br />
			Function: _error_handler			</p>

		
	
		
	
		
			<p style="margin-left:10px">
			File: C:\wamp64\www\TaxAssists\index.php<br />
			Line: 315<br />
			Function: require_once			</p>

		
	

</div>
<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">

<h4>A PHP Error was encountered</h4>

<p>Severity: Notice</p>
<p>Message:  Undefined index: year</p>
<p>Filename: controllers/Wht.php</p>
<p>Line Number: 226</p>


	<p>Backtrace:</p>
	
		
	
		
	
		
			<p style="margin-left:10px">
			File: C:\wamp64\www\TaxAssists\application\controllers\Wht.php<br />
			Line: 226<br />
			Function: _error_handler			</p>

		
	
		
	
		
			<p style="margin-left:10px">
			File: C:\wamp64\www\TaxAssists\index.php<br />
			Line: 315<br />
			Function: require_once			</p>

		
	

</div>
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
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</table>

			<br/><br/>For suppliers of services<br/><table border="1"> <tr> <th>Corporate Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr></table>			<br/><br/>

			<button onclick="printPage()">Print Results</button>

			<script>
				function printPage(){
				    window.print();
				}
			</script>
		