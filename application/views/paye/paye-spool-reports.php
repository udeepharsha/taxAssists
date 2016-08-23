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
<title>Vi-M Taxassist</title>
<!-- Favicon
    ============================================== -->
<link rel="icon" href="<?php echo base_url(); ?>assets/images/favicon.ico"/>
<!-- Mobile Specific
================================================== -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<!-- CSS
================================================== -->
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/scripts/rs-plugin/css/settings.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/colors/grayblue.css" id="colors"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/animate.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/camera.css" id='camera-css'/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/my.css">
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery-ui.css">

<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-1.11.2.min.js" language="javascript"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/parse-1.3.1.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/common.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/login_signup.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/paye_spool_reports.js"></script>

<!-- For Date Pick -->
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery-ui.css">
<script src="<?php echo base_url(); ?>assets/scripts/jquery-ui.js"></script>
<script type="text/javascript">
     // $(document).ready(function(){
     //      if(isLoggedIn()){
     //           document.getElementById('username').innerHTML =  currentUser.get('username')+"!";
     //           loadEmployees1();
     //           // loadMonthlyReports();
     //           // loadYearlyReports();
     //      }
     //      else{
     //           window.location = "index.html";
     //      }
     // });

     $(function() {
         $( "#fromMonthly" ).datepicker();
         $( "#toMonthly" ).datepicker();
         $( "#fromYearly" ).datepicker();
         $( "#toYearly" ).datepicker();
     });
</script>

<!--[if lt IE 9]>
     <script src="../../../html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<style type="text/css">
	.headline{
		font-size: 11px;
		padding: 0px;
	}
	.headline1{
		font-size: 19px;
		padding: 0px;
		font-weight: bold;
	}
	.rowHData{
		height: 94px;
	}
	select{
		width: 210px;
	}
</style>
</head>
<body>
<div id="dialogs"></div>
<div class="loader"><div class="ring"><div class="spin"></div></div></div>

<form id="form_name" name="form_name" method="POST" action="#" onsubmit="return false;">
	<input type="hidden" id="month" name="month" />
	<input type="hidden" id="year" name="year" />
	<input type="hidden" id="taxNo" name="taxNo" />
	<input type="hidden" id="taxId" name="taxId" />
	<input type="hidden" id="stateBir" name="stateBir" />
	<input type="hidden" id="taxStationCode" name="taxStationCode" />
	<input type="hidden" id="table" name="table" />
</form>

<!-- Header
================================================== -->
<header id="header">
	<div class="topbar">
		<div class="container">
			<div class="eight columns call">
				Welcome <span id="username"></span>
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

	<div class="container">
     	<div class="three columns">
     		<div id="mobile-navigation">
     			<a href="#menu" class="menu-trigger"><i class="icon-reorder"></i></a> <span class="search-trigger"><i class="icon-search"></i></span>
     		</div>
     		<div id="logo">
     			<h1><a href="index.html"><img src="<?php echo base_url(); ?>assets/images/logo.png" alt="Vi-m" /></a></h1>
     		</div>
     	</div>
     	<div class="thirteen columns">
     		<nav id="navigation" class="menu">
     			<ul id="responsive">
     				<li><a href="<?= base_url('home')?>">VAT</a> </li>
     				<li><a href="<?= base_url('wht')?>">WHT</a></li>
     				<li><a href="<?= base_url('paye')?>" id="current">PAYE</a></li>
     				<li><a href="feedback.html">Feedback</a></li>
     				<li><a href="mydetails.html">My Details</a></li>
     				<li>
     					<div class="login_signup_btn" onclick="logOut()" style="margin-top: 25px;">Logout</div>
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
	<div id="parallex-inner" class="parallex">
		<div class="container">
			<div class="eight columns"  data-animated="fadeInUp">
				<h1>PAYE Spool Reports</h1>
				<br/>
				<p>
					Every business organisation (or taxpayer) is mandatorily required, within 6 months of commencement of business, to compute, deduct and remit his or her employees' taxes from their salaries and their other known sources of income. The computed taxes should be remitted, with the necessary schedules before the 10th of each month following the month of salary payments. The reporting schedule from this page is the statutory P.A.Y.E remittance schedule which you can use in making your monthly P.A.Y.E remittances. Individual reports from the spool reports page appear in typical payslip formats for distribution to your employees on a monthly basis. For other personalized questions and one on one consultations on PAYE or your taxes in general, please use the feedback page and we will respond very quickly.
				</p>
			</div>
			<div class="eight columns">
				<nav id="breadcrumbs">
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">PAYE</a></li>
						<li>Details</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="three column">
			<a href="<?= base_url('paye')?>">
				<div class="sec2">
					<h3 class="headline">Employee Details</h3>
				</div>
			</a>
		</div>
		<div class="three column" style="width:20%">
			<a href="<?= base_url('paye/payMonthlyEmployement')?>">
				<div class="sec2">
					<h3 class="headline">Monthly Calculator</h3>
				</div>
			</a>
		</div>
		<div class="three column" style="width:20%">
			<a href="<?= base_url('paye/payeYearlyEmployment')?>">
				<div class="sec2">
					<h3 class="headline">Annual Calculator</h3>
				</div>
			</a>
		</div>
		<div class="three column" style="width:20%">
			<a href="<?= base_url('paye/payeSpoolReports')?>">
				<div class="sec1">
					<h3 class="headline">Spool Reports</h3>
				</div>
			</a>
		</div>
		<div class="three column" style="width:16%">
			<a href="<?= base_url('paye/payeAssistMe')?>">
				<div class="sec2">
					<h3 class="headline">Assist Me</h3>
				</div>
			</a>
		</div>
	</div>

	<br/><br/>

	<div class="container" id="monthlySec">
		<div class="siz-teen columns">
			<h2>MONTHLY REPORTS :</h2>
		</div>
	</div>

	<div class="container">
		<div class="one-third columns">
			<select id="spoolType1" onchange="changeSpoolType1()">
				<option value="Spool Reports By Employee">Spool Reports By Employee</option>
				<option value="Spool All Employees">Spool All Employees</option>
			</select>
		</div>

		<div class="one-third columns" id="employeeSec1">
			<select id="empSelect1">
				<option value="" selected disabled>-- Employee Name --</option>
			</select>
		</div>

		<div class="one-third columns">
			<input type="text" class="input-box1" id="fromMonthly" placeholder="From" />
		</div>

		<div class="one-third columns">
			<input type="text" class="input-box1" id="toMonthly" placeholder="To" />
		</div>

		<div class="one-third columns" style="margin-left:25px;">
			<input type="submit" class="input-box1" value="Submit   " onclick="searchMonthReports()" />
		</div>

		<div class="one-third columns" id="generatingExcel" style="margin-left:25px; margin-top:6px; font-size:20px;">
		</div>
	</div>

	<br/>

	<div class="container" id="resultsSection">
		<!-- <img src="images/loading.gif" style="width:35px; height:35px;"> -->
		&nbsp;&nbsp;&nbsp; Search results will appear here...
	</div>

	<br/><br/>

	<div class="container">
		<div class="siz-teen columns">
			<h2>ANNUAL REPORTS :</h2>
		</div>
	</div>

	<div class="container">
		<div class="one-third columns">
			<select id="spoolType2" onchange="changeSpoolType2()">
				<option value="Spool Reports By Employee">Spool Reports By Employee</option>
				<option value="Spool All Employees">Spool All Employees</option>
			</select>
		</div>

		<div class="one-third columns" id="employeeSec2">
			<select id="empSelect2">
				<option value="" selected disabled>-- Employee Name --</option>
			</select>
		</div>

		<div class="one-third columns">
			<select name="fromYearly" id="fromYearly">
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
				<option value="2016" selected>2016</option>
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

		<div class="one-third columns" style="margin-left:25px;">
			<input type="submit" class="input-box1" value="Submit   " onclick="searchAnnualReports()" />
		</div>

		<div class="one-third columns" id="generatingExcelYear" style="margin-left:25px; margin-top:6px; font-size:20px;">
		</div>
	</div>

	<br/>

    <div class="container" id="resultsSection1">
        <!-- <img src="images/loading.gif" style="width:35px; height:35px;"> -->
        &nbsp;&nbsp;&nbsp; Search results will appear here...
    </div>

    <br/><br/>
     
	<div class="container">
     	<div class="six-teen columns">
     		<h5>
                    PLEASE NOTE: It is the responsibility of the taxpayers, who are users of Vi-M’s Tax Assist app to ensure that their taxes are paid and filed as and when due. Vi-M accepts no responsibility for failure or default in this regard.
               </h5>
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

<script src="<?php echo base_url(); ?>assets/js/jquery-ui.js"></script>
</body>
</html>