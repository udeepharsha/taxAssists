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
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/login_signup.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/submit_wht_individual_suppliers.js"></script>


<!--[if lt IE 9]>
	<script src="../../../html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!-- Java Script
================================================== -->
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
<!-- Navigation
================================================== -->
          <div class="thirteen columns">
               <nav id="navigation" class="menu">
                    <ul id="responsive">
                        <li><a href="<?= base_url('home')?>">VAT</a> </li>
                        <li><a href="<?= base_url('wht')?>" id="current">WHT</a></li>
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
     <div id="parallex-inner" class="parallex">
          <div class="container">
               <div class="eight columns"  data-animated="fadeInUp">
                    <h1>WHT (Withholding Tax)</h1>
                    <br/>
                    <p>
                    	Every business organisation (or taxpayer) is required, immediately upon commencement of business activities, to withhold some specified rates of tax from payments made to its suppliers of goods and services (except goods supplied in the ordinary course of business* (see meaning in supply of goods section below) on a monthly basis. Such WHT deductions are to be remitted to either the state or federal tax authorities (depending on suppliers' business status) before the 21 of every month following the month of deduction. The reporting schedule from this page is the statutory WHT remittance schedule which you can use in making your monthly WHT remittances. For other personalized questions and one on one consultations on WHT or your taxes in general, please use the feedback page and we will respond very quickly.
                    </p>
               </div>
               <div class="eight columns">
                    <nav id="breadcrumbs">
                         <ul>
                              <li><a href="#">Home</a></li>
                              <li><a href="#">WHT</a></li>
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
     			<div class="sec1">
     				<h3 class="headline">Individual Suppliers</h3>
     			</div>
     		</a>
     	</div>
     	<div class="four column" style="width:23%">
     		<a href="<?= base_url('wht/spoolReports')?>">
     			<div class="sec2">
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
		<form id="individual_suppliers" name="individual_suppliers" method="POST">
			<input type="hidden" id="userEmail" name="userEmail" />
			<input type="hidden" id="table1" name="table1" />
			<input type="hidden" id="table2" name="table2" />
		
			<div class="twelve columns" id="divLoadSection">
				<h3 class="headline">
					Only wht deducted from individual suppliers, sole proprietors unincorporated entities should be captured here. Such wht should be remitted to individual sates of supplier's residence.
				</h3>

				<div class="twelve columns calculator_sec">
					Month covered:
					<div id="monthCoveredDiv">
						<select class="select-box1" name="monthCovered" id="monthCovered">
							<option value="" selected disabled></option>
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
					Year:
					<div id="yearDiv">
						<select class="select-box1" name="year" id="year">
							<option value="" selected disabled></option>
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
						<input type="text" class="input-box1" name="taxNo" id="taxNo" />
					</div>
				</div>

				<div class="twelve columns calculator_sec">
					FIRS Tax Filing Office
					<div id="firsTaxOfficeDiv">
						<input type="text" class="input-box1" name="firsTaxOffice" id="firsTaxOffice" />
					</div>
				</div>

				<div class="twelve columns calculator_sec">
					State tax filing office (If applicable)
					<div id="stateTaxFillingOfficeDiv">
						<input type="text" class="input-box1" name="stateTaxFillingOffice" id="stateTaxFillingOffice" />
					</div>
				</div>

				<div class="twelve columns calculator_sec">
					Tax station code (For state if applicable)
					<div id="taxStationCodeDiv">
						<input type="text" class="input-box1" name="taxStationCode" id="taxStationCode" />
					</div>
				</div>

				<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->

				<div class="twelve columns">
		     		<h3 class="headline">For suppliers of services</h3>
		     	</div>

				<div class="sixteen columns">
					<div class="rowData0">
						<div id="serviceRow1Sec">
							<div class="rowTD0"><input type="text" id="txt1" placeholder="Supplier Name"/></div>
							<div class="rowTD0"><input type="text" id="txt2" placeholder="Supplier Address" /></div>
							<div class="rowTD0"><input type="text" id="txt3" placeholder="Supplier TIN" /></div>
							<div class="rowTD0">
								<select id="txt4">
									<option value="Rent">Rent</option>
									<option value="Interest">Interest</option>
									<option value="Dividend">Dividend</option>
									<option value="Royalty">Royalty</option>
									<option value="Construction">Construction</option>
									<option value="Commissions">Commissions</option>
									<option value="Professional Service">Professional Service</option>
									<option value="Consultancy Service">Consultancy Service</option>
									<option value="Technical Service">Technical Service</option>
									<option value="Management Service">Management Service</option>
									<option value="Director's fees">Director's fees</option>
									<option value="Contract for supply of other services">Contract for supply of other services</option>
									<option value="Agency Arrangements">Agency Arrangements</option>
									<option value="Others- I cannot determine">Others- I cannot determine</option>
								</select>
							</div>
							<div class="rowTD0"><input type="text" id="txt5" placeholder="Amount" onkeypress="return validateNumeric(event)"/></div>
							<div class="rowTD0">
								<button class="btn" onclick="addNewRowServices()">Add</button>
							</div>
						</div>
					</div>

					<div class="sixteen columns">
						<div class="rowHead">
							<div class="rowHData">Supplier Name</div>
							<div class="rowHData">Supplier Address</div>
							<div class="rowHData">Supplier Tin</div>
							<div class="rowHData">Type of transaction</div>
							<div class="rowHData">Amount (Excluding VAT on invoice NGN)</div>
							<div class="rowHData">Action</div>
						</div>

						<div class="rowData" id="rowDataServices">
							
						</div>
					</div>
				</div>

				<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->
				
				<div class="twelve columns">
					
				</div>

				<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->

				<div class="twelve columns">
		    		<h3 class="headline">For suppliers of goods</h3>
		    		Only purchases made through use of middle men or by issuance of LPO should be captured! Purchases from direct producers or dealers in those goods should not be captured!
		    	</div>

		    	<div class="sixteen columns">
					<div class="rowData0">
						<div id="serviceRow1Sec">
							<div class="rowTD0"><input type="text" id="txt1g" placeholder="Supplier Name"/></div>
							<div class="rowTD0"><input type="text" id="txt2g" placeholder="Supplier Address" /></div>
							<div class="rowTD0"><input type="text" id="txt3g" placeholder="Supplier TIN" /></div>
							<div class="rowTD0">
								<select id="txt4g">
									<option value="Supply of goods">Supply of goods</option>>
								</select>
							</div>
							<div class="rowTD0"><input type="text" id="txt5g" placeholder="Amount" onkeypress="return validateNumeric(event)"/></div>
							<div class="rowTD0">
								<button class="btn" onclick="addNewRowGoods()">Add</button>
							</div>
						</div>
					</div>

					<div class="sixteen columns">
						<div class="rowHead">
							<div class="rowHData">Supplier Name</div>
							<div class="rowHData">Supplier Address</div>
							<div class="rowHData">Supplier Tin</div>
							<div class="rowHData">Type of transaction</div>
							<div class="rowHData">Amount (Excluding VAT on invoice NGN)</div>
							<div class="rowHData">Action</div>
						</div>

						<div class="rowData" id="rowDataGoods">
							
						</div>
					</div>
				</div>

		    	<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->

				<div class="twelve columns">
		     		<div style="float:left;">
		     			<!-- <button class="btn" onclick="saveDetails()">Calculate & Save</button>

		     			<button class="btn" onclick="archiveForMonth()">Archive for month</button> -->

		     			<button type="submit" name="save" class="btn" alt="Save" value="Save">Calculate & Save</button>
						<button type="submit" name="archive" class="btn" alt="Archive" value="archive">Archive for month</button>

		     		</div>

		     		<div style="float:left; margin-left:20px; font-size:20px;" id="loadingSec">
		     		</div>
		     	</div>

		     	<div class="twelve columns sectionSeperator"></div>
				<!-- Section Seperate -->

				<div class="twelve columns" style="font-size:20px;" id="loadingSec1"></div>
			</div>
		</form>
		<div class="four columns">
			<img src="<?php echo base_url(); ?>assets/images/img-services.png" class="sidebarImage">
		</div>
	</div>

    <div class="twelve columns sectionSeperator"></div>
	<!-- Section Seperate -->
     
    <div class="container">
    	<div class="siz-teen columns">
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
        <div class="eight columns">
        	&copy; Copyright 2016 <a href="index.html">Vi-M Professional Solutions</a>. All Rights Reserved.
       	</div>
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
</body>
</html>