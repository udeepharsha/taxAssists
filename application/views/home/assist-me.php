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
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
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

<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-1.11.2.min.js" language="javascript"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/parse-1.3.1.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/common.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/login_signup.js"></script>

<script type="text/javascript">

	function processNow(){
		var valString = "";

		var check1 = document.getElementById("check1").checked;
		var check2 = document.getElementById("check2").checked;
		var check3 = document.getElementById("check3").checked;
		var check4 = document.getElementById("check4").checked;

		if(!check1 && !check2 && !check3 && !check4){
			alert("Please check at least one checkbox!");
			return;
		}

		if(check1){
			valString = valString + "File my VAT and deliver FIRS' VAT receipt#";
		}

		if(check2){
			valString = valString + "Register my organization for VAT#";
		}

		if(check3){
			valString = valString + "Deliver personalized turning on VAT for my organizatin.#";
		}

		if(check4){
			valString = valString + "Assist me compute my VAT";
		}

		document.getElementById("hiddenValue").value = valString;
		document.getElementById("type").value = "VAT";

		console.log(document.getElementById("hiddenValue").value);

		$.ajax({
			type: 'POST',
			url: 'assistMeProcess',
			data: $("#form_name").serialize(),
			success: function(result) {
				alert("Your message is sent!");
				window.location.reload();
			}
		});
	}
</script>

<!--[if lt IE 9]>
     <script src="../../../html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
</head>
<body>
<div id="dialogs"></div>
<div class="loader"><div class="ring"><div class="spin"></div></div></div>
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
            <li><a class="twitter" href="https://twitter.com/nigeriantaxlady" target="_blank"><i class="icon-twitter" target="_blank"></i></a></li>
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
     				<li><a href="<?= base_url('home')?>" id="current">VAT</a> </li>
            <li><a href="<?= base_url('wht')?>">WHT</a></li>
            <li><a href="<?= base_url('paye')?>">PAYE</a></li>
     				<li><a href="feedback.html">Feedback</a></li>
     				<li><a href="mydetails.html">My Details</a></li>
     				<li>
     					<div class="login_signup_btn" onclick="logOut()">Logout</div>
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
			<span class="logo" style="font-size:25px;">Value Added Tax (VAT) Requests (Fees Only)</span>
		</div>

		<div class="ratedItem">***All fees below are exclusive of VAT @5% and minimal re-imbursable transportation costs</div>

		<br/>
		<div class="ratedItem">
			1.] Remittance of VAT using the prescribed VAT returns form and collection of FIRS' VAT receipt

			--

			<b>5,000 for every N1m band of turnover</b>
		</div>

		<div class="ratedItem">
			2.] Registration for VAT

			--

			<b>20,000</b>
		</div>

		<div class="ratedItem">
			3.] Customised training

			--

			<b>To be agreed</b>
		</div>

		<div class="ratedItem">
			4.] Personalised VAT computations for client

			--

			<b>To be agreed</b>
		</div>
	</div>

	<div id="parallex-inner" class="parallex">
		<div class="container">
			<div class="eight columns"  data-animated="fadeInUp">
				<h1>VAT Assist Me</h1>
				<br/>
				<p>
					Every business organisation (or taxpayer) is mandatorily required, within 6 months of commencement of business, to compute and remit VAT (at 5%) on all taxable goods and services supplied by the business. (Note that some goods and services are exempted from VAT as shown in the exempted goods & services field below). VAT is to be computed and filed (using the VAT returns form to which the layout below is tailored) before the 21st of every month following the month of transactions. For other personalized questions and one on one consultations on VAT or your taxes in general, please use the feedback page and we will respond very quickly.
				</p>
			</div>
			<div class="eight columns">
				<nav id="breadcrumbs">
					<ul>
						<li><a href="#">Home</a></li>
						<li><a href="#">Vat</a></li>
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
        <div class="sec2">
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
        <div class="sec1">
         <h3 class="headline">Assist Me</h3>
        </div>
     </a>
    </div>
	</div>

	<br/><br/>

	<div class="container">
		<div class="siz-teen columns">
			<h3 class="headline">
				Please select one or more of the areas shown below where you need Vi-M to assist you.
				(Note that charges apply on such assistance). For personalized questions or one-on-one consultations on your tax concerns generally, please use the feedback page.   
			</h3>
		</div>
	</div>

	<br/>

	<div class="container">
		<div class="eight columns calculator_sec">
			<form id="form_name" name="form_name" method="POST">
				<input type="hidden" id="hiddenValue" name="hiddenValue">
        <input type="hidden" id="userEmail" name="userEmail">
				<input type="hidden" id="type" name="type">
			</form>

			<input type="checkbox" id="check1" name="check1" />
			File my VAT returns using my Tax Assist calculations, remit the VAT amount, collect and deliver FIRS' VAT receipt.

			<br/><br/>

			<input type="checkbox" id="check2" name="check2" />
			Register my organization for VAT
			
			<br/><br/>

			<input type="checkbox" id="check3" name="check3" />
			Deliver personalized training on VAT for my organization.

			<br/><br/>

			<input type="checkbox" id="check4" name="check4" />
			Assist me compute my VAT. I cannot do so by myself on this platform.
		</div>
	</div>

	<br/>

	<div class="container">
		<div class="eight columns">
			<button class="btn" onclick="processNow()">Process Now</button>

			<a href="#loginPopup" class="modalbox btn" id="backLoginClick2">View Pricing Details</a>
		</div>
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

<!-- Footer Bottom / Start -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/vat_spool_reports.js"></script>
<link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url(); ?>assets/popup/style.css">
<link rel="stylesheet" type="text/css" media="all" href="<?php echo base_url(); ?>assets/popup/fancybox/jquery.fancybox.css">
<script type="text/javascript" src="<?php echo base_url(); ?>assets/popup/fancybox/jquery.fancybox.js?v=2.0.6"></script> 
<script src="<?php echo base_url(); ?>assets/js/jquery-ui.js"></script>

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