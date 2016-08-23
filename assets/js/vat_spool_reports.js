var isArchived = false;
var archivedDocument = "";
var base_url = 'http://localhost/TaxAssists/';

$(window).load(function() {
	"use strict";
	$('.ring').fadeOut();
	$('.loader').delay(350).fadeOut('slow');
	$('body').delay(350).css({'overflow':'visible'});
});

function searchForVatReports(){
	var from = document.getElementById("from").value;
	var to = document.getElementById("to").value;

	document.getElementById("resultsSection").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var startMonth = from.split("/")[0];
	var endMonth = to.split("/")[0];
	var startYear = from.split("/")[2];
	var toYear = to.split("/")[2];

	loadReports(startMonth, endMonth, startYear, toYear);
}

function loadReports2(startMonth, endMonth, startYear, toYear){
	var VATArchives = Parse.Object.extend("VATArchives");
	var query = new Parse.Query(VATArchives);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.find({
		success: function(results) {
			document.getElementById("resultsSection").innerHTML = "";

			var count = 0;

			for (var i = 0; i < results.length; i++) {
				var obj = results[i];

				var year = obj.get('yearUnderReview');
				var month = obj.get('monthUnderReview');

				var startDate = new Date(startYear, (parseInt(startMonth) - 1), 1);
				var endDate = new Date(toYear, (parseInt(endMonth) - 1), 1);

				var currentDate = new Date(year, returnMonthValue(month), 1);

				if(currentDate >= startDate && currentDate <= endDate){
					var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadExcel(\''+obj.id+'\')">&#8594; '+obj.get('monthArchived')+'</a> </div><br/>';

					document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + secDiv;
					
					count++;
				}
			}

			if(count == 0){
				document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
			}
		},
		error: function(error) {
			alert(error.message);
			document.getElementById("loadingSec").innerHTML = "";
		}
	});
}

function loadReports(startMonth, endMonth, startYear, toYear){
	// var VATArchives = Parse.Object.extend("VATArchives");
	// var query = new Parse.Query(VATArchives);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.find({
	// 	success: function(results) {
	// 		document.getElementById("resultsSection").innerHTML = "";

	// 		var count = 0;

	// 		for (var i = 0; i < results.length; i++) {
	// 			var obj = results[i];

	// 			var year = obj.get('yearUnderReview');
	// 			var month = obj.get('monthUnderReview');

	// 			var startDate = new Date(startYear, (parseInt(startMonth) - 1), 1);
	// 			var endDate = new Date(toYear, (parseInt(endMonth) - 1), 1);

	// 			var currentDate = new Date(year, returnMonthValue(month), 1);

	// 			if(currentDate >= startDate && currentDate <= endDate){
	// 				var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadExcel(\''+obj.id+'\')">&#8594; '+obj.get('monthArchived')+'</a> </div><br/>';

	// 				document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + secDiv;
					
	// 				count++;
	// 			}
	// 		}

	// 		if(count == 0){
	// 			document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
	// 		}
	// 	},
	// 	error: function(error) {
	// 		alert(error.message);
	// 		document.getElementById("loadingSec").innerHTML = "";
	// 	}
	// });
	$.ajax({
        type: 'POST',
        url: 'loadReports',
        success: function(data) {
        	var data = JSON.parse(data);

        	var count = 0;
        	for(var i = 0; i < data.length; i++){
	        	var obj = data[i];			
	        	var year = obj['year_under_review'];
	        	var month = obj['month_under_review'];

	        	var startDate = new Date(startYear, (parseInt(startMonth) - 1), 1);
				var endDate = new Date(toYear, (parseInt(endMonth) - 1), 1);
				var currentDate = new Date(year, returnMonthValue(month), 1);

				if(currentDate >= startDate && currentDate <= endDate){
					var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadExcel(\''+obj.id+'\')">&#8594; '+obj.get('monthArchived')+'</a> </div><br/>';

					document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + secDiv;
					
					count++;
				}
			}

			if(count == 0){
				document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
			}
        }
    });
}

function downloadExcel(identity){
	document.getElementById("generatingExcel").innerHTML = "<img class='loadingImage' src='images/loading1.gif' />";

	var VATArchives = Parse.Object.extend("VATArchives");
	var query = new Parse.Query(VATArchives);
	query.equalTo("objectId", identity);
	query.first({
		success: function(resultsObj) {			
			document.getElementById("monthUnderReview").value = resultsObj.get('monthUnderReview');
			document.getElementById("yearUnderReview").value = resultsObj.get('yearUnderReview');
			document.getElementById("taxNo").value = resultsObj.get('taxNo');
			document.getElementById("vatNo").value = resultsObj.get('vatNo');
			document.getElementById("firsTaxOffice").value = resultsObj.get('firsTaxOffice');
			document.getElementById("outputSalesIncome").value = resultsObj.get('outputSalesIncome');
			document.getElementById("exemptedZero").value = resultsObj.get('exemptedZero');
			document.getElementById("totalSuppliesVat").value = resultsObj.get('totalSuppliesVat');
			document.getElementById("outputVat").value = resultsObj.get('outputVat');
			document.getElementById("vatOnLocalSupplies").value = resultsObj.get('vatOnLocalSupplies');
			document.getElementById("vatOnImportedGoods").value = resultsObj.get('vatOnImportedGoods');
			document.getElementById("vatOnSubcontracted").value = resultsObj.get('vatOnSubcontracted');
			document.getElementById("totalInputTaxClaimable").value = resultsObj.get('totalInputTaxClaimable');
			document.getElementById("excessInputVat").value = resultsObj.get('excessInputVat');
			document.getElementById("vatPayableForMonth").value = resultsObj.get('vatPayableForMonth');
			document.getElementById("authorizedSignatory").value = resultsObj.get('authorizedSignatory');
			document.getElementById("designation").value = resultsObj.get('designation');
			document.getElementById("signature").value = resultsObj.get('signature');
			document.getElementById("companyStampAndDate").value = resultsObj.get('companyStampAndDate');

			$.ajax({
	            type: 'POST',
	            url: 'archieveScripts/vat/saveHtml.php',
	            data: $("#form_name").serialize(),
	            success: function(result) {
	            	var res = result.split("#");
	            	var linkId = res[res.length - 1];

	                window.location = "generate.php?linkId="+linkId;

	                document.getElementById("generatingExcel").innerHTML = "<img class='doneImage' src='images/done.png' />";
	            }
	        });
		},
		error: function(error) {
			// alert("Please check your internet connection!");
		}
	});
}

function returnMonthValue(month){
	if(month == "January"){
		return 0;
	}
	else if(month == "February"){
		return 1;
	}
	else if(month == "March"){
		return 2;
	}
	else if(month == "April"){
		return 3;
	}
	else if(month == "May"){
		return 4;
	}
	else if(month == "June"){
		return 5;
	}
	else if(month == "July"){
		return 6;
	}
	else if(month == "August"){
		return 7;
	}
	else if(month == "September"){
		return 8;
	}
	else if(month == "October"){
		return 9;
	}
	else if(month == "November"){
		return 10;
	}
	else if(month == "December"){
		return 11;
	}
}

function loadVatDetails(){
	var VATArchives = Parse.Object.extend("VATArchives");
	var query = new Parse.Query(VATArchives);
	query.equalTo("objectId", QueryString.id);
	query.first({
		success: function(resultsObj) {
			if(!resultsObj){
				window.location = "spool-reports.html";
			}

			document.getElementById("headerTitle").innerHTML = '<h2>&nbsp; <b>'+resultsObj.get('monthArchived')+'</b></h2>';
			document.getElementById("monthUnderReview").value = resultsObj.get('monthUnderReview');
			document.getElementById("yearUnderReview").value = resultsObj.get('yearUnderReview');
			document.getElementById("taxNo").value = resultsObj.get('taxNo');
			document.getElementById("vatNo").value = resultsObj.get('vatNo');
			document.getElementById("firsTaxOffice").value = resultsObj.get('firsTaxOffice');
			document.getElementById("outputSalesIncome").value = resultsObj.get('outputSalesIncome');
			document.getElementById("exemptedZero").value = resultsObj.get('exemptedZero');
			document.getElementById("totalSuppliesVat").value = resultsObj.get('totalSuppliesVat');
			document.getElementById("outputVat").value = resultsObj.get('outputVat');
			document.getElementById("vatOnLocalSupplies").value = resultsObj.get('vatOnLocalSupplies');
			document.getElementById("vatOnImportedGoods").value = resultsObj.get('vatOnImportedGoods');
			document.getElementById("vatOnSubcontracted").value = resultsObj.get('vatOnSubcontracted');
			document.getElementById("totalInputTaxClaimable").value = resultsObj.get('totalInputTaxClaimable');
			document.getElementById("excessInputVat").value = resultsObj.get('excessInputVat');
			document.getElementById("vatPayableForMonth").value = resultsObj.get('vatPayableForMonth');
			document.getElementById("authorizedSignatory").value = resultsObj.get('authorizedSignatory');
			document.getElementById("designation").value = resultsObj.get('designation');
			document.getElementById("signature").value = resultsObj.get('signature');
			document.getElementById("companyStampAndDate").value = resultsObj.get('companyStampAndDate');

			$.ajax({
	            type: 'POST',
	            url: 'archieveScripts/vat/saveHmtl.php',
	            data: $("#form_name").serialize(),
	            success: function(result) {
	            	var res = result.split("#");
	            	var linkId = res[res.length - 1];

	                window.location = "generate.php?linkId="+linkId;

					window.close();
	            }
	        });
		},
		error: function(error) {
			// alert("Please check your internet connection!");
		}
	});
}

var QueryString = function () {
  	var query_string = {};
  	var query = window.location.search.substring(1);
  	var vars = query.split("&");
  	for (var i=0;i<vars.length;i++) {
  		var pair = vars[i].split("=");
       	// If first entry with this name
       	if (typeof query_string[pair[0]] === "undefined") {
        	query_string[pair[0]] = pair[1];
        // If second entry with this name
    	} else if (typeof query_string[pair[0]] === "string") {
    		var arr = [ query_string[pair[0]], pair[1] ];
    		query_string[pair[0]] = arr;
        // If third or later entry with this name
    	} else {
    		query_string[pair[0]].push(pair[1]);
    	}
	}
	return query_string;
} ();

function saveAfetrArchive(){
	var monthUnderReview = document.getElementById("monthUnderReview").value;
	var yearUnderReview = document.getElementById("yearUnderReview").value;
	var taxNo = document.getElementById("taxNo").value;
	var vatNo = document.getElementById("vatNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var outputSalesIncome = document.getElementById("outputSalesIncome").value;
	var exemptedZero = document.getElementById("exemptedZero").value;
	var totalSuppliesVat = document.getElementById("totalSuppliesVat").value;
	var outputVat = document.getElementById("outputVat").value;
	var vatOnLocalSupplies = document.getElementById("vatOnLocalSupplies").value;
	var vatOnImportedGoods = document.getElementById("vatOnImportedGoods").value;
	var vatOnSubcontracted = document.getElementById("vatOnSubcontracted").value;
	var totalInputTaxClaimable = document.getElementById("totalInputTaxClaimable").value;
	var excessInputVat = document.getElementById("excessInputVat").value;
	var vatPayableForMonth = document.getElementById("vatPayableForMonth").value;
	var authorizedSignatory = document.getElementById("authorizedSignatory").value;
	var designation = document.getElementById("designation").value;
	var signature = document.getElementById("signature").value;
	var companyStampAndDate = document.getElementById("companyStampAndDate").value;
	var declare = document.getElementById("declare").checked;

	if(declare){
		var VAT = Parse.Object.extend("VAT");
		var query = new Parse.Query(VAT);
		query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
		query.first({
			success: function(resultsObj) {
				var VAT = Parse.Object.extend("VAT");
				var vat = new VAT();

				vat.set("objectId", resultsObj.id);
				vat.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
				vat.set("monthUnderReview", monthUnderReview);
				vat.set("yearUnderReview", yearUnderReview);
				vat.set("taxNo", taxNo);
				vat.set("vatNo", vatNo);
				vat.set("firsTaxOffice", firsTaxOffice);
				vat.set("outputSalesIncome", outputSalesIncome);
				vat.set("exemptedZero", exemptedZero);
				vat.set("totalSuppliesVat", totalSuppliesVat);
				vat.set("outputVat", outputVat);
				vat.set("vatOnLocalSupplies", vatOnLocalSupplies);
				vat.set("vatOnImportedGoods", vatOnImportedGoods);
				vat.set("vatOnSubcontracted", vatOnSubcontracted);
				vat.set("totalInputTaxClaimable", totalInputTaxClaimable);
				vat.set("excessInputVat", excessInputVat);
				vat.set("vatPayableForMonth", vatPayableForMonth);
				vat.set("authorizedSignatory", authorizedSignatory);
				vat.set("designation", designation);
				vat.set("signature", signature);
				vat.set("companyStampAndDate", companyStampAndDate);

				var acl = new Parse.ACL();
				acl.setPublicReadAccess(false);
				acl.setPublicWriteAccess(false);
				acl.setReadAccess(user, true);
				acl.setWriteAccess(user, true);
				vat.setACL(acl);

				vat.save(null, {
					success: function(vat) {
						//Success
					},
					error: function(vat, error) {
						alert(error.message);
					}
				});
			},
			error: function(error) {
				alert(error.message);
			}
		});
	}
	else{
		alert("You must agree to the terms & conditions before save or archive!");
	}
}

function archiveForMonth(){
	var monthUnderReview = document.getElementById("monthUnderReview").value;
	var yearUnderReview = document.getElementById("yearUnderReview").value;
	var taxNo = document.getElementById("taxNo").value;
	var vatNo = document.getElementById("vatNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var outputSalesIncome = document.getElementById("outputSalesIncome").value;
	var exemptedZero = document.getElementById("exemptedZero").value;
	var totalSuppliesVat = document.getElementById("totalSuppliesVat").value;
	var outputVat = document.getElementById("outputVat").value;
	var vatOnLocalSupplies = document.getElementById("vatOnLocalSupplies").value;
	var vatOnImportedGoods = document.getElementById("vatOnImportedGoods").value;
	var vatOnSubcontracted = document.getElementById("vatOnSubcontracted").value;
	var totalInputTaxClaimable = document.getElementById("totalInputTaxClaimable").value;
	var excessInputVat = document.getElementById("excessInputVat").value;
	var vatPayableForMonth = document.getElementById("vatPayableForMonth").value;
	var authorizedSignatory = document.getElementById("authorizedSignatory").value;
	var designation = document.getElementById("designation").value;
	var signature = document.getElementById("signature").value;
	var companyStampAndDate = document.getElementById("companyStampAndDate").value;
	var declare = document.getElementById("declare").checked;

	if(declare){
		document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

		var VATArchives = Parse.Object.extend("VATArchives");
		var query = new Parse.Query(VATArchives);
		query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
		query.equalTo("monthArchived", monthUnderReview+" "+yearUnderReview);
		query.first({
			success: function(resultsObj) {
				console.log(resultsObj);

				if(resultsObj){
					resultsObj.destroy({
						success: function(resultsObj) {
							// alert("Removed existing archived file!");
						},
						error: function(resultsObj, error) {
						}
					});
				}

				var VATArchives = Parse.Object.extend("VATArchives");
				var vatArchives = new VATArchives();

				vatArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
				vatArchives.set("monthUnderReview", monthUnderReview);
				vatArchives.set("yearUnderReview", yearUnderReview);
				vatArchives.set("taxNo", taxNo);
				vatArchives.set("vatNo", vatNo);
				vatArchives.set("firsTaxOffice", firsTaxOffice);
				vatArchives.set("outputSalesIncome", outputSalesIncome);
				vatArchives.set("exemptedZero", exemptedZero);
				vatArchives.set("totalSuppliesVat", totalSuppliesVat);
				vatArchives.set("outputVat", outputVat);
				vatArchives.set("vatOnLocalSupplies", vatOnLocalSupplies);
				vatArchives.set("vatOnImportedGoods", vatOnImportedGoods);
				vatArchives.set("vatOnSubcontracted", vatOnSubcontracted);
				vatArchives.set("totalInputTaxClaimable", totalInputTaxClaimable);
				vatArchives.set("excessInputVat", excessInputVat);
				vatArchives.set("vatPayableForMonth", vatPayableForMonth);
				vatArchives.set("authorizedSignatory", authorizedSignatory);
				vatArchives.set("designation", designation);
				vatArchives.set("signature", signature);
				vatArchives.set("companyStampAndDate", companyStampAndDate);
				vatArchives.set("monthArchived", monthUnderReview+" "+yearUnderReview);

				var acl = new Parse.ACL();
				acl.setPublicReadAccess(false);
				acl.setPublicWriteAccess(false);
				acl.setReadAccess(user, true);
				acl.setWriteAccess(user, true);
				vatArchives.setACL(acl);

				vatArchives.save(null, {
					success: function(vatArchives) {
						saveAfetrArchive();
						alert("Your vat calculation form is archived!");
						document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!';
					},
					error: function(vatArchives, error) {
						alert(error.message);
						document.getElementById("loadingSec").innerHTML = "";
					}
				});
			},
			error: function(error) {
				alert(error.message);
				document.getElementById("loadingSec").innerHTML = "";
			}
		});
	}
	else{
		alert("You must agree to the terms & conditions before save or archive!");
	}
}

function exportDataEmail(){
	document.getElementById("userEmail").value = user.get('email');
	document.getElementById("exportEmailBtn").disabled = true;

	$.ajax({
        type: 'POST',
        url: 'archieveScripts/vat/saveHmtlEmail.php',
        data: $("#form_name").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];

        	alert("Your results are sent to your email.");

        	document.getElementById("exportEmailBtn").disabled = false;
        	
            var win = window.open("files/"+linkId, '_blank');
			win.focus();
        }
    });
}