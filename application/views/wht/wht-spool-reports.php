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
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/scripts/rs-plugin/css/settings.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/colors/grayblue.css" id="colors"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/animate.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/camera.css" id='camera-css'/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/my.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery-ui.css">

<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-1.11.2.min.js" language="javascript"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/parse-1.3.1.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/common.js"></script>

<!-- For Date Pick -->
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/jquery-ui.css">
<script src="<?php echo base_url(); ?>assets/scripts/jquery-ui.js"></script>
<script type="text/javascript">
     $(function() {
         $( "#fromCorporate" ).datepicker();
         $( "#toCorporate" ).datepicker();
         $( "#fromIndividual" ).datepicker();
         $( "#toIndividual" ).datepicker();
     });
</script>

<!--[if lt IE 9]>
     <script src="../../../html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>
<body>
<div id="dialogs"></div>
<div class="loader"><div class="ring"><div class="spin"></div></div></div>

<form id="form_name" name="form_name" method="POST" action="#" onsubmit="return false;">
     <input type="hidden" id="monthCovered" name="monthCovered" />
     <input type="hidden" id="year" name="year" />
     <input type="hidden" id="taxNo" name="taxNo" />
     <input type="hidden" id="firsTaxOffice" name="firsTaxOffice" />
     <input type="hidden" id="stateTaxFillingOffice" name="stateTaxFillingOffice" />
     <input type="hidden" id="taxStationCode" name="taxStationCode" />
     <input type="hidden" id="table1" name="table1" />
     <input type="hidden" id="table2" name="table2" />
</form>

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
                         <li><a href="<?= base_url('wht')?>" id="current">WHT</a></li>
                         <li><a href="<?= base_url('paye')?>">PAYE</a></li>
     				<li><a href="<?= base_url('home/feedBack')?>">Feedback</a></li>
                         <li><a href="<?= base_url('home/myDetails')?>">My Details</a></li>
     				<li>
     					<div class="login_signup_btn" id="loginClick" onclick="logOutIndex()">Logout</div>
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
                    <h1>WHT Spool Reports</h1>
                    <br/>
                    <p>
                    	Every business organisation (or taxpayer) is required, immediately upon commencement of business activities, to withhold some specified rates of tax from payments made to its suppliers of goods and services (except goods supplied in the ordinary course of business* (see meaning in supply of goods section below) on a monthly basis. Such WHT deductions are to be remitted to either the state or federal tax authorities (depending on suppliers' business status) before the 21 of every month following the month of deduction. The reporting schedule from this page is the statutory WHT remittance schedule which you can use in making your monthly WHT remittances. For other personalized questions and one on one consultations on WHT or your taxes in general, please use the feedback page and we will respond very quickly.
                    </p>
               </div>
               <div class="eight columns">
                    <nav id="breadcrumbs">
                         <ul>
                              <li><a href="#">Home</a></li>
                              <li><a href="#">Wht</a></li>
                              <li>Details</li>
                         </ul>
                    </nav>
               </div>
          </div>
     </div>

     <div class="container">
          <div class="four column" style="width:23%">
               <a href="<?= base_url('wht')?>">
                    <div class="sec2">
                        <h3 class="headline">Corporate Suppliers</h3>
                    </div>
               </a>
          </div>
          <div class="four column" style="width:24%">
               <a href="<?= base_url('wht/individualSuppliers')?>">
                    <div class="sec2">
                         <h3 class="headline">Individual Suppliers</h3>
                    </div>
               </a>
          </div>
          <div class="four column" style="width:23%">
               <a href="<?= base_url('wht/spoolReports')?>">
                    <div class="sec1">
                         <h3 class="headline">Spool Reports</h3>
                    </div>
               </a>
          </div>
          <div class="four column" style="width:23%">
               <a href="<?= base_url('wht/assistMe')?>">
                    <div class="sec2">
                         <h3 class="headline">Assist Me</h3>
                    </div>
               </a>
          </div>
     </div>

	<br/><br/>

	<div class="container">
		<div class="siz-teen columns">
			<h3 class="headline">CORPORATE SUPPLIERS :</h3>
		</div>
	</div>

	<div class="container">
		<div class="one-third columns">
			<input type="text" class="input-box1" id="fromCorporate" placeholder="From" />
		</div>

		<div class="one-third columns">
			<input type="text" id="toCorporate" placeholder="To" />
		</div>

		<div class="one-third columns" style="margin-left:25px;">
			<input type="submit" class="input-box1" value="Submit  " onclick="searchWHTReportsForCorporate()" />
		</div>

          <div class="one-third columns" id="generatingExcelCorporate" style="margin-left:25px; margin-top:6px; font-size:20px;">
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
               <h3 class="headline">INDIVIDUAL SUPPLIERS :</h3>
          </div>
     </div>

     <div class="container">
          <div class="one-third columns">
               <input type="text" class="input-box1" id="fromIndividual" placeholder="From" />
          </div>

          <div class="one-third columns">
               <input type="text" id="toIndividual" placeholder="To" />
          </div>

          <div class="one-third columns" style="margin-left:25px;">
               <input type="submit" class="input-box1" value="Submit  " onclick="searchWHTReportsForIndividual()" />
          </div>

          <div class="one-third columns" id="generatingExcelIndividual" style="margin-left:25px; margin-top:6px; font-size:20px;">
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
                                   <span>Delivering value tailored to clients' needs...</span>
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
          <div class="eight columns">&copy; Copyright 2016 <a href="index.html">Vi-M Professional Solutions</a>. All Rights Reserved.</div>
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

<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/wht_spool_reports.js"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery-ui.js"></script>
</body>
</html>