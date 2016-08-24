var x = 0;
var notCompleted = true;
var isArchived = false;
var archivedDocument = "";
var base_url = 'http://localhost/TaxAssists/';

$(document).ready(function() {

	changeValues1();


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