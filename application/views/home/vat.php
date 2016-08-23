<?php
	if(!isset($_SESSION)) 
    { 
    	session_start();
    }

    if( !isset($_SESSION["logged_in"]) ) {
    	header("Location: ".base_url()."");
    } 
    else{
    	$role_id = $_SESSION["role_id"];
        if( ($role_id == 1) ||  ($role_id == 2) ){
        }
        else{
            header("Location: ".base_url()."");
        }
    }

?>

<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html lang="en">
<!--<![endif]-->

<head>

<!-- Basic Page Needs
================================================== -->
<meta charset="utf-8"/>
<meta http-equiv="Cache-Control" content="private" />
<meta http-equiv="Expires" content="86400000" />
<meta http-equiv="Cache-Control" content="max-age=86400000" />
<title>Vi-M taxassist</title>
<!-- Favicon
    ============================================== -->
<link rel="icon" href="<?php echo base_url(); ?>assets/images/favicon.ico"/>
<!-- Mobile Specific
================================================== -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<!-- CSS
================================================== -->
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bPopup.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/scripts/rs-plugin/css/settings.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/colors/grayblue.css" id="colors"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/animate.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/camera.css" id='camera-css'/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/my.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery-ui.css">

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-1.11.2.min.js" language="javascript"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/login_signup.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/submit_vat.js"></script>


<!--[if lt IE 9]>
	<script src="../../../html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!-- Java Script
================================================== -->
</head>
<body>
<div class="loader"><div class="ring"><div class="spin"></div></div></div>

<div id="dialogs"></div>

<!-- Header
================================================== -->
<header id="header">
     <div class="topbar">
          <div class="container">
               <div class="eight columns call">
                    Welcome <span id="username"><?php echo $_SESSION['username'] ?></span>
               </div>
               <div class="eight columns">
                    <ul class="social-icons right">
						<li><a class="facebook" href="https://www.facebook.com/vimprofessionalsolutions/" target="_blank"><i class="icon-facebook"></i></a></li>
						<li><a class="twitter" href="https://twitter.com/nigeriantaxlady" target="_blank"><i class="icon-twitter"></i></a></li>
						<li><a class="linkedin" href="https://www.linkedin.com/pub/vi-m-professional-solutions/b1/214/619" target="_blank"><i class="icon-linkedin"></i></a></li>
					</ul>
               </div>
          </div>
     </div>
     <!-- Mobile Menu & Search -->
     <div class="container">
     	<div class="three columns">
     		<div id="mobile-navigation">
     			<a href="#menu" class="menu-trigger"><i class="icon-reorder"></i></a> <span class="search-trigger"><i class="icon-search"></i></span> </div>
     			<div id="logo">
     				<h1><a href="index.html"><img src="<?php echo base_url(); ?>assets/images/logo.png" /></a></h1>
     			</div>
     		</div>
     		<div class="thirteen columns">
     			<nav id="navigation" class="menu">
     				<ul id="responsive">
     					<li><a href="<?= base_url('home')?>" id="current">VAT</a> </li>
     					<li><a href="<?= base_url('wht')?>">WHT</a></li>
     					<li><a href="<?= base_url('paye')?>">PAYE</a></li>
     					<li><a href="feedback.html">Feedback</a></li>
     					<li><a href="mydetails.html">My Details</a></li>
     					<li>
     						<div class="login_signup_btn" id="loginClick" onclick="logOut()">Logout</div>
     					</li>
     				</ul>
     			</nav>
     		</div>
     	</div>
</header>
<!-- Header / End -->

<!-- Content Wrapper
================================================== -->
<div id="content-wrapper">
	<div id="loginPopup" style="display:none;" class="popup">
	    <div>
	    	<span class="logo" style="font-size:25px;">Exempted / Zero rated sales</span>
	    </div>
	    
	    <div class="ratedItem">1.] All medical and pharmaceutical products sold/ supplied</div>

	    <div class="ratedItem">2.] Basic foods items or unprocessed food items supplied</div>

	    <div class="ratedItem">3.] Books and educational materials supplied</div>

	    <div class="ratedItem">4.] Baby products supplied</div>

	    <div class="ratedItem">5.] Locally produced fertiliser, agricultural and veterinary medicine, farming machinery and farming transportation equipment supplied</div>

	    <div class="ratedItem">6.] Plant, machinery and equipment sold to oil and gas companies in the downstream sector for utilisation of gas.</div>

	    <div class="ratedItem">7.] Tractors, ploughs, agricultural equipment and implements sold to farmers</div>

	    <div class="ratedItem">8.] Medical services</div>

	    <div class="ratedItem">9.] Services rendered if your business is a community bank, people bank or mortgage institutions</div>

	    <div class="ratedItem">10.] Plays and performances conducted, if your business is an educational institution, as part of learning</div>

	    <div class="ratedItem">11.] Exported goods and services</div>

	    <div class="ratedItem">12.] Goods and services purchased by diplomats or embassies (zero rated)</div>

	    <div class="ratedItem">13.] Goods sold to non- governmental organizations, religious and social clubs or societies recognized by law whose activity is not for profit making (Zero rated)</div>

	    <div class="ratedItem">14.] Interest charged on borrowings</div>

	    <div class="ratedItem">15.] Disposals of short term government bonds, government securities and corporate bonds </div>

	    <div class="ratedItem">16.] Rent charged on residential accommodation</div>

	    <div class="ratedItem">17.] Goods and services supplied to government organisations, ministries, departments and agencies </div>

	    <div class="ratedItem">18.] Goods and services supplied to oil & gas companies</div>
	</div>

	<div id="parallex-inner" class="parallex">
		<div class="container">
			<div class="eight columns"  data-animated="fadeInUp">
				<h1>VAT (Value Added Tax)</h1>
				<br/>
				<p>
					Every business organisation (or taxpayer) is mandatorily required, within 6 months of commencement of business, to compute and remit VAT (at 5%) on all taxable goods and services supplied by the business. (Note that some goods and services are exempted from VAT as shown in the exempted goods & services field below). VAT is to be computed and filed (using the VAT returns form to which the layout below is tailored) before the 21st of every month following the month of transactions. For other personalized questions and one on one consultations on VAT or your taxes in general, please use the feedback page and we will respond very quickly.
				</p>
			</div>
			<div class="eight columns">
				<nav id="breadcrumbs">
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">VAT</a></li>
						<li>Details</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>

	<div class="container">
          <!-- 1/3 -->
          <div class="one-third column">
               <a href="<?= base_url('home')?>">
                    <div class="sec1">
                         <h3 class="headline">Calculate</h3>
                    </div>
               </a>
          </div>
          <!-- 1/3 -->
          <div class="one-third column">
               <a href="<?= base_url('home/spoolReports')?>">
                    <div class="sec2">
                         <h3 class="headline">Spool Reports</h3>
                    </div>
               </a>
          </div>
          <!-- 1/3 -->
          <div class="one-third column">
               <a href="<?= base_url('home/assistMe')?>">
                    <div class="sec2">
                         <h3 class="headline">Assist Me</h3>
                    </div>
               </a>
          </div>
	</div>

	<br/><br/>

	<div class="container" id="printSection">

		<form id="submit_vat" name="submit_vat" method="POST">
			<input type="hidden" id="userEmail" name="userEmail" />

	    	<!-- 1/4 -->
			<div class="twelve columns">
				<div id="divLoadSection">
					<h3 class="headline">Please complete the following fields as accurately as possible</h3>
					<span class="brd-headling"></span>
					<div class="clearfix"></div>

					<div class="twelve columns calculator_sec">
						Month under review
						<div id="monthUnderReviewDiv">
							<select class="select-box1" id="monthUnderReview" name="monthUnderReview">
								<option value="January">January</option>
								<option value="February">February</option>
								<option value="March">March</option>
								<option value="April">April</option>
								<option value="May">May</option>
								<option value="May">May</option>
								<option value="July">July</option>
								<option value="August">August</option>
								<option value="September">September</option>
								<option value="October">October</option>
								<option value="November">November</option>
								<option value="December">December</option>
							</select>
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Year under review
						<div id="yearUnderReviewDiv">
							<select class="select-box1" id="yearUnderReview" name="yearUnderReview">
								<option value="2050">2050</option>
								<option value="2049">2049</option>
								<option value="2048">2048</option>
								<option value="2047">2047</option>
								<option value="2046">2046</option>
								<option value="2045">2045</option>
								<option value="2044">2044</option>
								<option value="2043">2043</option>
								<option value="2042">2042</option>
								<option value="2041">2041</option>
								<option value="2040">2040</option>
								<option value="2039">2039</option>
								<option value="2038">2038</option>
								<option value="2037">2037</option>
								<option value="2036">2036</option>
								<option value="2035">2035</option>
								<option value="2034">2034</option>
								<option value="2033">2033</option>
								<option value="2032">2032</option>
								<option value="2031">2031</option>
								<option value="2030">2030</option>
								<option value="2029">2029</option>
								<option value="2028">2028</option>
								<option value="2027">2027</option>
								<option value="2026">2026</option>
								<option value="2025">2025</option>
								<option value="2024">2024</option>
								<option value="2023">2023</option>
								<option value="2022">2022</option>
								<option value="2021">2021</option>
								<option value="2020">2020</option>
								<option value="2019">2019</option>
								<option value="2018">2018</option>
								<option value="2017">2017</option>
								<option value="2016">2016</option>
								<option value="2015">2015</option>
								<option value="2014">2014</option>
								<option value="2013">2013</option>
								<option value="2012">2012</option>
								<option value="2011">2011</option>
								<option value="2010">2010</option>
								<option value="2009">2009</option>
								<option value="2008">2008</option>
								<option value="2007">2007</option>
								<option value="2006">2006</option>
								<option value="2005">2005</option>
								<option value="2004">2004</option>
								<option value="2003">2003</option>
								<option value="2002">2002</option>
								<option value="2001">2001</option>
								<option value="2000">2000</option>
							</select>
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Tax Identification No.
						<div id="taxNoDiv">
							<input value="<?php if(count($vat_data) != 0){echo $vat_data[0]->tax_no; } ?>" type="text" class="input-box1" id="taxNo" name="taxNo" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Vat No.
						<div id="vatNoDiv">
							<input value="<?php if(count($vat_data) != 0){echo $vat_data[0]->vat_no; } ?>" type="text" class="input-box1" id="vatNo" name="vatNo" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Firs Tax Office
						<div id="firsTaxOfficeDiv">
							<input value="<?php if(count($vat_data) != 0){echo $vat_data[0]->firs_tax_office; } ?>" type="text" class="input-box1" id="firsTaxOffice" name="firsTaxOffice" />
						</div>
					</div>

					<div class="twelve columns sectionSeperator"></div>
					<!-- Section Seperate -->

					<div class="twelve columns">
			     		<h3 class="headline" style="text-align:left;">
			     			OUTPUT VAT
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			NGN
			     		</h3>
					</div>

					<div class="twelve columns calculator_sec">
						Sales / Income for the month on all goods and services sold (excluding VAT charge on invoice)
						<div id="outputSalesIncomeDiv">
							<input type="text" value="<?php if(count($vat_data) != 0){echo $vat_data[0]->output_sales_income; } ?>" class="input-box1" id="outputSalesIncome" name="outputSalesIncome" onkeyup="changeValues1()" onkeypress="return validateNumeric(event)" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Exempted / Zero rated sales:
						<a href="#loginPopup" class="modalbox" id="backLoginClick2">Not sure what it means?</a>
						<div id="exemptedZeroDiv">
							<input type="text" value="<?php if(count($vat_data) != 0){echo $vat_data[0]->exempted_zero; } ?>" class="input-box1" id="exemptedZero" name="exemptedZero" onkeyup="changeValues1()" onkeypress="return validateNumeric(event)" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Total supplies subject to VAT
						<div id="totalSuppliesVatDiv">
							<input value="<?php if(count($vat_data) != 0){echo $vat_data[0]->total_supplies_vat; } ?>" type="text" class="input-box1" id="totalSuppliesVat" name="totalSuppliesVat" readonly />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Output VAT for the Month
						<div id="outputVatDiv">
							<input type="text" class="input-box1" id="outputVat" name="outputVat" readonly />
						</div>
					</div>

					<div class="twelve columns sectionSeperator"></div>
					<!-- Section Seperate -->

					<div class="twelve columns">
			     		<h3 class="headline" style="text-align:left;">
			     			INPUT VAT
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			     			&nbsp;&nbsp;&nbsp;
			     			NGN
			     		</h3>
			     	</div>

					<div class="twelve columns calculator_sec">
			     		NOTE: Please capture only VAT amounts below and not the total purchase costs. Only the VAT on cost of goods sold in the month should be captured.
			     		<br/><br/>
					</div>

					<div class="twelve columns calculator_sec">
						VAT paid on local supplies (Goods only. Services and fixed assets are excluded)
						<div id="vatOnLocalSuppliesDiv">
							<input type="text" class="input-box1" id="vatOnLocalSupplies" name="vatOnLocalSupplies" onkeyup="changeValues2()" onkeypress="return validateNumeric(event)" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						VAT paid on imported goods (Services and fixed assets are excluded)
						<div id="vatOnImportedGoodsDiv">
							<input type="text" class="input-box1" id="vatOnImportedGoods" name="vatOnImportedGoods" onkeyup="changeValues2()" onkeypress="return validateNumeric(event)" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						VAT paid on subcontracted services
						<div id="vatOnSubcontractedDiv">
							<input type="text" class="input-box1" id="vatOnSubcontracted" name="vatOnSubcontracted" onkeyup="changeValues2()" onkeypress="return validateNumeric(event)" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Total input Tax claimable
						<div id="totalInputTaxClaimableDiv">
							<input type="text" class="input-box1" id="totalInputTaxClaimable" name="totalInputTaxClaimable" readonly />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Excess input VAT brought forward from previous month
						<div id="excessInputVatDiv">
							<input type="text" class="input-box1" id="excessInputVat" name="excessInputVat" onkeyup="changeValues2()" onkeypress="return validateNumeric(event)" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						VAT payable for the month
						<div id="vatPayableForMonthDiv">
							<input type="text" class="input-box1" id="vatPayableForMonth" name="vatPayableForMonth" readonly />
						</div>
					</div>

					<div class="twelve columns sectionSeperator"></div>
					<!-- Section Seperate -->

					<div class="twelve columns">
			     		<h3 class="headline">Signature</h3>
			     		<p>Complete below if you intend filling returns with this form</p>
			     	</div>

			     	<div class="twelve columns calculator_sec">
			     		Authorized Signatory
						<div id="authorizedSignatoryDiv">
							<input type="text" class="input-box1" id="authorizedSignatory" name="authorizedSignatory" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Designation
						<div id="designationDiv">
							<input type="text" class="input-box1" id="designation" name="designation" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Signature
						<div id="signatureDiv">
							<input type="text" class="input-box1" id="signature" name="signature" />
						</div>
					</div>

					<div class="twelve columns calculator_sec">
						Company stamp and date
						<div id="companyStampAndDateDiv">
							<input type="text" class="input-box1" id="companyStampAndDate" name="companyStampAndDate" />
						</div>
					</div>

					<div class="twelve columns checkbox_sec">
						<input type="checkbox" id="declare" checked="checked" />
						I declare that particulars of this return are true & correct.
					</div>

					<div class="twelve columns sectionSeperator"></div>
					<!-- Section Seperate -->
				</div>

				<div class="twelve columns" id="">
		     		<div style="float:left;">
		     			<!-- <button type="submit" class="btn">Save</button>

		     			<button class="btn" onclick="archiveForMonth()">Archive for month</button> -->


		     			<button type="submit" name="save" class="btn" alt="Save" value="Save">Save</button>
						<button type="submit" name="archive" class="btn" alt="Archive" value="archive">Archive for month</button>


		     		</div>

		     		<div style="float:left; margin-left:20px; font-size:20px;" id="loadingSec">	     			
		     		</div>
		     	</div>

				<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->

				<div class="twelve columns" style="font-size:20px;" id="loadingSec1">
		     		<!-- <select id="archiveType" style="width:200px;">
	     				<option value="Excel">Export As Excel</option>
	     				<option value="Html">Export As Html</option>
	     			</select>

	     			<br/>

	     			<button onclick="exportData()">Export</button>

	     			&nbsp;&nbsp;&nbsp;

	     			<button onclick="createPDFsAndEmail()">Email Archive</button> -->
		    	</div>

		    	<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->

				<div class="twelve columns">
		     		<h5>
		     			PLEASE NOTE: It is the responsibility of the taxpayers, who are users of Vi-M’s Tax Assist app to ensure that their taxes are paid and filed as and when due. Vi-M accepts no responsibility for failure or default in this regard.
		     		</h5>
		     	</div>
			</div>
		</form>
    	<!-- 3/4 -->
        <div class="four columns">
        	<img src="<?php echo base_url(); ?>assets/images/img-services.png" class="sidebarImage">
    	</div>
	</div>
</div>
<!-- Content Wrapper / End -->

<!-- Footer
================================================== -->
<div id="footer">
     <div class="container">
     	<div class="four columns">
     		<h3>Get In Touch</h3>
     		<ul class="get-in-touch">
     			<li ><i class="ss-location"></i>
     				<p>
     					Vi-M professional Solutions <br/>
     					5th Floor Mulliner Towers (former NNPC Building) <br/>
     					39 Alfred Rewane (Kingsway Road) <br/>
     					Ikoyi, Lagos, Nigeria
     				</p>
     			</li>
     			<li><i class="ss-phone"></i>
     				<p><strong>Phone:</strong> T: +234 807 520 3657</p>
     			</li>
     			<li><i class="ss-mail"></i>
     				<p><strong>Email:</strong> taxassist@vi-m.com</p>
     			</li>
     		</ul>
     	</div>
     	<div class="eight columns">
     		<div class="four alt columns">
     			<h3>About Us</h3>
     			<div style="margin:0; line-height:20px;">
     				Vi-M Professional Solutions is a partnership business registered in Nigeria. Vi-M provides tax consultancy, accounting, financial advisory, corporate communications, training, human resource management and management consultancy services
     			</div>
     			<hr class="sep10">
     			<!-- Recent Posts -->
     			<ul class="widget-tabs">
     				<li>
     					<div class="widget-thumb"> <a href="#"><img src="<?php echo base_url(); ?>assets/images/content/portfolio-04.jpg" alt="" /></a> </div>
     					<div class="widget-text">
     						<h4><a href="blog-post.html">Vi-M Professional Solutions</a></h4>
     						<span>Delivering value tailored to clients’ needs...</span>
     					</div>
     					<div class="clearfix"></div>
     				</li>
     			</ul>
     		</div>
     		<div class="four alt columns">
     			<h3>Categories</h3>
     			<div class="widget_latest_posts">
     				<ul>
     					<li>
     						<h6><i class="icon-chevron-right"></i><a href="index.html">Home</a></h6>
     					</li>
     					<li>
     						<h6><i class="icon-chevron-right"></i><a href="about.html">About Us</a></h6>
     					</li>
     					<li>
     						<h6><i class="icon-chevron-right"></i><a href="vat.html">Calculators</a></h6>
     					</li>
     					<li>
     						<h6><i class="icon-chevron-right"></i><a href="contact.html">Contact Us</a></h6>
     					</li>
     				</ul>
     			</div>
     		</div>
     	</div>
          <div class="four columns">
          	<h3>Tags</h3>
          	<div class="footer_tags">
          		<ul>
          			<li><a href="#">Tax</a></li>
          			<li><a href="#">Business</a></li>
          			<li><a href="#">Tax Planning</a></li>
          			<li><a href="#">Compliance</a></li>
          			<li><a href="#">Cost Savings</a></li>
          			<li><a href="#">Photography</a></li>
          			<li><a href="#">Management</a></li>
          			<li><a href="#">Finance</a></li>
          			<li><a href="#">PAYE</a></li>
          			<li><a href="#">VAT</a></li>
          			<li><a href="#">WHT</a></li>
          			<li><a href="#">Law</a></li>
          			<li><a href="#">Tax Law</a></li>
          			<li><a href="#">Tax Computations</a></li>
          			<li><a href="#">Tax rates</a></li>
          			<li><a href="#">CIT</a></li>
          			<li><a href="#">Tax Remittance</a></li>
          			<li><a href="#">Information Technology</a></li>
          			<li><a href="#">Software</a></li>
          			<li><a href="#">Director</a></li>
          			<li><a href="#">Royalty</a></li>
          			<li><a href="#">Interest</a></li>
          			<li><a href="#">Dividend</a></li>
          			<li><a href="#">Rent</a></li>
          			<li><a href="#">Contacts</a></li>
          			<li><a href="#">Agency</a></li>
          			<li><a href="#">Commissions</a></li>
          			<li><a href="#">Payslips</a></li>
          			<li><a href="#">Tax ID</a></li>
          			<li><a href="#">Investment</a></li>
          			<li><a href="#">Income</a></li>
          			<li><a href="#">Profits</a></li>
          			<li><a href="#">Wealth</a></li>
          			<li><a href="#">Communication</a></li>
          			<li><a href="#">Advisory</a></li>
          			<li><a href="#">Consulting</a></li>
          			<li><a href="#">Employment</a></li>
          			<li><a href="#">Salary</a></li>
          		</ul>
          	</div>
          </div>
     </div>
     <!-- Container / End -->
</div>
<!-- Footer / End -->

<!-- Footer Bottom / Start -->
<div id="footer-bottom">
     <!-- Container -->
     <div class="container">
          <div class="eight columns">© Copyright 2016 <a href="index.html">Vi-M Professional Solutions</a>. All Rights Reserved.</div>
          <div class="eight columns">
               <ul class="social-icons-footer">
	     			<li><a href="https://www.facebook.com/vimprofessionalsolutions/" target="_blank" class="tooltip top" title="Facebook"><i class="icon-facebook"></i></a></li>
	     			<li><a href="https://twitter.com/nigeriantaxlady" target="_blank" class="tooltip top" title="Twitter"><i class="icon-twitter"></i></a></li>
	     			<li><a href="https://www.linkedin.com/pub/vi-m-professional-solutions/b1/214/619" target="_blank" class="tooltip top" title="Linkedin"><i class="icon-linkedin"></i></a></li>
	     		</ul>
          </div>
     </div>
     <!-- Container / End -->
</div>

<script src="<?php echo base_url(); ?>assets/scripts/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.themepunch.plugins.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.themepunch.revolution.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.themepunch.showbizpro.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/appear.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.easing.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.tooltips.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.magnific-popup.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.superfish.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.twitter.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.flexslider.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.jpanelmenu.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.zflickrfeed.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.contact.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.isotope.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.easy-pie-chart.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/parallex.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/ss-gizmo.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/custom.js"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery-ui.js"></script>

<!-- Popup CSS/JS -->
<link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url(); ?>assets/popup/style.css">
<link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url(); ?>assets/popup/fancybox/jquery.fancybox.css">
<script type="text/javascript" src="<?php echo base_url(); ?>assets/popup/fancybox/jquery.fancybox.js?v=2.0.6"></script> 

<script type="text/javascript">
    $(document).ready(function() {
         $(".modalbox").fancybox({
             'transitionIn': 'fade',
              'transitionOut': 'fade',
              'speedIn': 600,
              'speedOut': 200,
              'overlayShow': true,
              margin: [0, 60, 50, 60] // top, right, bottom, left
         });
     });
</script>
</body>
</html>