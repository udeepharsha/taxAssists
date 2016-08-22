<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/jquery-2.2.4.min.js" language="javascript"></script> 
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/login_signup.js"></script>

// <script type="text/javascript">
// 	$(document).ready(function(){
// 		if(isLoggedIn()){
// 			window.location = "vat.html";
// 		}
// 	});
// </script>

<!DOCTYPE html>
<html>

<head>

<title>Vi-M taxassist</title>
<link rel="icon" href="<?php echo base_url(); ?>assets/images/favicon.ico"/>

<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/style.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/my.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/scripts/rs-plugin/css/settings.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/colors/grayblue.css" id="colors"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/animate.css"/>
<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/switcher.css" />
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bPopup.css"/>

<style type="text/css">
	#loginPopup{
		background-color: white;
	}
	
	.fancybox-wrap {
		position: absolute;
		top: 30px !important;
		left: 0;
		z-index: 8020;
	}
</style>

</head>
<body>
<div id="dialogs"></div>
<div class="loader"><div class="ring"><div class="spin"></div></div></div>
<header id="header">
	<div class="topbar">
		<div class="container">
			<div class="eight columns call">
				<ul>
					<li class="first"><i class="icon-phone"></i> T: +234 807 520 3657</li>
					<li><i class="icon-envelope"></i> taxassist@vi-m.com</li>
				</ul>
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
					<li><a href="index.html" id="current">Home</a></li>
					<li><a href="about.html">About Us</a> </li>
					<li><a href="contact.html">Contact Us</a></li>
					<li>
						<div href="#loginPopup" class="login_signup_btn modalbox" id="loginClick">Login/SignUp</div>
					</li>
				</ul>
			</nav>
		</div>
	</div>
</header>

<!-- Content Wrapper
================================================== -->
<div id="content-wrapper">
	
	<div id="loginPopup" style="display:none;" class="popup">
		<form id="login_form" method="POST" enctype="multipart/form-data">
		    <div>
		    	<span class="logo">Login to Tax Assist</span>
		    </div>

		    <br/><br/>

		   	<input type="text" id="loginEmail" placeholder="Enter your email" />
		   	
		   	<br/><br/>

		    <input type="password" id="upass" placeholder="Enter password"/>

		    <button class="bPopupBtn" type="submit" id="loginButton">Sign In</button>

		    <br/><br/>

		    <div class="forgot"><a href="#forgotPopup" class="modalbox">Forgot your password?</a></div>

		    <div class="register"><a href="#registerPopup" class="modalbox">Don't have an account yet?</a></div>

		    <br/>
	    </form>
	</div>

	<div id="forgotPopup" class="popup">
	    <div>
	    	<span class="logo">Forgot Your Tax Assist password?</span>
	    </div>
	    <br/><br/>
	   	<input type="email" id="forgotemail" placeholder="Enter your email" />

	    <button class="bPopupBtn" onclick="resetPassword()">ForgotPassword</button>
	    <br/><br/>

	    <div class="forgot"><a href="#loginPopup" class="modalbox" id="backLoginClick2">Back to login</a></div>

	    <br/>
	</div>


	<div id="registerPopup" class="popup">
		<form id="register_form" method="POST" enctype="multipart/form-data">
		    <div>
		    	<span class="logo">Register with Tax Assist</span>
		    </div>
		    <br/><br/>
		    Register As:  <input type="radio" name="regAs" id="individual" checked="checked" onchange="clickRadioButton('individual')"> Individual <input type="radio" name="regAs" id="organization" onchange="clickRadioButton('organization')"> Organization

		   	<div id="regContent">
		   		<input type="email" id="emailAddressIndividual" name="emailAddressIndividual" placeholder="Enter your email"/>
		   		<div class="lineh"></div>
		   		<input type="password" id="password" name="password" placeholder="Enter your password"/>
		   		<div class="lineh"></div>
		   		<input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm your password"/>
		   	</div>

		   	<div style="width:100%; height:65px;">
		    	<div style="float:left; width:70%; text-align:left; padding-top:28px; font-size:16px">
					<input type="checkbox" id="agreeToTerms" /> <a href="Tax_Assist_terms_and_conditions.pdf" target="_blank">I agree to the terms and conditions</a>
			    </div>
			    
			    <div style="float:left; width:30%; text-align:right;">
					<input type="submit" id="signupButton" class="bPopupBtn" value="Register" />
			    </div>
		    </div>

		    <br/><br/>

		    <div class="forgot"><a href="#loginPopup" class="modalbox" id="backLoginClick">Back to login</a></div>

		    <br/>
		</form>
	</div>

    <div class="tp-banner-container">
          <div class="tp-banner" >
               <ul>
                    <li data-transition="fade" data-slotamount="7" data-masterspeed="1500" >
                         <img src="<?php echo base_url(); ?>assets/images/rev/bg-slider-01.jpg"  alt="slidebg1"  data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat">
                         
                        <div class="tp-caption customin customout"
							data-x="700"
							data-y="50"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:5;scaleY:5;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="600"
							data-start="1000"
							data-easing="Power4.easeOut"
							data-endspeed="500"
							data-endeasing="Power4.easeOut"
	                      	style="z-index: 3">
	                      		<img src="<?php echo base_url(); ?>assets/images/rev/slider01-img01.png" alt="">
                      	</div>
                        
                        <div class="tp-caption medium_text ucase customin"
							data-x="0"
							data-y="220"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="800"
							data-start="1200"
							data-easing="Power3.easeInOut"
							data-endspeed="300"
							style="z-index: 3">
								TAX COMPUTATION MADE EASY
                    	</div>
                        
                        <div class="tp-caption small_text customin"
							data-x="0"
							data-y="280"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="800"
							data-start="1600"
							data-easing="Power3.easeInOut"
							data-endspeed="300"
							style="z-index: 3">
								Experience a refreshing change - a free monthly taxes calculator and remittance aid for SMEs.
                       	</div>
                        
                    	<div class="caption text skewfromrightshort customout"
							data-x="0"
							data-y="340"
							data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="800"
							data-start="2000"
							data-easing="Power3.easeInOut"
							data-endspeed="300"
							style="z-index: 3">
								<a href="#loginPopup" class="button line-white modalbox">Sign Up Today</a>
						</div>
                    </li>


                    <!-- Slide 2-->
                    <li data-transition="zoomout" data-slotamount="7" data-masterspeed="1000" >
                         
                    	<img src="<?php echo base_url(); ?>assets/images/rev/bg-slider-02.jpg"  alt="darkblurbg"  data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat">
                         
                    	<div class="tp-caption customin"
							data-x="100"
							data-y="250"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="800"
							data-start="500"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 5">
								<img src="<?php echo base_url(); ?>assets/images/header/1.png" style="width:150px; height:100px;">

								<p style="font-size:15px; width:150px; height:auto; color:#fff; text-align:center;">Value Adding Tax Services: Helping your business grow</p>
						</div>
                       
                    	<div class="tp-caption customin"
							data-x="300"
							data-y="250"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="1000"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 5">
								<img src="<?php echo base_url(); ?>assets/images/header/2.png" style="width:150px; height:100px;">

								<p style="font-size:15px; width:150px; height:auto; color:#fff; text-align:center;">Accounting and Financial Advisory: Building and sustaining your business</p>
						</div>

						<div class="tp-caption customin"
							data-x="500"
							data-y="250"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="1200"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 5">

							<img src="<?php echo base_url(); ?>assets/images/header/3.png" style="width:150px; height:100px;">

							<p style="font-size:15px; width:150px; height:auto; color:#fff; text-align:center;">Corporate Communications: Managing your corporate perceptions</p>
						</div>

						<div class="tp-caption customin"
							data-x="700"
							data-y="250"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="1400"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 5">
							
							<img src="<?php echo base_url(); ?>assets/images/header/4.png" style="width:150px; height:100px;">

							<p style="font-size:15px; width:150px; height:auto; color:#fff; text-align:center;">Management Consulting: Backend processes aligned with best practices</p>
						</div>

						<div class="tp-caption customin"
							data-x="900"
							data-y="250"
							data-customin="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0;scaleY:0;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="500"
							data-start="1600"
							data-easing="Power3.easeInOut"
							data-endspeed="500"
							style="z-index: 5">
							
							<img src="<?php echo base_url(); ?>assets/images/header/5.png" style="width:150px; height:100px;">

							<p style="font-size:15px; width:150px; height:auto; color:#fff; text-align:center;">Human Resource Solutions: Managing your talents</p>
						</div>

						<div class="tp-caption small_light_white customin customout"
							data-x="250"
							data-y="90"
							data-customin="x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;"
							data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="600"
							data-start="2200"
							data-easing="Back.easeOut"
							data-endspeed="300"
							data-endeasing="Power1.easeIn"
							style="z-index: 11">
								<p style="font-size:40px; color:#fff;">We know who we are and what we can offer</p>
						</div>

						<div class="tp-caption small_light_white customin customout"
							data-x="390"
							data-y="140"
							data-customin="x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;"
							data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="600"
							data-start="2200"
							data-easing="Back.easeOut"
							data-endspeed="300"
							data-endeasing="Power1.easeIn"
							style="z-index: 11">
								<p style="margin-left:-50px; color:#fff;">BUT WHAT MATTERS MORE IS WHAT OUR CLIENTS NEED!</p>
						</div>
                    </li>
                    
                    <!-- Slide 3 -->
                    <li data-transition="slidedown" data-slotamount="7" data-masterspeed="800" >
                         
                    	<img src="<?php echo base_url(); ?>assets/images/rev/bg-slider-03.jpg"  alt="darkblurbg"  data-bgfit="cover" data-bgposition="left top" data-bgrepeat="no-repeat">

                    	<div class="tp-caption large_bolder_white customin customout"
							data-x="280"
							data-y="100"
							data-customin="x:0;y:0;z:0;rotationX:90;rotationY:0;rotationZ:0;scaleX:1;scaleY:1;skewX:0;skewY:0;opacity:0;transformPerspective:200;transformOrigin:50% 0%;"
							data-customout="x:0;y:0;z:0;rotationX:0;rotationY:0;rotationZ:0;scaleX:0.75;scaleY:0.75;skewX:0;skewY:0;opacity:0;transformPerspective:600;transformOrigin:50% 50%;"
							data-speed="600"
							data-start="800"
							data-easing="Back.easeOut"
							data-endspeed="300"
							data-endeasing="Power1.easeIn"
							style="z-index: 10">
								<img src="<?php echo base_url(); ?>assets/images/3rdimage.png" style="width:600px; heigh:200px ">
						</div>
                    </li>
               </ul>
          </div>
     </div>
     
	<!-- Tagline -->
     <div class="bg-tagline">
          	<div class="container">
               	<h3 style="line-height:30px; font-size:18px; margin-top:-7px;">
                	Tax Assist is a monthly VAT, WHT and PAYE calculator and remittance aid, specifically designed to assist SMEs in Nigeria navigate the dynamic and challenging tax terrain.
                </h3>
          	</div>
     </div>
     
	<!-- Featured Boxes Container -->
     <div class="container">
          <div class="featured-boxes homepage">
               <div class="one-third column" data-animated="bounceIn">
                    <!-- Featured Box -->
                    <div class="featured-box">
                        <div class="circle-1"><h3 style="padding-top:40px; font-size:25px;">VAT</h3></div>
                        <div class="featured-desc">
                           	<h3>The Value Added Tax calculator:</h3>
                        	
                           	<div class="bgContent">
                           		<p>&raquo; Assists you compute your monthly VAT</p>
                           		<p>&raquo; Calculator is designed from a tax planning perspective </p>
                           		<p>&raquo; Very simple layout, easy to navigate and understand </p>
                           		<p>&raquo; Designed to cater for users with little or no tax knowledge</p>
                           		<p>&raquo; Helps you understand how Nigerian VAT works</p>
                           		<p>&raquo; Helps you with VAT remittance</p>
                           		<p>&raquo; Helps you store your VAT records (if you choose to) for ease of retrieval</p>
                           		<p>&raquo; Tax Assist and all its users' details are hosted on a very secured cloud based platform</p>
                           		<p>&raquo; Helps you understand and give a more accurate treatment to VAT when posting your accounting records</p>
                           		<p>&raquo; And more...</p>
                           		</div>
                        </div>
                    </div>
               </div>
               <div class="one-third column" data-animated="bounceIn">
                    <!-- Featured Box -->
                    <div class="featured-box">
                    	<div class="circle-1"><h3 style="padding-top:40px; font-size:25px;">WHT</h3></div>
               			<div class="featured-desc">
               				<h3>The Withholding Tax calculator:</h3>

               				<div class="bgContent">
               					<p>&raquo; Assists you compute your monthly WHT deductions for corporate entity suppliers,  unincorporated entity and individual suppliers</p>
               					<p>&raquo; Calculator is designed from a tax planning perspective </p>
               					<p>&raquo; Very simple layout, easy to navigate and understand </p>
               					<p>&raquo; Designed to cater for users with little or no tax knowledge</p>
               					<p>&raquo; Helps you understand how Nigerian WHT works</p>
               					<p>&raquo; Helps you remit WHT to both Federal and State Tax Authorities</p>
               					<p>&raquo; Helps you store your WHT records (if you choose to) for ease of retrieval</p>
               					<p>&raquo; Tax Assist and all its users' details are hosted on a very secured cloud based platform</p>
               					<p>&raquo; Helps you understand and give more accurate treatment to WHT when posting your accounting records</p>
               					<p>&raquo; And more...</p>
               				</div>
                    	</div>
                    </div>
               </div>
               <div class="one-third column" data-animated="bounceIn">
                    <!-- Featured Box -->
                    <div class="featured-box homepage">
       					<div class="circle-1"><h3 style="padding-top:40px; font-size:25px;">PAYE</h3></div>
               			<div class="featured-desc">
                        	<h3>The Pay As You Earn calculator:</h3>

                        	<div class="bgContent">
                        		<p>&raquo; Assists you compute both monthly and annual PAYE tax for your employees or for yourself as an employee</p>
                        		<p>&raquo; Assists you compute both monthly and annual Pension deductions for your employees or for yourself as an employee</p>
                        		<p>&raquo; Calculator is designed from a tax planning perspective </p>
                        		<p>&raquo; Processes payroll and prints payslips for distribution to employees</p>
                        		<p>&raquo; Very simple layout, easy to navigate and understand </p>
                        		<p>&raquo; Designed to cater for users with little or no tax knowledge</p>
                        		<p>&raquo; Helps you understand how PAYE computation and remittance work in Nigeria</p>
                        		<p>&raquo; Helps you remit PAYE to respective employees' States of residence</p>
                        		<p>&raquo; Helps you store your PAYE records (if you choose to) for ease of retrieval</p>
                        		<p>&raquo; Tax Assist and all its users' details are hosted on a very secured cloud based platform</p>
                        		<p>&raquo; And more...</p>
                        	</div>
               			</div>
                    </div>
               </div>
          </div>
     </div>


	<!-- Portfolio Carousel -->
     <div class="bg-light-blue">
                <!-- Headline -->
                <div class="sixteen columns main-headline">
                     <h3>Featured Products</h3>
                     <p>Contact us to place adverts here.</p>
                </div>
          <!-- ShowBiz Carousel -->
          <div id="recent-work" class="showbiz-container sixteen columns" data-animated="fadeInDownBig">
               <!-- Portfolio Entries -->
               <div class="showbiz" data-left="#showbiz_left_1" data-right="#showbiz_right_1">
                    <div class="overflowholder">
                         <ul>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="https://play.google.com/store/apps/details?id=com.vi_m.tax" target="_blank" title="Tax Law Book">
                                                                     <img alt="" src="<?php echo base_url(); ?>assets/images/content/TaxLaw.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Tax Law Book</h5></a>
                         					<span>Compendium of Nigerian Tax Laws</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         	<li>
                         		<div class="portfolio-item media">
                         			<figure>
                         				<div class="mediaholder">
	                         				<a href="#" title="Project Title">
	                         					<img alt="" src="<?php echo base_url(); ?>assets/images/content/blank.jpg"/>
	                         					<div class="hovercover">
	                         						<div class="hovericon"><i class="hoverzoom"></i></div>
	                         					</div>
	                         				</a>
                         				</div>

                         				<figcaption class="item-description item-description-bgwhite">                                       
                         					<a href="project-single-half.html"><h5>Project Title</h5></a>
                         					<span>Here Are The Item Description Details</span>
                         				</figcaption>
                         			</figure>
                         		</div>
                         	</li>
                         </ul>
                         <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                    <!-- Navigation -->
                    <div class="showbiz-navigation">
                         <div id="showbiz_left_1" class="sb-navigation-left"><i class="icon-angle-left"></i></div>
                         <div id="showbiz_right_1" class="sb-navigation-right"><i class="icon-angle-right"></i></div>
                    </div>
                    <div class="clearfix"></div>
               </div>
          </div>
     </div>
     <div class="container">
     	<div class="sixteen columns main-headline">
     		<h3>Doing Business Has Never Been Easier</h3>
     		<p>Enjoy!</p>
     		<hr class="sep20">
     	</div>
     	<div class="sixteen columns button-group centered">
     	<a href="contact.html" class="button gray" data-animated="fadeInLeft">
     			<span class="title">Contact us</span>
     			<span class="subtitle">Drop a line to us</span>
     		</a>

     		<span class="or">or</span>

     		<a href="#content-wrapper" class="button color" data-animated="fadeInRight">
     			<span class="title">View our portfolio</span>
     			<span class="subtitle">Showcasing awesome work</span>
     		</a>
     	</div>
     </div>
	<hr class="sep40"> 
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
     						<span>Delivering innovation tailored to clients' needs...</span>
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
     						<h6><i class="icon-chevron-right"></i><a href="#loginPopup" class="modalbox">Calculators</a></h6>
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

<script src="<?php echo base_url(); ?>assets/scripts/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.themepunch.plugins.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.themepunch.revolution.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.themepunch.showbizpro.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/appear.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/bPopup.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.easing.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.tooltips.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.magnific-popup.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.superfish.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.flexslider.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.jpanelmenu.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.zflickrfeed.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.contact.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.isotope.min.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/jquery.easy-pie-chart.js"></script>
<script src="<?php echo base_url(); ?>assets/scripts/custom.js"></script>

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
              margin: [-180, 60, 50, 60] // top, right, bottom, left
         });
     }); 

     function clickRadioButton(id){
		if(id == "organization"){
			document.getElementById("regContent").innerHTML = '<input type="text" id="namOfOrganizaion" name="namOfOrganizaion" placeholder="Name of the organization" /> <div class="lineh"></div> <select name="typeOfOrganization" id="typeOfOrganization"> <option disabled selected>Type of the organization</option> <option value="Incorporated">Incorporated</option> <option value="Unincorporated">Unincorporated</option> </select> <div class="lineh"></div> <input type="text" name="natureOfBusinessActivity" id="natureOfBusinessActivity" placeholder="Nature of business activity" /> <div class="lineh"></div> <input type="text" name="businessAddress" id="businessAddress" placeholder="Business address" /> <div class="lineh"></div> <input type="text" id="contactPerson" name="contactPerson" placeholder="Contact Person" /> <div class="lineh"></div> <input type="text" id="designation" name="designation" placeholder="Contact person\'s designation" /> <div class="lineh"></div> <input type="text" name="emailAddress" id="emailAddress" placeholder="Contact person\'s email address" > <div class="lineh"></div> <input type="password" name="loginPassword" id="loginPassword" placeholder="Login Password" />';
		}
		else{
			document.getElementById("regContent").innerHTML = '<input type="text" id="emailAddressIndividual" name="emailAddressIndividual" placeholder="Enter your email" /> <div class="lineh"></div> <input type="password" name="password" id="password" placeholder="Enter your password"/> <div class="lineh"></div> <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm your password"/>';
		}
	}  
</script>
</body>
</html>