var x = 0;
var notCompleted = true;
var isArchived = false;
var archivedDocument = "";
var base_url = 'http://localhost/TaxAssists/';

$(document).ready(function() {


	$('#submit_vat').on('submit', function(event){
		event.preventDefault();
		var formData = new FormData(this);

		archiveForMonth(formData);

		var declare = document.getElementById("declare").checked;

		if(declare){
			document.getElementById("loadingSec").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

			$.ajax({
				url: 'home/submitVat',
				type: 'POST',
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function(data, status) {
					if(data == 1){
						alert("Your vat calculation form is saved! If you think this is final version for month, please archive it. Only archived reports can be spooled later!");
		 				document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';
		 				exportDataSave();
					}
					else{
						document.getElementById("loadingSec").innerHTML = "";
					}
				}
			});

		}
		else{
			alert("Please complete relevant fields before you save or archive!");
		}

	});

});


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
		alert("Please complete relevant fields before you save or archive!");
	}
}

function archiveForMonth2(){
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
						document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!</a>';
						document.getElementById("loadingSec1").innerHTML = '<select id="archiveType" style="width:200px;"> <option value="Excel">Export As Excel</option> <option value="Html">Export As Html</option> </select> <br/> <button onclick="exportData()">Export</button> &nbsp;&nbsp;&nbsp; <button id="exportEmailBtn" onclick="exportDataEmail()">Email Archive</button>';
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
		alert("Please complete field before you save or archive!");
	}
}

function archiveForMonth(formData){

	var declare = document.getElementById("declare").checked;

	if(declare){
		document.getElementById("loadingSec").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

		$.ajax({
			url: 'home/archiveForMonth',
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data, status) {
				if(data == 11){
					alert("Your vat calculation form is archived!");
					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!</a>';
					document.getElementById("loadingSec1").innerHTML = '<select id="archiveType" style="width:200px;"> <option value="Excel">Export As Excel</option> <option value="Html">Export As Html</option> </select> <br/> <button onclick="exportData()">Export</button> &nbsp;&nbsp;&nbsp; <button id="exportEmailBtn" onclick="exportDataEmail()">Email Archive</button>';
				}
				else{
					document.getElementById("loadingSec").innerHTML = "";
				}
			}
		});

	}
	else{
		alert("Please complete field before you save or archive!");
	}
}

function loadVatDetails(){
	var VAT = Parse.Object.extend("VAT");
	var query = new Parse.Query(VAT);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			// alert(resultsObj.get('yearUnderReview'));
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

			changeValues1();
		},
		error: function(error) {
			// alert("Please check your internet connection!");
		}
	});
}

function changeValues1(){
	var outputSalesIncome = document.getElementById("outputSalesIncome").value;
	var exemptedZero = document.getElementById("exemptedZero").value;

	if(outputSalesIncome != "" && exemptedZero != ""){
		document.getElementById("totalSuppliesVat").value = parseInt(outputSalesIncome) - parseInt(exemptedZero);

		x = ((parseInt(outputSalesIncome) - parseInt(exemptedZero))*5)/100;

		document.getElementById("outputVat").value = x;

		notCompleted = false;

		changeValues2();
	}
}

function changeValues2(){
	var vatOnLocalSupplies = document.getElementById("vatOnLocalSupplies").value;
	var vatOnImportedGoods = document.getElementById("vatOnImportedGoods").value;
	var vatOnSubcontracted = document.getElementById("vatOnSubcontracted").value;
	var excessInputVat = document.getElementById("excessInputVat").value;

	if(vatOnLocalSupplies != "" && vatOnImportedGoods != "" && vatOnSubcontracted != ""){
		document.getElementById("totalInputTaxClaimable").value = parseInt(vatOnLocalSupplies) + parseInt(vatOnImportedGoods) + parseInt(vatOnSubcontracted);
	}

	if(vatOnLocalSupplies != "" && vatOnImportedGoods != "" && vatOnSubcontracted != "" && excessInputVat != ""){
		if(notCompleted == true){
			alert("Please complete OUTPUT VAT section first!");
			document.getElementById("excessInputVat").value = "";
		}
		else{
			var y = parseInt(vatOnLocalSupplies) + parseInt(vatOnImportedGoods) + parseInt(vatOnSubcontracted);
			var z = parseInt(excessInputVat);

			document.getElementById("totalInputTaxClaimable").value = y;

			document.getElementById("vatPayableForMonth").value = x - y - z;
		}
	}
}

function exportDataEmail(){
	document.getElementById("exportEmailBtn").disabled = true;
	$.ajax({
        type: 'POST',
        url: 'home/saveHtmlEmail',
        data: $("#submit_vat").serialize(),
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

	if(archiveType == "Html"){
		$.ajax({
            type: 'POST',
            url: 'home/saveHtml',
            data: $("#submit_vat").serialize(),
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
            url: 'home/saveHtml',
            data: $("#submit_vat").serialize(),
            success: function(result) {
            	var res = result.split("#");
            	var linkId = res[res.length - 1];

                window.location = "generate.php?linkId="+linkId;
            }
        });
	}
}

function exportDataSave(){
	$.ajax({
        type: 'POST',
        url: 'home/saveHtmlSave',
        data: $("#submit_vat").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];
            var win = window.open("files/"+linkId, '_blank');
			win.focus();
        }
    });
}