var suppliersOfService = [];
var suppliersOfGoods = [];
var serviceRowCount = 0;
var goodsRowCount = 0;
var isArchived = false;
var archivedDocument = "";
var base_url = 'http://localhost/TaxAssists/';

$(document).ready(function(){
	"use strict";
	$('.ring').fadeOut();
	$('.loader').delay(350).fadeOut('slow');
	$('body').delay(350).css({'overflow':'visible'});
});

function searchWHTReportsForCorporate(){
	var fromCorporate = document.getElementById("fromCorporate").value;
	var toCorporate = document.getElementById("toCorporate").value;

	document.getElementById("resultsSection").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:35px; height:35px; margin-left:15px;">';

	var startMonth = fromCorporate.split("/")[0];
	var endMonth = toCorporate.split("/")[0];
	var startYear = fromCorporate.split("/")[2];
	var toYear = toCorporate.split("/")[2];

	loadReportsCorporate(startMonth, endMonth, startYear, toYear);
}

function searchWHTReportsForIndividual(){
	var fromIndividual = document.getElementById("fromIndividual").value;
	var toIndividual = document.getElementById("toIndividual").value;

	document.getElementById("resultsSection1").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:35px; height:35px; margin-left:15px;">';

	var startMonth = fromIndividual.split("/")[0];
	var endMonth = toIndividual.split("/")[0];
	var startYear = fromIndividual.split("/")[2];
	var toYear = toIndividual.split("/")[2];

	loadReportsIndividual(startMonth, endMonth, startYear, toYear);
}

function loadReportsCorporate(startMonth, endMonth, startYear, toYear){

	$.ajax({
        type: 'POST',
        url: 'loadWatReports',
        success: function(data) {
        	var data = JSON.parse(data);

        	document.getElementById("resultsSection").innerHTML = "";

        	var count = 0;
        	for(var i = 0; i < data.length; i++){
	        	var obj = data[i];			
	        	var year = obj['year'];
	        	var month = obj['month_covered'];
				var startDate = new Date(startYear, parseInt(startMonth), 1);
				var endDate = new Date(toYear, parseInt(endMonth), 1);

				var currentDate = new Date(year, returnMonthValue(month), 1);

				if(currentDate >= startDate && currentDate <= endDate){
					var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadCorporateExcel(\''+obj.id+'\')">&#8594; '+obj['month_archived']+'</a> </div>';

					document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + secDiv;
					
					count++;
				}

			}

			if(count == 0){
				document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
			}
        }
    });

	// var WHTArchives = Parse.Object.extend("WHTArchives");
	// var query = new Parse.Query(WHTArchives);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.find({
	// 	success: function(results) {
	// 		document.getElementById("resultsSection").innerHTML = "";

	// 		var count = 0;

	// 		for (var i = 0; i < results.length; i++) {
	// 			var obj = results[i];

	// 			var year = obj.get('year');
	// 			var month = obj.get('monthCovered');

	// 			var startDate = new Date(startYear, parseInt(startMonth), 1);
	// 			var endDate = new Date(toYear, parseInt(endMonth), 1);

	// 			var currentDate = new Date(year, returnMonthValue(month), 1);

	// 			if(currentDate >= startDate && currentDate <= endDate){
	// 				var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadCorporateExcel(\''+obj.id+'\')">&#8594; '+obj.get('monthArchived')+'</a> </div>';

	// 				document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + secDiv;
					
	// 				count++;
	// 			}
	// 		};

	// 		if(count == 0){
	// 			document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
	// 		}
	// 	},
	// 	error: function(error) {
	// 		alert(error.message);
	// 	}
	// });
}

function downloadCorporateExcel(identity){
	document.getElementById("generatingExcelCorporate").innerHTML = "<img class='loadingImage' src='"+base_url+"assets/images/loading1.gif' />";

	$.ajax({
		url: 'downloadCorporateExcel',
		type: 'POST',
		data: {id:identity},
		success: function(data, status) {
			var data = JSON.parse(data);

			document.getElementById("monthCovered").value = data[0]['month_covered'];
			document.getElementById("year").value = data[0]['year'];
			document.getElementById("taxNo").value = data[0]['tax_no'];
			document.getElementById("firsTaxOffice").value = data[0]['firs_tax_office'];
			document.getElementById("stateTaxFillingOffice").value = data[0]['state_tax_filling_office'];
			document.getElementById("taxStationCode").value = data[0]['tax_station_code'];

			var inSuppliersOfService = JSON.parse(data[0]['suppliers_of_service']);
			var inSuppliersOfGoods = JSON.parse(data[0]['suppliers_of_goods']);

			//Services
			var tableDiv1 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

			for (var i = 0; i < inSuppliersOfService.length; i++) {
				var obj = inSuppliersOfService[i];

				var supplierName = obj['supplierName'];
				var supplierAddress = obj['supplierAddress'];
				var supplierTIN = obj['supplierTIN'];
				var typeOfTransaction = obj['typeOfTransaction'];
				var amount = obj['amount'];
				var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

				amount = parseFloat(amount).toFixed(2);
				whtDeduction = parseFloat(whtDeduction).toFixed(2);

				var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
				tableDiv1 = tableDiv1 + insideDiv;
			}

			tableDiv1 = tableDiv1 + '</table>';

			document.getElementById("table1").value = tableDiv1;

			//Goods
			var tableDiv2 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

			for (var i = 0; i < inSuppliersOfGoods.length; i++) {
				var obj = inSuppliersOfGoods[i];

				var supplierName = obj['supplierName'];
				var supplierAddress = obj['supplierAddress'];
				var supplierTIN = obj['supplierTIN'];
				var typeOfTransaction = obj['typeOfTransaction'];
				var amount = obj['amount'];
				var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

				amount = parseFloat(amount).toFixed(2);
				whtDeduction = parseFloat(whtDeduction).toFixed(2);

				var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
				tableDiv2 = tableDiv2 + insideDiv;
			}

			tableDiv2 = tableDiv2 + '</table>';

			document.getElementById("table2").value = tableDiv2;

			$.ajax({
	            type: 'POST',
	            url: 'saveHtml',
	            data: $("#form_name").serialize(),
	            success: function(result) {
	            	var res = result.split("#");
	            	var linkId = res[res.length - 1];

	                window.location = "../generate.php?linkId="+linkId;

	                 document.getElementById("generatingExcelCorporate").innerHTML = "<img class='doneImage' src='"+base_url+"assets/images/done.png' />";
	            }
	        });

		}
	});

	// var WHTArchives = Parse.Object.extend("WHTArchives");
	// var query = new Parse.Query(WHTArchives);
	// query.equalTo("objectId", identity);
	// query.first({
	// 	success: function(resultsObj) {
	// 		document.getElementById("monthCovered").value = resultsObj.get('monthCovered');
	// 		document.getElementById("year").value = resultsObj.get('year');
	// 		document.getElementById("taxNo").value = resultsObj.get('taxNo');
	// 		document.getElementById("firsTaxOffice").value = resultsObj.get('firsTaxOffice');
	// 		document.getElementById("stateTaxFillingOffice").value = resultsObj.get('stateTaxFillingOffice');
	// 		document.getElementById("taxStationCode").value = resultsObj.get('taxStationCode');

	// 		var inSuppliersOfService = resultsObj.get('suppliersOfService');
	// 		var inSuppliersOfGoods = resultsObj.get('suppliersOfGoods');

	// 		//Services
	// 		var tableDiv1 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	// 		for (var i = 0; i < inSuppliersOfService.length; i++) {
	// 			var obj = inSuppliersOfService[i];

	// 			var supplierName = obj['supplierName'];
	// 			var supplierAddress = obj['supplierAddress'];
	// 			var supplierTIN = obj['supplierTIN'];
	// 			var typeOfTransaction = obj['typeOfTransaction'];
	// 			var amount = obj['amount'];
	// 			var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

	// 			amount = parseFloat(amount).toFixed(2);
	// 			whtDeduction = parseFloat(whtDeduction).toFixed(2);

	// 			var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
	// 			tableDiv1 = tableDiv1 + insideDiv;
	// 		}

	// 		tableDiv1 = tableDiv1 + '</table>';

	// 		document.getElementById("table1").value = tableDiv1;

	// 		//Goods
	// 		var tableDiv2 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	// 		for (var i = 0; i < inSuppliersOfGoods.length; i++) {
	// 			var obj = inSuppliersOfGoods[i];

	// 			var supplierName = obj['supplierName'];
	// 			var supplierAddress = obj['supplierAddress'];
	// 			var supplierTIN = obj['supplierTIN'];
	// 			var typeOfTransaction = obj['typeOfTransaction'];
	// 			var amount = obj['amount'];
	// 			var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

	// 			amount = parseFloat(amount).toFixed(2);
	// 			whtDeduction = parseFloat(whtDeduction).toFixed(2);

	// 			var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
	// 			tableDiv2 = tableDiv2 + insideDiv;
	// 		}

	// 		tableDiv2 = tableDiv2 + '</table>';

	// 		document.getElementById("table2").value = tableDiv2;

	// 		$.ajax({
	//             type: 'POST',
	//             url: 'archieveScripts/wht/saveHmtl.php',
	//             data: $("#form_name").serialize(),
	//             success: function(result) {
	//             	var res = result.split("#");
	//             	var linkId = res[res.length - 1];

	//                 window.location = "generate.php?linkId="+linkId;

	//                  document.getElementById("generatingExcelCorporate").innerHTML = "<img class='doneImage' src='images/done.png' />";
	//             }
	//         });
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function returnMonthValue(month){
	if(month == "January"){
		return 1;
	}
	else if(month == "February"){
		return 2;
	}
	else if(month == "March"){
		return 3;
	}
	else if(month == "April"){
		return 4;
	}
	else if(month == "May"){
		return 5;
	}
	else if(month == "June"){
		return 6;
	}
	else if(month == "July"){
		return 7;
	}
	else if(month == "August"){
		return 8;
	}
	else if(month == "September"){
		return 9;
	}
	else if(month == "October"){
		return 10;
	}
	else if(month == "November"){
		return 11;
	}
	else if(month == "December"){
		return 12;
	}
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

function saveAfetrArchive(whtArchivesId){
	var monthCovered = document.getElementById("monthCovered").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var stateTaxFillingOffice = document.getElementById("stateTaxFillingOffice").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var WHT = Parse.Object.extend("WHT");
	var query = new Parse.Query(WHT);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			var WHT = Parse.Object.extend("WHT");
			var wht = new WHT();

			wht.set("objectId", resultsObj.id);
			wht.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			wht.set("monthCovered", monthCovered);
			wht.set("year", year);
			wht.set("taxNo", taxNo);
			wht.set("firsTaxOffice", firsTaxOffice);
			wht.set("stateTaxFillingOffice", stateTaxFillingOffice);
			wht.set("taxStationCode", taxStationCode);
			wht.set("suppliersOfService", suppliersOfService);
			wht.set("suppliersOfGoods", suppliersOfGoods);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			wht.setACL(acl);

			wht.save(null, {
				success: function(wht) {
					alert("Your Corporate wht calculation form is archived!");
					window.location = "wht_reports_cooporate.html?id="+whtArchivesId;
				},
				error: function(wht, error) {
					alert(error.message);
				}
			});
		},
		error: function(error) {
			alert(error.message);
		}
	});
}

function archiveForMonth(){
	var monthCovered = document.getElementById("monthCovered").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var stateTaxFillingOffice = document.getElementById("stateTaxFillingOffice").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var WHTArchives = Parse.Object.extend("WHTArchives");
	var query = new Parse.Query(WHTArchives);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.equalTo("monthArchived", monthCovered+" "+year);
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

			var WHTArchives = Parse.Object.extend("WHTArchives");
			var whtArchives = new WHTArchives();

			whtArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			whtArchives.set("monthCovered", monthCovered);
			whtArchives.set("year", year);
			whtArchives.set("taxNo", taxNo);
			whtArchives.set("firsTaxOffice", firsTaxOffice);
			whtArchives.set("stateTaxFillingOffice", stateTaxFillingOffice);
			whtArchives.set("taxStationCode", taxStationCode);
			whtArchives.set("suppliersOfService", suppliersOfService);
			whtArchives.set("suppliersOfGoods", suppliersOfGoods);
			whtArchives.set("monthArchived", monthCovered+" "+year);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			whtArchives.setACL(acl);

			whtArchives.save(null, {
				success: function(whtArchives) {
					saveAfetrArchive(whtArchives.id);
					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!';
				},
				error: function(whtArchives, error) {
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

function assistsMe(){
	$.ajax({
		type: 'POST',
		url: 'sendAssistMe.php',
		data: $("#form_name").serialize(),
		success: function(result) {
		}
	});
}

function getWHTDeductionCorporate(amount, type){
	if(type == "Rent"){
		return amount*0.1;
	}
	else if(type == "Interest"){
		return amount*0.1;
	}
	else if(type == "Dividend"){
		return amount*0.1;
	}
	else if(type == "Royalty"){
		return amount*0.1;
	}
	else if(type == "Construction"){
		return amount*0.025;
	}
	else if(type == "Commissions"){
		return amount*0.1;
	}
	else if(type == "Professsional Service"){
		return amount*0.1;
	}
	else if(type == "Consultancy Service"){
		return amount*0.1;
	}
	else if(type == "Technical Service"){
		return amount*0.1;
	}
	else if(type == "Management Service"){
		return amount*0.1;
	}
	else if(type == "Directors’ fees"){
		return amount*0.1;
	}
	else if(type == "Contract for supply of other services"){
		return amount*0.05;
	}
	else if(type == "Agency Arrangements"){
		return amount*0.05;
	}
	else if(type == "Others- I cannot determine"){
		return amount*0.1;
	}
	else if(type == "Supply of goods"){
		return amount*0.05;
	}
}

//WHT Individual Details ---
function loadReportsIndividual(startMonth, endMonth, startYear, toYear){
	// var WHTIndividualArchives = Parse.Object.extend("WHTIndividualArchives");
	// var query = new Parse.Query(WHTIndividualArchives);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.find({
	// 	success: function(results) {
	// 		document.getElementById("resultsSection1").innerHTML = "";

	// 		var count = 0;

	// 		for (var i = 0; i < results.length; i++) {
	// 			var obj = results[i];

	// 			var year = obj.get('year');
	// 			var month = obj.get('monthCovered');

	// 			var startDate = new Date(startYear, parseInt(startMonth), 1);
	// 			var endDate = new Date(toYear, parseInt(endMonth), 1);

	// 			var currentDate = new Date(year, returnMonthValue(month), 1);

	// 			if(currentDate >= startDate && currentDate <= endDate){
	// 				var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadIndividualExcel(\''+obj.id+'\')">&#8594; '+obj.get('monthArchived')+'</a> </div>';

	// 				document.getElementById("resultsSection1").innerHTML = document.getElementById("resultsSection1").innerHTML + secDiv;
					
	// 				count++;
	// 			}
	// 		};

	// 		if(count == 0){
	// 			document.getElementById("resultsSection1").innerHTML = "&nbsp;&nbsp; No reports available!"
	// 		}
	// 	},
	// 	error: function(error) {
	// 		alert(error.message);
	// 	}
	// });

	$.ajax({
        type: 'POST',
        url: 'loadWatReportsIndividuals',
        success: function(data) {
        	var data = JSON.parse(data);

        	console.log(data);

        	document.getElementById("resultsSection1").innerHTML = "";
        	var count = 0;
        	for(var i = 0; i < data.length; i++){
	        	var obj = data[i];			
	        	var year = obj['year'];
	        	var month = obj['month_covered'];

				var startDate = new Date(startYear, parseInt(startMonth), 1);
				var endDate = new Date(toYear, parseInt(endMonth), 1);

				var currentDate = new Date(year, returnMonthValue(month), 1);

				if(currentDate >= startDate && currentDate <= endDate){
					var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadIndividualExcel(\''+obj.id+'\')">&#8594; '+obj['month_archived']+'</a> </div>';

					document.getElementById("resultsSection1").innerHTML = document.getElementById("resultsSection1").innerHTML + secDiv;
					
					count++;
				}
				
			}

			if(count == 0){
				document.getElementById("resultsSection1").innerHTML = "&nbsp;&nbsp; No reports available!"
			}
        }
    });
}

function downloadIndividualExcel(identity){
	document.getElementById("generatingExcelIndividual").innerHTML = "<img class='loadingImage' src='"+base_url+"assets/images/loading1.gif' />";

	$.ajax({
		url: 'downloadIndividualExcel',
		type: 'POST',
		data: {id:identity},
		success: function(data, status) {
			var data = JSON.parse(data);

			document.getElementById("monthCovered").value = data[0]['month_covered'];
			document.getElementById("year").value = data[0]['year'];
			document.getElementById("taxNo").value = data[0]['tax_no'];
			document.getElementById("firsTaxOffice").value = data[0]['firs_tax_office'];
			document.getElementById("stateTaxFillingOffice").value = data[0]['state_tax_filling_office'];
			document.getElementById("taxStationCode").value = data[0]['tax_station_code'];

			var inSuppliersOfService = JSON.parse(data[0]['suppliers_of_service']);
			var inSuppliersOfGoods = JSON.parse(data[0]['suppliers_of_goods']);

			//Services
			var tableDiv1 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

			for (var i = 0; i < inSuppliersOfService.length; i++) {
				var obj = inSuppliersOfService[i];

				var supplierName = obj['supplierName'];
				var supplierAddress = obj['supplierAddress'];
				var supplierTIN = obj['supplierTIN'];
				var typeOfTransaction = obj['typeOfTransaction'];
				var amount = obj['amount'];
				var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

				amount = parseFloat(amount).toFixed(2);
				whtDeduction = parseFloat(whtDeduction).toFixed(2);

				var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
				tableDiv1 = tableDiv1 + insideDiv;
			}

			tableDiv1 = tableDiv1 + '</table>';

			document.getElementById("table1").value = tableDiv1;

			//Goods
			var tableDiv2 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

			for (var i = 0; i < inSuppliersOfGoods.length; i++) {
				var obj = inSuppliersOfGoods[i];

				var supplierName = obj['supplierName'];
				var supplierAddress = obj['supplierAddress'];
				var supplierTIN = obj['supplierTIN'];
				var typeOfTransaction = obj['typeOfTransaction'];
				var amount = obj['amount'];
				var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

				amount = parseFloat(amount).toFixed(2);
				whtDeduction = parseFloat(whtDeduction).toFixed(2);

				var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
				tableDiv2 = tableDiv2 + insideDiv;
			}

			tableDiv2 = tableDiv2 + '</table>';

			document.getElementById("table2").value = tableDiv2;

			$.ajax({
	            type: 'POST',
	            url: 'saveHtml',
	            data: $("#form_name").serialize(),
	            success: function(result) {
	            	var res = result.split("#");
	            	var linkId = res[res.length - 1];

	                window.location = "../generate.php?linkId="+linkId;

	                 document.getElementById("generatingExcelCorporate").innerHTML = "<img class='doneImage' src='"+base_url+"assets/images/done.png' />";
	            }
	        });

		}
	});


	// var WHTIndividualArchives = Parse.Object.extend("WHTIndividualArchives");
	// var query = new Parse.Query(WHTIndividualArchives);
	// query.equalTo("objectId", identity);
	// query.first({
	// 	success: function(resultsObj) {
	// 		document.getElementById("monthCovered").value = resultsObj.get('monthCovered');
	// 		document.getElementById("year").value = resultsObj.get('year');
	// 		document.getElementById("taxNo").value = resultsObj.get('taxNo');
	// 		document.getElementById("firsTaxOffice").value = resultsObj.get('firsTaxOffice');
	// 		document.getElementById("stateTaxFillingOffice").value = resultsObj.get('stateTaxFillingOffice');
	// 		document.getElementById("taxStationCode").value = resultsObj.get('taxStationCode');

	// 		var inSuppliersOfService = resultsObj.get('suppliersOfService');
	// 		var inSuppliersOfGoods = resultsObj.get('suppliersOfGoods');


	// 		//Services
	// 		var tableDiv1 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	// 		for (var i = 0; i < inSuppliersOfService.length; i++) {
	// 			var obj = inSuppliersOfService[i];

	// 			var supplierName = obj['supplierName'];
	// 			var supplierAddress = obj['supplierAddress'];
	// 			var supplierTIN = obj['supplierTIN'];
	// 			var typeOfTransaction = obj['typeOfTransaction'];
	// 			var amount = obj['amount'];
	// 			var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

	// 			amount = parseFloat(amount).toFixed(2);
	// 			whtDeduction = parseFloat(whtDeduction).toFixed(2);

	// 			var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
	// 			tableDiv1 = tableDiv1 + insideDiv;
	// 		}

	// 		tableDiv1 = tableDiv1 + '</table>';

	// 		document.getElementById("table1").value = tableDiv1;

	// 		//Goods
	// 		var tableDiv2 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	// 		for (var i = 0; i < inSuppliersOfGoods.length; i++) {
	// 			var obj = inSuppliersOfGoods[i];

	// 			var supplierName = obj['supplierName'];
	// 			var supplierAddress = obj['supplierAddress'];
	// 			var supplierTIN = obj['supplierTIN'];
	// 			var typeOfTransaction = obj['typeOfTransaction'];
	// 			var amount = obj['amount'];
	// 			var whtDeduction = getWHTDeductionCorporate(amount, typeOfTransaction);

	// 			amount = parseFloat(amount).toFixed(2);
	// 			whtDeduction = parseFloat(whtDeduction).toFixed(2);

	// 			var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
				
	// 			tableDiv2 = tableDiv2 + insideDiv;
	// 		}

	// 		tableDiv2 = tableDiv2 + '</table>';

	// 		document.getElementById("table2").value = tableDiv2;

	// 		$.ajax({
	//             type: 'POST',
	//             url: 'archieveScripts/wht/saveHmtl.php',
	//             data: $("#form_name").serialize(),
	//             success: function(result) {
	//             	var res = result.split("#");
	//             	var linkId = res[res.length - 1];

	//                 window.location = "generate.php?linkId="+linkId;

	// 				document.getElementById("generatingExcelIndividual").innerHTML = "<img class='doneImage' src='images/done.png' />";
	//             }
	//         });
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function saveAfetrArchiveIndividual(whtArchivesId){
	var monthCovered = document.getElementById("monthCovered").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var stateTaxFillingOffice = document.getElementById("stateTaxFillingOffice").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var WHTIndividual = Parse.Object.extend("WHTIndividual");
	var query = new Parse.Query(WHTIndividual);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			var WHTIndividual = Parse.Object.extend("WHTIndividual");
			var wht = new WHTIndividual();

			wht.set("objectId", resultsObj.id);
			wht.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			wht.set("monthCovered", monthCovered);
			wht.set("year", year);
			wht.set("taxNo", taxNo);
			wht.set("firsTaxOffice", firsTaxOffice);
			wht.set("stateTaxFillingOffice", stateTaxFillingOffice);
			wht.set("taxStationCode", taxStationCode);
			wht.set("suppliersOfService", suppliersOfService);
			wht.set("suppliersOfGoods", suppliersOfGoods);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			wht.setACL(acl);

			wht.save(null, {
				success: function(wht) {
					alert("Your wht individual form is archived!");
					window.location = "wht_reports_individual.html?id="+whtArchivesId;
				},
				error: function(wht, error) {
					alert(error.message);
				}
			});
		},
		error: function(error) {
			alert(error.message);
		}
	});
}

function archiveForMonthIndividual(){
	var monthCovered = document.getElementById("monthCovered").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var stateTaxFillingOffice = document.getElementById("stateTaxFillingOffice").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var WHTIndividualArchives = Parse.Object.extend("WHTIndividualArchives");
	var query = new Parse.Query(WHTIndividualArchives);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.equalTo("monthArchived", monthCovered+" "+year);
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

			var WHTIndividualArchives = Parse.Object.extend("WHTIndividualArchives");
			var whtArchives = new WHTIndividualArchives();

			whtArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			whtArchives.set("monthCovered", monthCovered);
			whtArchives.set("year", year);
			whtArchives.set("taxNo", taxNo);
			whtArchives.set("firsTaxOffice", firsTaxOffice);
			whtArchives.set("stateTaxFillingOffice", stateTaxFillingOffice);
			whtArchives.set("taxStationCode", taxStationCode);
			whtArchives.set("suppliersOfService", suppliersOfService);
			whtArchives.set("suppliersOfGoods", suppliersOfGoods);
			whtArchives.set("monthArchived", monthCovered+" "+year);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			whtArchives.setACL(acl);

			whtArchives.save(null, {
				success: function(whttArchives) {
					saveAfetrArchiveIndividual(whtArchives.id);
					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!';
				},
				error: function(whtArchives, error) {
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

function getWHTDeductionIndividual(amount, type){
	if(type == "Rent"){
		return amount*0.1;
	}
	else if(type == "Interest"){
		return amount*0.1;
	}
	else if(type == "Dividend"){
		return amount*0.1;
	}
	else if(type == "Royalty"){
		return amount*0.05;
	}
	else if(type == "Construction"){
		return amount*0.025;
	}
	else if(type == "Commissions"){
		return amount*0.05;
	}
	else if(type == "Professsional Service"){
		return amount*0.05;
	}
	else if(type == "Consultancy Service"){
		return amount*0.05;
	}
	else if(type == "Technical Service"){
		return amount*0.05;
	}
	else if(type == "Management Service"){
		return amount*0.05;
	}
	else if(type == "Contract for supply of other services"){
		return amount*0.05;
	}
	else if(type == "Agency Arrangements"){
		return amount*0.05;
	}
	else if(type == "Director's fees"){
		return amount*0.1;
	}
	else if(type == "Others- I cannot determine"){
		return amount*0.05;
	}
	else if(type == "Supply of goods"){
		return amount*0.05;
	}
}

function exportDataEmail(){
	document.getElementById("userEmail").value = user.get('email');
	document.getElementById("exportEmailBtn").disabled = true;

	//Services
	var tableDiv1 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	for (var i = 0; i < suppliersOfService.length; i++) {
		var supplierName = suppliersOfService[i]['supplierName'];
		var supplierAddress = suppliersOfService[i]['supplierAddress'];
		var supplierTIN = suppliersOfService[i]['supplierTIN'];
		var typeOfTransaction = suppliersOfService[i]['typeOfTransaction'];
		var amount = suppliersOfService[i]['amount'];
		var whtDeduction = suppliersOfService[i]['whtDeduction'];

		amount = parseFloat(amount).toFixed(2);
		whtDeduction = parseFloat(whtDeduction).toFixed(2);

		var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
		
		tableDiv1 = tableDiv1 + insideDiv;
	}

	tableDiv1 = tableDiv1 + '</table>';

	document.getElementById("table1").value = tableDiv1;

	//Goods
	var tableDiv2 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	for (var i = 0; i < suppliersOfGoods.length; i++) {
		var supplierName = suppliersOfGoods[i]['supplierName'];
		var supplierAddress = suppliersOfGoods[i]['supplierAddress'];
		var supplierTIN = suppliersOfGoods[i]['supplierTIN'];
		var typeOfTransaction = suppliersOfGoods[i]['typeOfTransaction'];
		var amount = suppliersOfGoods[i]['amount'];
		var whtDeduction = suppliersOfGoods[i]['whtDeduction'];

		amount = parseFloat(amount).toFixed(2);
		whtDeduction = parseFloat(whtDeduction).toFixed(2);

		var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
		
		tableDiv2 = tableDiv2 + insideDiv;
	}

	tableDiv2 = tableDiv2 + '</table>';

	document.getElementById("table2").value = tableDiv2;
	
	$.ajax({
        type: 'POST',
        url: 'archieveScripts/wht/saveHmtlEmail.php',
        data: $("#form_name").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];

        	alert("Your results are sent to your email.");

        	document.getElementById("exportEmailBtn").disabled = false;
        }
    });
}

function exportData(){
	var archiveType = document.getElementById("archiveType").value;

	//Services
	var tableDiv1 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	for (var i = 0; i < suppliersOfService.length; i++) {
		var supplierName = suppliersOfService[i]['supplierName'];
		var supplierAddress = suppliersOfService[i]['supplierAddress'];
		var supplierTIN = suppliersOfService[i]['supplierTIN'];
		var typeOfTransaction = suppliersOfService[i]['typeOfTransaction'];
		var amount = suppliersOfService[i]['amount'];
		var whtDeduction = suppliersOfService[i]['whtDeduction'];

		amount = parseFloat(amount).toFixed(2);
		whtDeduction = parseFloat(whtDeduction).toFixed(2);

		var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
		
		tableDiv1 = tableDiv1 + insideDiv;
	}

	tableDiv1 = tableDiv1 + '</table>';

	document.getElementById("table1").value = tableDiv1;

	//Goods
	var tableDiv2 = '<table border="1"> <tr> <th>Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

	for (var i = 0; i < suppliersOfGoods.length; i++) {
		var supplierName = suppliersOfGoods[i]['supplierName'];
		var supplierAddress = suppliersOfGoods[i]['supplierAddress'];
		var supplierTIN = suppliersOfGoods[i]['supplierTIN'];
		var typeOfTransaction = suppliersOfGoods[i]['typeOfTransaction'];
		var amount = suppliersOfGoods[i]['amount'];
		var whtDeduction = suppliersOfGoods[i]['whtDeduction'];

		amount = parseFloat(amount).toFixed(2);
		whtDeduction = parseFloat(whtDeduction).toFixed(2);

		var insideDiv = '<tr><td>'+supplierName+'</td>'+'<td>'+supplierAddress+'</td>'+'<td>'+supplierTIN+'</td>'+'<td>'+typeOfTransaction+'</td>'+'<td>'+amount+'</td>'+'<td>'+whtDeduction+'</td></tr>';
		
		tableDiv2 = tableDiv2 + insideDiv;
	}

	tableDiv2 = tableDiv2 + '</table>';

	document.getElementById("table2").value = tableDiv2;

	if(archiveType == "Html"){
		$.ajax({
            type: 'POST',
            url: 'archieveScripts/wht/saveHmtl.php',
            data: $("#form_name").serialize(),
            success: function(result) {
            	var res = result.split("#");
            	var linkId = res[res.length - 1];

                var win = window.open("files/"+linkId, '_blank');
  				win.focus();
            }
        });
	}
	else if(archiveType == "Excel"){
		$.ajax({
            type: 'POST',
            url: 'archieveScripts/wht/saveHmtl.php',
            data: $("#form_name").serialize(),
            success: function(result) {
            	var res = result.split("#");
            	var linkId = res[res.length - 1];

                window.location = "generate.php?linkId="+linkId;
            }
        });
	}
}

function addNewRowServices(){
	var txt1 = document.getElementById("txt1").value;
	var txt2 = document.getElementById("txt2").value;
	var txt3 = document.getElementById("txt3").value;
	var txt4 = document.getElementById("txt4").value;
	var txt5 = document.getElementById("txt5").value;

	if(txt1 == ""){
		alert("Please enter supplier name!");
		return false;
	}

	if(txt2 == ""){
		alert("Please enter supplier address!");
		return false;
	}

	if(txt3 == ""){
		alert("Please enter supplier tin!");
		return false;
	}

	if(txt5 == ""){
		alert("Please enter amount!");
		return false;
	}

	txt5 = parseInt(txt5).toFixed(2);

	var hiddenValue = Math.floor((Math.random() * 10000000000000000000) + 1);

	serviceRowCount++;

	var divSec = '<div id="serviceRow'+serviceRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeServiceItem('+serviceRowCount+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+serviceRowCount+', '+hiddenValue+')">Edit</button></div> </div>';

	document.getElementById("rowDataServices").innerHTML = document.getElementById("rowDataServices").innerHTML + divSec;
	
	var arr = {};
	arr['supplierName'] = txt1;
	arr['supplierAddress'] = txt2;
	arr['supplierTIN'] = txt3;
	arr['typeOfTransaction'] = txt4;
	arr['amount'] = txt5;
	arr['whtDeduction'] = getWHTDeduction(txt5, txt4).toFixed(2);
	arr['hiddenValue'] = hiddenValue;

	suppliersOfService.push(arr);

	document.getElementById("txt1").value = "";
   	document.getElementById("txt2").value = "";
 	document.getElementById("txt3").value = "";
 	document.getElementById("txt4").value = "Rent";
 	document.getElementById("txt5").value = "";
}

function removeServiceItem(id, hiddenValue){
	var r = confirm("Are you sure want to remove?");
	if (r == true) {
	    var index = functiontofindIndexByKeyValue(suppliersOfService, "hiddenValue", hiddenValue);
		if(index != null){
			suppliersOfService.splice(index, 1);
			document.getElementById("serviceRow"+id).style.display = "none";
		}
		else{
			alert("Error in removing item!");
		}
	}
}

function editServiceItem(id, hiddenValue){
	var index = functiontofindIndexByKeyValue(suppliersOfService, "hiddenValue", hiddenValue);

	var supplierName = suppliersOfService[index]['supplierName'];
	var supplierAddress = suppliersOfService[index]['supplierAddress'];
	var supplierTIN = suppliersOfService[index]['supplierTIN'];
	var typeOfTransaction = suppliersOfService[index]['typeOfTransaction'];
	var amount = suppliersOfService[index]['amount'];

	var selectDiv = '<select id="typeOfTransaction'+id+'"> <option value="Rent">Rent</option> <option value="Interest">Interest</option> <option value="Dividend">Dividend</option> <option value="Royalty">Royalty</option> <option value="Construction">Construction</option> <option value="Commissions">Commissions</option> <option value="Professsional Service">Professsional Service</option> <option value="Consultancy Service">Consultancy Service</option> <option value="Technical Service">Technical Service</option> <option value="Management Service">Management Service</option> <option value="Contract for supply of other services">Contract for supply of other services</option> <option value="Agency Arrangements">Agency Arrangements</option> <option value="Others- I cannot determine">Others- I cannot determine</option> </select>';

	document.getElementById("serviceRow"+id).innerHTML = '<div class="rowTD"><input type="text" id="supplierName'+id+'" value='+supplierName+' /></div> <div class="rowTD"><input type="text" id="supplierAddress'+id+'" value='+supplierAddress+' /></div> <div class="rowTD"><input type="text" id="supplierTIN'+id+'" value='+supplierTIN+' /></div> <div class="rowTD"> '+selectDiv+' </div> <div class="rowTD"><input type="text" id="amount'+id+'" value='+parseInt(amount).toFixed(2)+' /></div> <div class="rowTD"> <button class="btn1" onclick="saveEditedRowService('+id+', '+hiddenValue+')">Save</button></div>';

	document.getElementById("typeOfTransaction"+id).value = typeOfTransaction;
}

function saveEditedRowService(id, hiddenValue){
	var supplierName = document.getElementById("supplierName"+id).value;
	var supplierAddress = document.getElementById("supplierAddress"+id).value;
	var supplierTIN = document.getElementById("supplierTIN"+id).value;
	var typeOfTransaction = document.getElementById("typeOfTransaction"+id).value;
	var amount = document.getElementById("amount"+id).value;

	var index = functiontofindIndexByKeyValue(suppliersOfService, "hiddenValue", hiddenValue);

	suppliersOfService[index]['supplierName'] = supplierName;
	suppliersOfService[index]['supplierAddress'] = supplierAddress;
	suppliersOfService[index]['supplierTIN'] = supplierTIN;
	suppliersOfService[index]['typeOfTransaction'] = typeOfTransaction;
	suppliersOfService[index]['amount'] = amount;
	suppliersOfService[index]['whtDeduction'] = getWHTDeduction(amount, typeOfTransaction);

	document.getElementById("serviceRow"+id).innerHTML = '<div class="rowTD">'+supplierName+'</div> <div class="rowTD">'+supplierAddress+'</div> <div class="rowTD">'+supplierTIN+'</div> <div class="rowTD"> '+typeOfTransaction+' </div> <div class="rowTD">'+amount+'</div> <div class="rowTD"> <button class="btn1" onclick="removeServiceItem('+id+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+id+', '+hiddenValue+')">Edit</button> </div>';
}

function addNewRowGoods(){
	var txt1g = document.getElementById("txt1g").value;
	var txt2g = document.getElementById("txt2g").value;
	var txt3g = document.getElementById("txt3g").value;
	var txt4g = document.getElementById("txt4g").value;
	var txt5g = document.getElementById("txt5g").value;

	if(txt1g == ""){
		alert("Please enter supplier name!");
		return false;
	}

	if(txt2g == ""){
		alert("Please enter supplier address!");
		return false;
	}

	if(txt3g == ""){
		alert("Please enter supplier tin!");
		return false;
	}

	if(txt5g == ""){
		alert("Please enter amount!");
		return false;
	}

	txt5g = parseInt(txt5g).toFixed(2);

	var hiddenValue = Math.floor((Math.random() * 10000000000000000000) + 1);

	goodsRowCount++;

	var divSec = '<div id="goodsRow'+goodsRowCount+'"> <div class="rowTD">'+txt1g+'</div> <div class="rowTD">'+txt2g+'</div> <div class="rowTD">'+txt3g+'</div> <div class="rowTD"> '+txt4g+' </div> <div class="rowTD">'+txt5g+'</div> <div class="rowTD"> <button class="btn1" onclick="removeGoodsItem('+goodsRowCount+', '+hiddenValue+')">Delete</button>  &nbsp;&nbsp; <button class="btn1" onclick="editGoodsItem('+goodsRowCount+', '+hiddenValue+')">Edit</button></div> </div>';

	document.getElementById("rowDataGoods").innerHTML = document.getElementById("rowDataGoods").innerHTML + divSec;
	
	var arr = {};
	arr['supplierName'] = txt1g;
	arr['supplierAddress'] = txt2g;
	arr['supplierTIN'] = txt3g;
	arr['typeOfTransaction'] = txt4g;
	arr['amount'] = txt5g;
	arr['whtDeduction'] = getWHTDeduction(txt5g, txt4g).toFixed(2);
	arr['hiddenValue'] = hiddenValue;

	suppliersOfGoods.push(arr);

	document.getElementById("txt1g").value = "";
   	document.getElementById("txt2g").value = "";
 	document.getElementById("txt3g").value = "";
 	document.getElementById("txt4g").value = "Supply of goods";
 	document.getElementById("txt5g").value = "";
}

function removeGoodsItem(id, hiddenValue){
	var r = confirm("Are you sure want to remove?");
	if (r == true) {
	    var index = functiontofindIndexByKeyValue(suppliersOfGoods, "hiddenValue", hiddenValue);
		if(index != null){
			suppliersOfGoods.splice(index, 1);
			document.getElementById("goodsRow"+id).style.display = "none";
		}
		else{
			alert("Error in removing item!");
		}
	}
}

function editGoodsItem(id, hiddenValue){
	var index = functiontofindIndexByKeyValue(suppliersOfGoods, "hiddenValue", hiddenValue);

	var supplierNameg = suppliersOfGoods[index]['supplierName'];
	var supplierAddressg = suppliersOfGoods[index]['supplierAddress'];
	var supplierTINg = suppliersOfGoods[index]['supplierTIN'];
	var typeOfTransactiong = suppliersOfGoods[index]['typeOfTransaction'];
	var amountg = suppliersOfGoods[index]['amount'];

	var selectDivg = '<select id="typeOfTransactiong'+id+'"> <option value="Supply of goods">Supply of goods</option> </select>';

	document.getElementById("goodsRow"+id).innerHTML = '<div class="rowTD"><input type="text" id="supplierNameg'+id+'" value='+supplierNameg+' /></div> <div class="rowTD"><input type="text" id="supplierAddressg'+id+'" value='+supplierAddressg+' /></div> <div class="rowTD"><input type="text" id="supplierTINg'+id+'" value='+supplierTINg+' /></div> <div class="rowTD"> '+selectDivg+' </div> <div class="rowTD"><input type="text" id="amountg'+id+'" value='+amountg+' /></div> <div class="rowTD"> <button class="btn1" onclick="saveEditedRowGoods('+id+', '+hiddenValue+')">Save</button> </div>';
	document.getElementById("typeOfTransactiong"+id).value = typeOfTransactiong;
}

function saveEditedRowGoods(id, hiddenValue){
	var supplierNameg = document.getElementById("supplierNameg"+id).value;
	var supplierAddressg = document.getElementById("supplierAddressg"+id).value;
	var supplierTINg = document.getElementById("supplierTINg"+id).value;
	var typeOfTransactiong = document.getElementById("typeOfTransactiong"+id).value;
	var amountg = document.getElementById("amountg"+id).value;

	var index = functiontofindIndexByKeyValue(suppliersOfGoods, "hiddenValue", hiddenValue);

	suppliersOfGoods[index]['supplierName'] = supplierNameg;
	suppliersOfGoods[index]['supplierAddress'] = supplierAddressg;
	suppliersOfGoods[index]['supplierTIN'] = supplierTINg;
	suppliersOfGoods[index]['typeOfTransaction'] = typeOfTransactiong;
	suppliersOfGoods[index]['amount'] = amountg;
	suppliersOfGoods[index]['whtDeduction'] = getWHTDeduction(amountg, typeOfTransactiong);

	document.getElementById("goodsRow"+id).innerHTML = '<div class="rowTD">'+supplierNameg+'</div> <div class="rowTD">'+supplierAddressg+'</div> <div class="rowTD">'+supplierTINg+'</div> <div class="rowTD"> '+typeOfTransactiong+' </div> <div class="rowTD">'+parseInt(amountg).toFixed(2)+'</div> <div class="rowTD"> <button class="btn1" onclick="removeGoodsItem('+id+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editGoodsItem('+id+', '+hiddenValue+')">Edit</button> </div>';
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) {

		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}
	return null;
}

function getWHTDeduction(amount, type){
	if(type == "Rent"){
		return amount*0.1;
	}
	else if(type == "Interest"){
		return amount*0.1;
	}
	else if(type == "Dividend"){
		return amount*0.1;
	}
	else if(type == "Royalty"){
		return amount*0.1;
	}
	else if(type == "Construction"){
		return amount*0.025;
	}
	else if(type == "Commissions"){
		return amount*0.1;
	}
	else if(type == "Professsional Service"){
		return amount*0.1;
	}
	else if(type == "Consultancy Service"){
		return amount*0.1;
	}
	else if(type == "Technical Service"){
		return amount*0.1;
	}
	else if(type == "Management Service"){
		return amount*0.1;
	}
	else if(type == "Contract for supply of other services"){
		return amount*0.05;
	}
	else if(type == "Agency Arrangements"){
		return amount*0.05;
	}
	else if(type == "Others- I cannot determine"){
		return amount*0.1;
	}
	else if(type == "Supply of goods"){
		return amount*0.05;
	}
}