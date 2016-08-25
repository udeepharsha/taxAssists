var monthlyValues = [];
var yearlyValues = [];
var monthlyRowCount = 0;
var yearlyRowCount = 0;
var isArchived = false;
var archivedDocument = "";
var employeeNamesArray = [];
var employeeTINs = [];
var employeeAddresses = [];
var employeeCumulativeArray = [];
var employeeCumulativeArray1 = [];
var employeeCumulativeArray2 = [];
var employeeCumulativeArray3 = [];
var employeeLength;

$(document).ready(function() {
	"use strict";
	$('.ring').fadeOut();
	$('.loader').delay(350).fadeOut('slow');
	$('body').delay(350).css({'overflow':'visible'});
});

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

function loadEmployees(){

	$.ajax({
		url: 'loadEmployees',
		type: 'POST',
		success: function(data, status) {
			var data = JSON.parse(data);
			var employeeDetails = data[0]['employeeDetails'];

			var employeeDiv = "";

			for (var i = 0; i < employeeDetails.length; i++) {
				var name = employeeDetails[i].employeeName;
				employeeDiv = employeeDiv + "<option value='"+name+"'>"+name+"</option>";
			}

			document.getElementById("employeeSec1").innerHTML = "<select id='empSelect1'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";
			document.getElementById("employeeSec2").innerHTML = "<select id='empSelect2'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";
		}
	});

	// var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
	// var query = new Parse.Query(PAYEEmployee);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.first({
	// 	success: function(resultsObj) {
	// 		if(resultsObj != undefined){
	// 			var employeeDetails = resultsObj.get('employeeDetails');

	// 			var employeeDiv = "";

	// 			for (var i = 0; i < employeeDetails.length; i++) {
	// 				var name = employeeDetails[i].employeeName;
	// 				employeeDiv = employeeDiv + "<option value='"+name+"'>"+name+"</option>";
	// 			}

	// 			document.getElementById("employeeSec1").innerHTML = "<select id='empSelect1'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";
	// 			document.getElementById("employeeSec2").innerHTML = "<select id='empSelect2'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";
	// 		}
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function changeSpoolType1(){
	var spoolType1 = document.getElementById("spoolType1").value;

	if(spoolType1 == "Spool Reports By Employee"){
		document.getElementById("employeeSec1").style.display = "";
	}
	else{
		document.getElementById("employeeSec1").style.display = "none";
	}
}

function changeSpoolType2(){
	var spoolType2 = document.getElementById("spoolType2").value;

	if(spoolType2 == "Spool Reports By Employee"){
		document.getElementById("employeeSec2").style.display = "";
	}
	else{
		document.getElementById("employeeSec2").style.display = "none";
	}
}

function searchMonthReports(){
	var spoolType1 = document.getElementById("spoolType1").value;

	if(spoolType1 == "Spool Reports By Employee"){
		var empName = document.getElementById("empSelect1").value;
		var fromMonthly = document.getElementById("fromMonthly").value;
		var toMonthly = document.getElementById("toMonthly").value;

		var startMonth = fromMonthly.split("/")[0];
		var endMonth = toMonthly.split("/")[0];
		var startYear = fromMonthly.split("/")[2];
		var toYear = toMonthly.split("/")[2];

		document.getElementById("resultsSection").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

		loadMonthlyReports1(empName, startMonth, endMonth, startYear, toYear);
	}
	else{
		var fromMonthly = document.getElementById("fromMonthly").value;
		var toMonthly = document.getElementById("toMonthly").value;

		var startMonth = fromMonthly.split("/")[0];
		var endMonth = toMonthly.split("/")[0];
		var startYear = fromMonthly.split("/")[2];
		var toYear = toMonthly.split("/")[2];

		document.getElementById("resultsSection").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

		loadMonthlyReports2(startMonth, endMonth, startYear, toYear);
	}
}

function searchAnnualReports(){
	var spoolType2 = document.getElementById("spoolType2").value;

	if(spoolType2 == "Spool Reports By Employee"){
		var empName = document.getElementById("empSelect2").value;
		var fromYearly = document.getElementById("fromYearly").value;

		document.getElementById("resultsSection1").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

		loadYearlyReports1(empName, fromYearly);
	}
	else{
		var fromYearly = document.getElementById("fromYearly").value;

		document.getElementById("resultsSection1").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

		loadYearlyReports2(fromYearly);
	}
}

function loadEmployees1(){

	$.ajax({
		url: 'loadEmployees',
		type: 'POST',
		success: function(data, status) {
			var data = JSON.parse(data);

			var employeeDetails = JSON.parse(data[0]['employee_details']);

			var employeeDiv = "";

			employeeLength = employeeDetails.length;

			for (var i = 0; i < employeeDetails.length; i++) {
				var name = employeeDetails[i].employeeName;
				employeeDiv = employeeDiv + "<option value='"+name+"'>"+name+"</option>";

				employeeTINs.push(employeeDetails[i].taxIdentificationNumber);
				employeeAddresses.push(employeeDetails[i].employeeAddress);
				employeeNamesArray.push(name);
			}

			emptyCumulativeArray();

			document.getElementById("employeeSec1").innerHTML = "<select id='empSelect1'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";
			document.getElementById("employeeSec2").innerHTML = "<select id='empSelect2'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";

		}
	});

}

function emptyCumulativeArray() {
	employeeCumulativeArray = [];
	employeeCumulativeArray1 = [];
	employeeCumulativeArray2 = [];
	employeeCumulativeArray3 = [];
	
	for (var i = 0; i < employeeLength; i++) {
		employeeCumulativeArray.push(0);
		employeeCumulativeArray1.push(0);
		employeeCumulativeArray2.push(0);
		employeeCumulativeArray3.push(0);
	}
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) {

		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}
	return null;
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

//Monthly Reports
function loadMonthlyReports1(empName, startMonth, endMonth, startYear, toYear){

	$.ajax({
        type: 'POST',
        url: 'loadMonthlyReports1',
        success: function(data) {
        	var data = JSON.parse(data);

        	document.getElementById("resultsSection").innerHTML = "";

        	var count = 0;
			var newArr = [];

        	for(var i = 0; i < data.length; i++){
	        	var obj = data[i];	

	        	var index = getIndexIfObjWithOwnAttr(  JSON.parse(obj['monthly_values']), "employeeName", empName);

	        	if(index >= 0){
	        		var year = obj['year'];
		        	var month = obj['month_archived'].split(" ")[0];

		        	var startDate = new Date(startYear, parseInt(startMonth), 1);
					var endDate = new Date(toYear, parseInt(endMonth), 1);

					var currentDate = new Date(year, returnMonthValue(month), 1);

					if(currentDate >= startDate && currentDate <= endDate){
						var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadExcelReports1(\''+obj['id']+'\', \''+empName+'\')">&#8594; '+obj['month_archived']+'</a> </div>';

						var item = {};
						item['divSec'] = secDiv;
						item['number'] = month;

						newArr.push(item);
						
						count++;
					}
	        	}
	        	else{
					newArr.sortOn("number");
					// console.log(newArr);
					for (var i = 0; i < newArr.length; i++) {
						var obj = newArr[i];
						document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + obj['divSec'];
					}
				}
			}

			if(count == 0){
				document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
			}
			else{
				newArr.sortOn("number");
				// console.log(newArr);

				for (var i = 0; i < newArr.length; i++) {
					var obj = newArr[i];

					document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + obj['divSec'];
				}
			}
        }
    });



	// var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	// var query = new Parse.Query(PAYEMonthlyArchives);

	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.ascending("createdAt");

	// query.find({
	// 	success: function(results) {
	// 		document.getElementById("resultsSection").innerHTML = "";

	// 		var count = 0;
	// 		var newArr = [];

	// 		for (var i = 0; i < results.length; i++) {
	// 			var obj = results[i];

	// 			var index = getIndexIfObjWithOwnAttr(obj.get('monthlyValues'), "employeeName", empName);

	// 			if(index >= 0){
	// 				var year = obj.get('year');
	// 				var month = obj.get('monthArchived').split(" ")[0];

	// 				var startDate = new Date(startYear, parseInt(startMonth), 1);
	// 				var endDate = new Date(toYear, parseInt(endMonth), 1);

	// 				var currentDate = new Date(year, returnMonthValue(month), 1);

	// 				if(currentDate >= startDate && currentDate <= endDate){
	// 					var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadExcelReports1(\''+obj.id+'\', \''+empName+'\')">&#8594; '+obj.get('monthArchived')+'</a> </div>';

	// 					var item = {};
	// 					item['divSec'] = secDiv;
	// 					item['number'] = month;

	// 					newArr.push(item);
						
	// 					count++;
	// 				}
	// 			}
	// 		}

	// 		if(count == 0){
	// 			document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
	// 		}
	// 		else{
	// 			newArr.sortOn("number");
	// 			// console.log(newArr);

	// 			for (var i = 0; i < newArr.length; i++) {
	// 				var obj = newArr[i];

	// 				document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + obj['divSec'];
	// 			}
	// 		}
	// 	},
	// 	error: function(error) {
	// 		alert(error.message);
	// 	}
	// });
}

function downloadExcelReports1(identity, employee) {
	document.getElementById("generatingExcel").innerHTML = "<img class='loadingImage' src='"+base_url+"assets/images/loading1.gif' />";
	loadPayeDetailsMonthlyByEmployee(identity, employee);
}

Array.prototype.sortOn = function(key){
    this.sort(function(a, b){
        if(a[key] < b[key]){
            return -1;
        }else if(a[key] > b[key]){
            return 1;
        }
        return 0;
    });
}

function loadMonthlyReports2(startMonth, endMonth, startYear, toYear){

	$.ajax({
        type: 'POST',
        url: 'loadMonthlyReports1',
        success: function(data) {
        	var data = JSON.parse(data);

        	document.getElementById("resultsSection").innerHTML = "";

        	var count = 0;
			var newArr = [];

        	for(var i = 0; i < data.length; i++){
	        	var obj = data[i];	

        		var year = obj['year'];
	        	var month = obj['month_archived'].split(" ")[0];

	        	var startDate = new Date(startYear, parseInt(startMonth), 1);
				var endDate = new Date(toYear, parseInt(endMonth), 1);

				var currentDate = new Date(year, returnMonthValue(month), 1);

				if(currentDate >= startDate && currentDate <= endDate){
					var secDiv = '<div class="twelve columns spoolResultsItem"> <a href="#" onclick="downloadExcelReports2(\''+obj['id']+'\')">&#8594; '+obj['month_archived']+'</a> </div>';

					var item = {};
					item['divSec'] = secDiv;
					item['number'] = month;

					newArr.push(item);
					
					count++;
				}
			}

			if(count == 0){
				document.getElementById("resultsSection").innerHTML = "&nbsp;&nbsp; No reports available!"
			}

			else{
				newArr.sortOn("number");

				for (var i = 0; i < newArr.length; i++) {
					var obj = newArr[i];

					document.getElementById("resultsSection").innerHTML = document.getElementById("resultsSection").innerHTML + obj['divSec'];
				}
			}
        }
    });
}

function downloadExcelReports2(identity) {
	document.getElementById("generatingExcel").innerHTML = "<img class='loadingImage' src='"+base_url+"assets/images/loading1.gif' />";
	loadPayeDetailsMonthly(identity);
}

var getIndexIfObjWithOwnAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }

    return -1;
}

function loadPayeDetailsMonthly(identity){
	monthlyValues = [];

	$.ajax({
		url: 'loadPayeDetailsMonthly',
		type: 'POST',
		data: {id:identity},
		success: function(data, status) {
			var data = JSON.parse(data);
			document.getElementById("month").value = data[0]['month'];
			document.getElementById("year").value = data[0]['year'];
			document.getElementById("taxNo").value = data[0]['tax_no'];
			document.getElementById("taxId").value = data[0]['tax_id'];
			document.getElementById("stateBir").value = data[0]['state_bir'];
			document.getElementById("taxStationCode").value = data[0]['tax_station_code'];

			var loadArray =  JSON.parse(data[0]['monthly_values']);

			for (var i = 0; i < loadArray.length; i++) {
					var obj = loadArray[i];

					var txt1 = obj['employeeName'];
					var txt2 = obj['totalEmployment'];
					var txt3 = obj['benefitsInKind'];
					var txt4 = obj['incomeFromSource'];
					var txt5 = obj['pension'];
					var hiddenValue = obj['hiddenValue'];

					monthlyRowCount++;

					var divSec = '<div id="monthlyValueRow'+monthlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemMonthly('+monthlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

					// document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;

					/*-----------------------------------------------*/
					var value1 = 0;
					var value2 = 0;

					if(txt5 == "Yes"){
						value1 = parseInt((parseInt(txt2) + parseInt(txt3))*0.1);
						value2 = parseInt(txt2) + parseInt(txt4) + parseInt(txt3) + value1;
					}
					else{
						value1 = 0;
						value2 = parseInt(txt2) + parseInt(txt4) + parseInt(txt3);
					}

					var value3 = 0;

					if(value2*0.01 < 200000/12){
						value3 = parseInt(200000/12);
					}
					else{
						value3 = parseInt(value2*0.01);
					}

					var value4 = parseInt(value2 * 0.2);

					var value5 = 0;
					var value6 = 0;

					if(txt5 == "Yes"){
						value5 = parseInt((parseInt(txt2) + parseInt(txt3))*0.1 + (parseInt(txt2) + parseInt(txt3))*0.08);
						value6 = value3 + value4 + value5;
					}
					else{
						value5 = 0;
						value6 = value3 + value4;
					}

					var value7 = value2 - value6;

					var value8 = 0;

					if(value7 > 0){
						if(value7 > 300000/12){
							value8 = parseInt((300000/12)*0.07);
						}
						else{
							value8 = parseInt(value7*0.07)
						}
					}
					else{
						value8 = value2*0.01;
					}

					var value9 = 0;

					if((value7 - 300000/12) > 0){
						if(value7 > 600000/12){
							value9 = 300000/12*0.11;
						}
						else{
							value9 = (value7 - 300000/12)*0.11;
						}
					}
					else{
						value9 = 0;
					}

					var value10 = 0;

					if((value7 - 600000/12) > 0){
						if(value7 > 1100000/12){
							value10 = 500000/12*0.15;
						}
						else{
							value10 = (value7 - 600000/12)*0.15;
						}
					}
					else{
						value10 = 0;
					}

					var value11 = 0;

					if((value7 - 1100000/12) > 0){
						if(value7 > 1600000/12){
							value11 = 500000/12*0.19;
						}
						else{
							value11 = (value7 - 1100000/12)*0.19;
						}
					}
					else{
						value11 = 0;
					}


					var value12 = 0;

					if((value7 - 1600000/12) > 0){
						if(value7 > 3200000/12){
							value12 = 1600000/12*0.19;
						}
						else{
							value12 = (value7 - 1600000/12)*0.19;
						}
					}
					else{
						value12 = 0;
					}

					var value13 = 0;

					if((value7 - 3200000/12) > 0){
						if(value7 > 3200000/12){
							value13 = (value7 - 3200000/12)*0.24;
						}
						else{
							value13 = 0;
						}
					}
					else{
						value13 = 0;
					}

					var value14 = value8 + value9 + value10  + value11 + value12 + value13;

					var value15 = 0;

					if(txt5 == "Yes"){
						value15 = value5 + value14;
					}
					else{
						value15 = value14;
					}
					
					var value16 = parseInt(value2 - value15);

					/*-----------------------------------------------*/
					
					var arr = {};
					arr['employeeName'] = txt1;
					arr['totalEmployment'] = txt2;
					arr['benefitsInKind'] = txt3;
					arr['incomeFromSource'] = txt4;
					arr['pension'] = txt5;
					arr['cumulativeNetEmoluments'] = value16;
					arr['cumulativeTaxFreeEmoluments'] = value6 - value1;
					arr['cumulativeTaxableEmoluments'] = value7;
					arr['correspondingCumulativeTax'] = value14;
					arr['hiddenValue'] = hiddenValue;

					monthlyValues.push(arr);
					//console.log("#######   " + arr['employeeName']);
				}

			calculateCumulativeFigures(returnMonthValue(data[0]['month']), data[0]['year']);


		}
	});



	// var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	// var query = new Parse.Query(PAYEMonthlyArchives);
	// query.equalTo("objectId", identity);
	// query.first({
	// 	success: function(resultsObj) {
	// 		if(resultsObj){
	// 			document.getElementById("month").value = resultsObj.get('month');
	// 			document.getElementById("year").value = resultsObj.get('year');
	// 			document.getElementById("taxNo").value = resultsObj.get('taxNo');
	// 			document.getElementById("taxId").value = resultsObj.get('taxId');
	// 			document.getElementById("stateBir").value = resultsObj.get('stateBir');
	// 			document.getElementById("taxStationCode").value = resultsObj.get('taxStationCode');

	// 			var loadArray = resultsObj.get('monthlyValues');

	// 			for (var i = 0; i < loadArray.length; i++) {
	// 				var obj = loadArray[i];

	// 				var txt1 = obj['employeeName'];
	// 				var txt2 = obj['totalEmployment'];
	// 				var txt3 = obj['benefitsInKind'];
	// 				var txt4 = obj['incomeFromSource'];
	// 				var txt5 = obj['pension'];
	// 				var hiddenValue = obj['hiddenValue'];

	// 				monthlyRowCount++;

	// 				var divSec = '<div id="monthlyValueRow'+monthlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemMonthly('+monthlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

	// 				// document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;

	// 				/*-----------------------------------------------*/
	// 				var value1 = 0;
	// 				var value2 = 0;

	// 				if(txt5 == "Yes"){
	// 					value1 = parseInt((parseInt(txt2) + parseInt(txt3))*0.1);
	// 					value2 = parseInt(txt2) + parseInt(txt4) + parseInt(txt3) + value1;
	// 				}
	// 				else{
	// 					value1 = 0;
	// 					value2 = parseInt(txt2) + parseInt(txt4) + parseInt(txt3);
	// 				}

	// 				var value3 = 0;

	// 				if(value2*0.01 < 200000/12){
	// 					value3 = parseInt(200000/12);
	// 				}
	// 				else{
	// 					value3 = parseInt(value2*0.01);
	// 				}

	// 				var value4 = parseInt(value2 * 0.2);

	// 				var value5 = 0;
	// 				var value6 = 0;

	// 				if(txt5 == "Yes"){
	// 					value5 = parseInt((parseInt(txt2) + parseInt(txt3))*0.1 + (parseInt(txt2) + parseInt(txt3))*0.08);
	// 					value6 = value3 + value4 + value5;
	// 				}
	// 				else{
	// 					value5 = 0;
	// 					value6 = value3 + value4;
	// 				}

	// 				var value7 = value2 - value6;

	// 				var value8 = 0;

	// 				if(value7 > 0){
	// 					if(value7 > 300000/12){
	// 						value8 = parseInt((300000/12)*0.07);
	// 					}
	// 					else{
	// 						value8 = parseInt(value7*0.07)
	// 					}
	// 				}
	// 				else{
	// 					value8 = value2*0.01;
	// 				}

	// 				var value9 = 0;

	// 				if((value7 - 300000/12) > 0){
	// 					if(value7 > 600000/12){
	// 						value9 = 300000/12*0.11;
	// 					}
	// 					else{
	// 						value9 = (value7 - 300000/12)*0.11;
	// 					}
	// 				}
	// 				else{
	// 					value9 = 0;
	// 				}

	// 				var value10 = 0;

	// 				if((value7 - 600000/12) > 0){
	// 					if(value7 > 1100000/12){
	// 						value10 = 500000/12*0.15;
	// 					}
	// 					else{
	// 						value10 = (value7 - 600000/12)*0.15;
	// 					}
	// 				}
	// 				else{
	// 					value10 = 0;
	// 				}

	// 				var value11 = 0;

	// 				if((value7 - 1100000/12) > 0){
	// 					if(value7 > 1600000/12){
	// 						value11 = 500000/12*0.19;
	// 					}
	// 					else{
	// 						value11 = (value7 - 1100000/12)*0.19;
	// 					}
	// 				}
	// 				else{
	// 					value11 = 0;
	// 				}


	// 				var value12 = 0;

	// 				if((value7 - 1600000/12) > 0){
	// 					if(value7 > 3200000/12){
	// 						value12 = 1600000/12*0.19;
	// 					}
	// 					else{
	// 						value12 = (value7 - 1600000/12)*0.19;
	// 					}
	// 				}
	// 				else{
	// 					value12 = 0;
	// 				}

	// 				var value13 = 0;

	// 				if((value7 - 3200000/12) > 0){
	// 					if(value7 > 3200000/12){
	// 						value13 = (value7 - 3200000/12)*0.24;
	// 					}
	// 					else{
	// 						value13 = 0;
	// 					}
	// 				}
	// 				else{
	// 					value13 = 0;
	// 				}

	// 				var value14 = value8 + value9 + value10  + value11 + value12 + value13;

	// 				var value15 = 0;

	// 				if(txt5 == "Yes"){
	// 					value15 = value5 + value14;
	// 				}
	// 				else{
	// 					value15 = value14;
	// 				}
					
	// 				var value16 = parseInt(value2 - value15);

	// 				/*-----------------------------------------------*/
					
	// 				var arr = {};
	// 				arr['employeeName'] = txt1;
	// 				arr['totalEmployment'] = txt2;
	// 				arr['benefitsInKind'] = txt3;
	// 				arr['incomeFromSource'] = txt4;
	// 				arr['pension'] = txt5;
	// 				arr['cumulativeNetEmoluments'] = value16;
	// 				arr['cumulativeTaxFreeEmoluments'] = value6 - value1;
	// 				arr['cumulativeTaxableEmoluments'] = value7;
	// 				arr['correspondingCumulativeTax'] = value14;
	// 				arr['hiddenValue'] = hiddenValue;

	// 				monthlyValues.push(arr);
	// 				//console.log("#######   " + arr['employeeName']);
	// 			}

	// 			calculateCumulativeFigures(returnMonthValue(resultsObj.get('month')), resultsObj.get('year'));
	// 		}
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function loadPayeDetailsMonthlyByEmployee(identity, employee){
	monthlyValues = [];

	$.ajax({
		url: 'loadPayeDetailsMonthly',
		type: 'POST',
		data: {id:identity},
		success: function(data, status) {

			var data = JSON.parse(data);
			document.getElementById("month").value = data[0]['month'];
			document.getElementById("year").value = data[0]['year'];
			document.getElementById("taxNo").value = data[0]['tax_no'];
			document.getElementById("taxId").value = data[0]['tax_id'];
			document.getElementById("stateBir").value = data[0]['state_bir'];
			document.getElementById("taxStationCode").value = data[0]['tax_station_code'];

			var loadArray =  JSON.parse(data[0]['monthly_values']);

			for (var i = 0; i < loadArray.length; i++) {
				var obj = loadArray[i];

				var currentEmployee = employee;

				var txt1 = obj['employeeName'];

				if(currentEmployee == txt1){
					var txt2 = obj['totalEmployment'];
					var txt3 = obj['benefitsInKind'];
					var txt4 = obj['incomeFromSource'];
					var txt5 = obj['pension'];
					var hiddenValue = obj['hiddenValue'];

					monthlyRowCount++;

					var divSec = '<div id="monthlyValueRow'+monthlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemMonthly('+monthlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

					// document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;
					// alert("txt2 "+txt2);
					
					var arr = {};
					arr['employeeName'] = txt1;
					arr['totalEmployment'] = txt2;
					arr['benefitsInKind'] = txt3;
					arr['incomeFromSource'] = txt4;
					arr['pension'] = txt5;
					arr['hiddenValue'] = hiddenValue;

					monthlyValues.push(arr);
				}
			}
			
            calculateCumulativeFiguresByEmployee(employee, returnMonthValue( data[0]['month'] ), data[0]['year'] );
		}
	});

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

function calculateCumulativeFiguresByEmployee(employee, currentMonthValue, curentYear){
	emptyCumulativeArray();

	var month = document.getElementById("month").value;

	$.ajax({
		url: 'calculateCumulativeFiguresByEmployee',
		type: 'POST',
		data: {year:curentYear},
		success: function(data, status) {

			var data = JSON.parse(data);

			for (var i = 0; i < data.length; i++) {
				var obj = data[i];

				var getMonthVal = returnMonthValue(obj['month']);

				if(getMonthVal <= currentMonthValue){
					var monthlyValues1 = JSON.parse(obj['monthly_values']);

					for (var j = 0; j < monthlyValues1.length; j++) {
						var employeeName = monthlyValues1[j]['employeeName'];

						if(employee == employeeName){
							var empIndex = employeeNamesArray.indexOf(employeeName);

							if(empIndex > -1){
								employeeCumulativeArray[empIndex] = employeeCumulativeArray[empIndex] + parseInt(monthlyValues1[j]['cumulativeNetEmoluments']);
								employeeCumulativeArray1[empIndex] = employeeCumulativeArray1[empIndex] + parseInt(monthlyValues1[j]['cumulativeTaxFreeEmoluments']);
								employeeCumulativeArray2[empIndex] = employeeCumulativeArray2[empIndex] + parseInt(monthlyValues1[j]['cumulativeTaxableEmoluments']);
								employeeCumulativeArray3[empIndex] = employeeCumulativeArray3[empIndex] + parseInt(monthlyValues1[j]['correspondingCumulativeTax']);
							}
						}
					}
				}
			}

			var tableDiv = '<table border="1">';

			// alert(monthlyValues.length);

			for (var i = 0; i < monthlyValues.length; i++) {
				var empName = monthlyValues[i]['employeeName'];
				var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
				var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
				var totalEmployment = parseInt(monthlyValues[i]['totalEmployment']);
				var benefitsInKind = monthlyValues[i]['benefitsInKind'];
				var incomeFromSource = monthlyValues[i]['incomeFromSource'];
				var pension = monthlyValues[i]['pension'];

				var value1 = 0;
				var value2 = 0;

				if(pension == "Yes"){
					value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
					value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
				}
				else{
					value1 = 0;
					value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
				}

				var value3 = 0;

				if(value2*0.01 < 200000/12){
					value3 = parseInt(200000/12);
				}
				else{
					value3 = parseInt(value2*0.01);
				}

				var value4 = parseInt(value2 * 0.2);

				var value5 = 0;
				var value6 = 0;

				if(pension == "Yes"){
					value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
					value6 = value3 + value4 + value5;
				}
				else{
					value5 = 0;
					value6 = value3 + value4;
				}

				var value7 = value2 - value6;

				var value8 = 0;

				if(value7 > 0){
					if(value7 > 300000/12){
						value8 = parseInt((300000/12)*0.07);
					}
					else{
						value8 = parseInt(value7*0.07)
					}
				}
				else{
					value8 = value2*0.01;
				}


				var value9 = 0;

				if((value7 - 300000/12) > 0){
					if(value7 > 600000/12){
						value9 = 300000/12*0.11;
					}
					else{
						value9 = (value7 - 300000/12)*0.11;
					}
				}
				else{
					value9 = 0;
				}

				
				var value10 = 0;

				if((value7 - 600000/12) > 0){
					if(value7 > 1100000/12){
						value10 = 500000/12*0.15;
					}
					else{
						value10 = (value7 - 600000/12)*0.15;
					}
				}
				else{
					value10 = 0;
				}


				var value11 = 0;

				if((value7 - 1100000/12) > 0){
					if(value7 > 1600000/12){
						value11 = 500000/12*0.19;
					}
					else{
						value11 = (value7 - 1100000/12)*0.19;
					}
				}
				else{
					value11 = 0;
				}


				var value12 = 0;

				if((value7 - 1600000/12) > 0){
					if(value7 > 3200000/12){
						value12 = 1600000/12*0.19;
					}
					else{
						value12 = (value7 - 1600000/12)*0.19;
					}
				}
				else{
					value12 = 0;
				}


				var value13 = 0;

				if((value7 - 3200000/12) > 0){
					if(value7 > 3200000/12){
						value13 = (value7 - 3200000/12)*0.24;
					}
					else{
						value13 = 0;
					}
				}
				else{
					value13 = 0;
				}


				var value14 = value8 + value9 + value10  + value11 + value12 + value13;

				var value15 = 0;

				if(pension == "Yes"){
					value15 = value5 + value14;
				}
				else{
					value15 = value14;
				}
				
				var value16 = parseInt(value2 - value15);

				var index = employeeNamesArray.indexOf(empName);

				var cumulative1 = employeeCumulativeArray[index];
				var cumulative2 = employeeCumulativeArray1[index];
				var cumulative3 = employeeCumulativeArray2[index];
				var cumulative4 = employeeCumulativeArray3[index];

				totalEmployment = parseFloat(totalEmployment).toFixed(2);
				benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
				incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
				value1 = parseFloat(value1).toFixed(2);
				value2 = parseFloat(value2).toFixed(2);
				value3 = parseFloat(value3).toFixed(2);
				value4 = parseFloat(value4).toFixed(2);
				value5 = parseFloat(value5).toFixed(2);
				value6 = parseFloat(value6).toFixed(2);
				value7 = parseFloat(value7).toFixed(2);
				value8 = parseFloat(value8).toFixed(2);
				value9 = parseFloat(value9).toFixed(2);
				value10 = parseFloat(value10).toFixed(2);
				value11 = parseFloat(value11).toFixed(2);
				value12 = parseFloat(value12).toFixed(2);
				value13 = parseFloat(value13).toFixed(2);
				value14 = parseFloat(value14).toFixed(2);
				value15 = parseFloat(value15).toFixed(2);
				value16 = parseFloat(value16).toFixed(2);
				cumulative1 = parseFloat(cumulative1).toFixed(2);
				cumulative2 = parseFloat(cumulative2).toFixed(2);
				cumulative3 = parseFloat(cumulative3).toFixed(2);
				cumulative4 = parseFloat(cumulative4).toFixed(2);

				var sec1Value = 0;
				var sec2Value = 0;
				var sec3Value = 0

				if(pension == "Yes"){
					sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
					sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
					sec3Value = sec1Value + sec2Value;
				}
				else{
					sec1Value = 0;
					sec2Value = 0;
					sec3Value = 0;
				}

				// alert("totalEmployment: "+totalEmployment);
				// alert("incomeFromSource: "+incomeFromSource);
				// alert("benefitsInKind: "+benefitsInKind);

				var insideDiv = '<tr> <th>Employee Name</th> <td>'+empName+'</td> </tr> <tr> <th>Employee TIN</th> <td>'+empTIN+'</td> </tr> <tr> <th>Address of employee</th> <td>'+empAddress+'</td> </tr> <tr> <th>Month</th> <td>'+month+'</td> </tr> <tr> <th>Total emolument for the month</th> <td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td> </tr> <tr> <th>Contribution by the employee to approved pension funds in the month</th> <td>'+sec1Value+'</td> </tr> <tr> <th>Contribution by employer on behalf of employee for the month</th> <td>'+sec2Value+'</td> </tr> <tr> </tr> <th>Total pension contributions</th> <td>'+sec3Value+'</td> <tr> <tr> <th>Tax free emoluments for the month</th> <td>'+(value6 - value1).toFixed(2)+'</td> </tr> <tr> <th>Taxable emolument for the month</th> <td>'+value7+'</td> </tr> <tr> <th>Tax for the month</th> <td>'+value14+'</td> </tr> <tr> <th>Net emoluments for the month</th> <td>'+value16+'</td> </tr> <tr> <th>Income from sources other than employment</th> <td>'+parseInt(incomeFromSource)+'</td> </tr> <tr> <th>Cumulative net emoluments year-to-date</th> <td>'+cumulative1+'</td> </tr> <tr> <th>Cumulative tax free emoluments year-to-date</th> <td>'+cumulative2+'</td> </tr> <tr> <th>Cumulative taxable emoluments year-to-date </th> <td>'+cumulative3+'</td> </tr> <tr> <th>Corresponding cumulative tax year to date</th> <td>'+cumulative4+'</td> </tr>';

				tableDiv = tableDiv + insideDiv;
			}

			tableDiv = tableDiv + '</table>';

			document.getElementById("table").value = tableDiv;

			$.ajax({
		        type: 'POST',
		        url: 'saveHtml',
		        data: $("#form_name").serialize(),
		        success: function(result) {
		        	var res = result.split("#");
		        	var linkId = res[res.length - 1];

		            window.location = "../generate.php?linkId="+linkId;

		            document.getElementById("generatingExcel").innerHTML = "<img class='doneImage' src='"+base_url+"assets/images/done.png' />";
		        }
		    });

		}
	});
}

function calculateCumulativeFigures(currentMonthValue, curentYear){
	//emptyCumulativeArray();

	var month = document.getElementById("month").value;

	$.ajax({
		url: 'calculateCumulativeFiguresByEmployee',
		type: 'POST',
		data: {year:curentYear},
		success: function(data, status) {
			var data = JSON.parse(data);

			for (var i = 0; i < data.length; i++) {
				var obj = data[i];

				var getMonthVal = returnMonthValue(obj['month_archived'].split(" ")[0]);

				if(getMonthVal <= currentMonthValue){
					var monthlyValues = JSON.parse(obj['monthly_values']);

					for (var j = 0; j < monthlyValues.length; j++) {
						var employeeName = monthlyValues[j]['employeeName'];

						var empIndex = employeeNamesArray.indexOf(employeeName);

						if(empIndex > -1){
							employeeCumulativeArray[empIndex] = employeeCumulativeArray[empIndex] + parseInt(monthlyValues[j]['cumulativeNetEmoluments']);
							employeeCumulativeArray1[empIndex] = employeeCumulativeArray1[empIndex] + parseInt(monthlyValues[j]['cumulativeTaxFreeEmoluments']);
							employeeCumulativeArray2[empIndex] = employeeCumulativeArray2[empIndex] + parseInt(monthlyValues[j]['cumulativeTaxableEmoluments']);
							employeeCumulativeArray3[empIndex] = employeeCumulativeArray3[empIndex] + parseInt(monthlyValues[j]['correspondingCumulativeTax']);
						}
					}
				}
			}

			var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from source other than employment</th> <th>Cumulative net emoluments year-to-date</th> <th>Cumulative tax free emoluments year-to-date</th> <th>Cumulative taxable emoluments year-to-date </th> <th>Corresponding cumulative tax year to date</th> </tr> ';

			for (var i = 0; i < monthlyValues.length; i++) {
				var empName = monthlyValues[i]['employeeName'];
				var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
				var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
				var totalEmployment = parseInt(monthlyValues[i]['totalEmployment']);
				var benefitsInKind = monthlyValues[i]['benefitsInKind'];
				var incomeFromSource = monthlyValues[i]['incomeFromSource'];
				var pension = monthlyValues[i]['pension'];

				var value1 = 0;
				var value2 = 0;

				if(pension == "Yes"){
					value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
					value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
				}
				else{
					value1 = 0;
					value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
				}

				var value3 = 0;

				if(value2*0.01 < 200000/12){
					value3 = parseInt(200000/12);
				}
				else{
					value3 = parseInt(value2*0.01);
				}

				var value4 = parseInt(value2 * 0.2);

				var value5 = 0;
				var value6 = 0;

				if(pension == "Yes"){
					value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
					value6 = value3 + value4 + value5;
				}
				else{
					value5 = 0;
					value6 = value3 + value4;
				}

				var value7 = value2 - value6;

				var value8 = 0;

				if(value7 > 0){
					if(value7 > 300000/12){
						value8 = parseInt((300000/12)*0.07);
					}
					else{
						value8 = parseInt(value7*0.07)
					}
				}
				else{
					value8 = value2*0.01;
				}


				var value9 = 0;

				if((value7 - 300000/12) > 0){
					if(value7 > 600000/12){
						value9 = 300000/12*0.11;
					}
					else{
						value9 = (value7 - 300000/12)*0.11;
					}
				}
				else{
					value9 = 0;
				}

				
				var value10 = 0;

				if((value7 - 600000/12) > 0){
					if(value7 > 1100000/12){
						value10 = 500000/12*0.15;
					}
					else{
						value10 = (value7 - 600000/12)*0.15;
					}
				}
				else{
					value10 = 0;
				}


				var value11 = 0;

				if((value7 - 1100000/12) > 0){
					if(value7 > 1600000/12){
						value11 = 500000/12*0.19;
					}
					else{
						value11 = (value7 - 1100000/12)*0.19;
					}
				}
				else{
					value11 = 0;
				}


				var value12 = 0;

				if((value7 - 1600000/12) > 0){
					if(value7 > 3200000/12){
						value12 = 1600000/12*0.19;
					}
					else{
						value12 = (value7 - 1600000/12)*0.19;
					}
				}
				else{
					value12 = 0;
				}


				var value13 = 0;

				if((value7 - 3200000/12) > 0){
					if(value7 > 3200000/12){
						value13 = (value7 - 3200000/12)*0.24;
					}
					else{
						value13 = 0;
					}
				}
				else{
					value13 = 0;
				}


				var value14 = value8 + value9 + value10  + value11 + value12 + value13;

				var value15 = 0;

				if(pension == "Yes"){
					value15 = value5 + value14;
				}
				else{
					value15 = value14;
				}
				
				var value16 = parseInt(value2 - value15);

				var index = employeeNamesArray.indexOf(empName);

				var cumulative1 = employeeCumulativeArray[index];
				var cumulative2 = employeeCumulativeArray1[index];
				var cumulative3 = employeeCumulativeArray2[index];
				var cumulative4 = employeeCumulativeArray3[index];

				totalEmployment = parseFloat(totalEmployment).toFixed(2);
				benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
				incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
				value1 = parseFloat(value1).toFixed(2);
				value2 = parseFloat(value2).toFixed(2);
				value3 = parseFloat(value3).toFixed(2);
				value4 = parseFloat(value4).toFixed(2);
				value5 = parseFloat(value5).toFixed(2);
				value6 = parseFloat(value6).toFixed(2);
				value7 = parseFloat(value7).toFixed(2);
				value8 = parseFloat(value8).toFixed(2);
				value9 = parseFloat(value9).toFixed(2);
				value10 = parseFloat(value10).toFixed(2);
				value11 = parseFloat(value11).toFixed(2);
				value12 = parseFloat(value12).toFixed(2);
				value13 = parseFloat(value13).toFixed(2);
				value14 = parseFloat(value14).toFixed(2);
				value15 = parseFloat(value15).toFixed(2);
				value16 = parseFloat(value16).toFixed(2);
				cumulative1 = parseFloat(cumulative1).toFixed(2);
				cumulative2 = parseFloat(cumulative2).toFixed(2);
				cumulative3 = parseFloat(cumulative3).toFixed(2);
				cumulative4 = parseFloat(cumulative4).toFixed(2);

				var sec1Value = 0;
				var sec2Value = 0;
				var sec3Value = 0

				if(pension == "Yes"){
					sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
					sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
					sec3Value = sec1Value + sec2Value;
				}
				else{
					sec1Value = 0;
					sec2Value = 0;
					sec3Value = 0;
				}

				var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+month+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td>'+'<td>'+cumulative1+'</td>'+'<td>'+cumulative2+'</td>'+'<td>'+cumulative3+'</td>'+'<td>'+cumulative4+'</td></tr>';

				tableDiv = tableDiv + insideDiv;
			}

			tableDiv = tableDiv + '</table>';

			document.getElementById("table").value = tableDiv;

			$.ajax({
		        type: 'POST',
		        url: 'saveHtml',
		        data: $("#form_name").serialize(),
		        success: function(result) {
		        	var res = result.split("#");
		        	var linkId = res[res.length - 1];

		            window.location = "../generate.php?linkId="+linkId;

		            document.getElementById("generatingExcel").innerHTML = "<img class='doneImage' src='"+base_url+"assets/images/done.png' />";
		        }
		    });

		}
	});

	
	// var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	// var query = new Parse.Query(PAYEMonthlyArchives);

	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.equalTo("year", curentYear);

	// query.find({
	// 	success: function(results) {
	// 		for (var i = 0; i < results.length; i++) {
	// 			var obj = results[i];

	// 			var getMonthVal = returnMonthValue(obj.get('monthArchived').split(" ")[0]);

	// 			if(getMonthVal <= currentMonthValue){
	// 				var monthlyValues = obj.get('monthlyValues');

	// 				for (var j = 0; j < monthlyValues.length; j++) {
	// 					var employeeName = monthlyValues[j]['employeeName'];

	// 					var empIndex = employeeNamesArray.indexOf(employeeName);

	// 					if(empIndex > -1){
	// 						employeeCumulativeArray[empIndex] = employeeCumulativeArray[empIndex] + parseInt(monthlyValues[j]['cumulativeNetEmoluments']);
	// 						employeeCumulativeArray1[empIndex] = employeeCumulativeArray1[empIndex] + parseInt(monthlyValues[j]['cumulativeTaxFreeEmoluments']);
	// 						employeeCumulativeArray2[empIndex] = employeeCumulativeArray2[empIndex] + parseInt(monthlyValues[j]['cumulativeTaxableEmoluments']);
	// 						employeeCumulativeArray3[empIndex] = employeeCumulativeArray3[empIndex] + parseInt(monthlyValues[j]['correspondingCumulativeTax']);
	// 					}
	// 				}
	// 			}
	// 		}

	// 		var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from source other than employment</th> <th>Cumulative net emoluments year-to-date</th> <th>Cumulative tax free emoluments year-to-date</th> <th>Cumulative taxable emoluments year-to-date </th> <th>Corresponding cumulative tax year to date</th> </tr> ';

	// 		for (var i = 0; i < monthlyValues.length; i++) {
	// 			var empName = monthlyValues[i]['employeeName'];
	// 			var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
	// 			var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
	// 			var totalEmployment = parseInt(monthlyValues[i]['totalEmployment']);
	// 			var benefitsInKind = monthlyValues[i]['benefitsInKind'];
	// 			var incomeFromSource = monthlyValues[i]['incomeFromSource'];
	// 			var pension = monthlyValues[i]['pension'];

	// 			var value1 = 0;
	// 			var value2 = 0;

	// 			if(pension == "Yes"){
	// 				value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
	// 				value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
	// 			}
	// 			else{
	// 				value1 = 0;
	// 				value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
	// 			}

	// 			var value3 = 0;

	// 			if(value2*0.01 < 200000/12){
	// 				value3 = parseInt(200000/12);
	// 			}
	// 			else{
	// 				value3 = parseInt(value2*0.01);
	// 			}

	// 			var value4 = parseInt(value2 * 0.2);

	// 			var value5 = 0;
	// 			var value6 = 0;

	// 			if(pension == "Yes"){
	// 				value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
	// 				value6 = value3 + value4 + value5;
	// 			}
	// 			else{
	// 				value5 = 0;
	// 				value6 = value3 + value4;
	// 			}

	// 			var value7 = value2 - value6;

	// 			var value8 = 0;

	// 			if(value7 > 0){
	// 				if(value7 > 300000/12){
	// 					value8 = parseInt((300000/12)*0.07);
	// 				}
	// 				else{
	// 					value8 = parseInt(value7*0.07)
	// 				}
	// 			}
	// 			else{
	// 				value8 = value2*0.01;
	// 			}


	// 			var value9 = 0;

	// 			if((value7 - 300000/12) > 0){
	// 				if(value7 > 600000/12){
	// 					value9 = 300000/12*0.11;
	// 				}
	// 				else{
	// 					value9 = (value7 - 300000/12)*0.11;
	// 				}
	// 			}
	// 			else{
	// 				value9 = 0;
	// 			}

				
	// 			var value10 = 0;

	// 			if((value7 - 600000/12) > 0){
	// 				if(value7 > 1100000/12){
	// 					value10 = 500000/12*0.15;
	// 				}
	// 				else{
	// 					value10 = (value7 - 600000/12)*0.15;
	// 				}
	// 			}
	// 			else{
	// 				value10 = 0;
	// 			}


	// 			var value11 = 0;

	// 			if((value7 - 1100000/12) > 0){
	// 				if(value7 > 1600000/12){
	// 					value11 = 500000/12*0.19;
	// 				}
	// 				else{
	// 					value11 = (value7 - 1100000/12)*0.19;
	// 				}
	// 			}
	// 			else{
	// 				value11 = 0;
	// 			}


	// 			var value12 = 0;

	// 			if((value7 - 1600000/12) > 0){
	// 				if(value7 > 3200000/12){
	// 					value12 = 1600000/12*0.19;
	// 				}
	// 				else{
	// 					value12 = (value7 - 1600000/12)*0.19;
	// 				}
	// 			}
	// 			else{
	// 				value12 = 0;
	// 			}


	// 			var value13 = 0;

	// 			if((value7 - 3200000/12) > 0){
	// 				if(value7 > 3200000/12){
	// 					value13 = (value7 - 3200000/12)*0.24;
	// 				}
	// 				else{
	// 					value13 = 0;
	// 				}
	// 			}
	// 			else{
	// 				value13 = 0;
	// 			}


	// 			var value14 = value8 + value9 + value10  + value11 + value12 + value13;

	// 			var value15 = 0;

	// 			if(pension == "Yes"){
	// 				value15 = value5 + value14;
	// 			}
	// 			else{
	// 				value15 = value14;
	// 			}
				
	// 			var value16 = parseInt(value2 - value15);

	// 			var index = employeeNamesArray.indexOf(empName);

	// 			var cumulative1 = employeeCumulativeArray[index];
	// 			var cumulative2 = employeeCumulativeArray1[index];
	// 			var cumulative3 = employeeCumulativeArray2[index];
	// 			var cumulative4 = employeeCumulativeArray3[index];

	// 			totalEmployment = parseFloat(totalEmployment).toFixed(2);
	// 			benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
	// 			incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
	// 			value1 = parseFloat(value1).toFixed(2);
	// 			value2 = parseFloat(value2).toFixed(2);
	// 			value3 = parseFloat(value3).toFixed(2);
	// 			value4 = parseFloat(value4).toFixed(2);
	// 			value5 = parseFloat(value5).toFixed(2);
	// 			value6 = parseFloat(value6).toFixed(2);
	// 			value7 = parseFloat(value7).toFixed(2);
	// 			value8 = parseFloat(value8).toFixed(2);
	// 			value9 = parseFloat(value9).toFixed(2);
	// 			value10 = parseFloat(value10).toFixed(2);
	// 			value11 = parseFloat(value11).toFixed(2);
	// 			value12 = parseFloat(value12).toFixed(2);
	// 			value13 = parseFloat(value13).toFixed(2);
	// 			value14 = parseFloat(value14).toFixed(2);
	// 			value15 = parseFloat(value15).toFixed(2);
	// 			value16 = parseFloat(value16).toFixed(2);
	// 			cumulative1 = parseFloat(cumulative1).toFixed(2);
	// 			cumulative2 = parseFloat(cumulative2).toFixed(2);
	// 			cumulative3 = parseFloat(cumulative3).toFixed(2);
	// 			cumulative4 = parseFloat(cumulative4).toFixed(2);

	// 			var sec1Value = 0;
	// 			var sec2Value = 0;
	// 			var sec3Value = 0

	// 			if(pension == "Yes"){
	// 				sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
	// 				sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
	// 				sec3Value = sec1Value + sec2Value;
	// 			}
	// 			else{
	// 				sec1Value = 0;
	// 				sec2Value = 0;
	// 				sec3Value = 0;
	// 			}

	// 			var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+month+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td>'+'<td>'+cumulative1+'</td>'+'<td>'+cumulative2+'</td>'+'<td>'+cumulative3+'</td>'+'<td>'+cumulative4+'</td></tr>';

	// 			tableDiv = tableDiv + insideDiv;
	// 		}

	// 		tableDiv = tableDiv + '</table>';

	// 		document.getElementById("table").value = tableDiv;

	// 		$.ajax({
	// 	        type: 'POST',
	// 	        url: 'archieveScripts/paye_monthly/saveHmtl.php',
	// 	        data: $("#form_name").serialize(),
	// 	        success: function(result) {
	// 	        	var res = result.split("#");
	// 	        	var linkId = res[res.length - 1];

	// 	            window.location = "generate.php?linkId="+linkId;

	// 	            document.getElementById("generatingExcel").innerHTML = "<img class='doneImage' src='images/done.png' />";
	// 	        }
	// 	    });
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function archiveForMonth(){
	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var taxId = document.getElementById("taxId").value;
	var stateBir = document.getElementById("stateBir").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	var query = new Parse.Query(PAYEMonthlyArchives);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.equalTo("monthArchived", month+" "+year);
	query.first({
		success: function(resultsObj) {
			if(resultsObj){
				resultsObj.destroy({
					success: function(resultsObj) {
						// alert("Removed existing archived file!");
					},
					error: function(resultsObj, error) {
					}
				});
			}

			var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
			var payeArchives = new PAYEMonthlyArchives();

			payeArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			payeArchives.set("month", month);
			payeArchives.set("year", year);
			payeArchives.set("taxNo", taxNo);
			payeArchives.set("taxId", taxId);
			payeArchives.set("stateBir", stateBir);
			payeArchives.set("taxStationCode", taxStationCode);
			payeArchives.set("monthlyValues", monthlyValues);
			payeArchives.set("monthArchived", month+" "+year);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			payeArchives.setACL(acl);

			payeArchives.save(null, {
				success: function(payeArchives) {
					alert("Your paye calculation form is archived!");
					window.location = "paye_reports_monthly.html?id="+payeArchives.id;
				},
				error: function(payeArchives, error) {
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

function removeItemMonthly(id, hiddenValue){
	var r = confirm("Are you sure want to remove?");
	if (r == true) {
	    var index = functiontofindIndexByKeyValue(monthlyValues, "hiddenValue", hiddenValue);
		if(index != null){
			monthlyValues.splice(index, 1);
			document.getElementById("monthlyValueRow"+id).style.display = "none";
		}
		else{
			alert("Please add atleast one item!");
		}
	}
}

function addMonthValues() {
	var txt1 = document.getElementById("txt1").value;
	var txt2 = document.getElementById("txt2").value;
	var txt3 = document.getElementById("txt3").value;
	var txt4 = document.getElementById("txt4").value;
	var txt5 = document.getElementById("txt5").value;

	if(txt1 == ""){
		alert("Please enter employee name!");
		return false;
	}

	if(txt2 == ""){
		alert("Please enter total employment income for the month!");
		return false;
	}

	if(txt3 == ""){
		alert("Please enter benefits in kind!");
		return false;
	}

	if(txt4 == ""){
		alert("Please enter income from other sources!");
		return false;
	}

	if(txt5 == ""){
		alert("Please enter pension!");
		return false;
	}

	var hiddenValue = Math.floor((Math.random() * 10000000000000000000) + 1);

	monthlyRowCount++;

	var divSec = '<div id="monthlyValueRow'+monthlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItem('+monthlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

	document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;


	var arr = {};
	arr['employeeName'] = txt1;
	arr['totalEmployment'] = txt2;
	arr['benefitsInKind'] = txt3;
	arr['incomeFromSource'] = txt4;
	arr['pension'] = txt5;
	arr['hiddenValue'] = hiddenValue;

	monthlyValues.push(arr);

	document.getElementById("txt1").value = "";
   	document.getElementById("txt2").value = "";
 	document.getElementById("txt3").value = "";
 	document.getElementById("txt4").value = "";
 	document.getElementById("txt5").value = "";
}

function exportDataEmailMonthly(){
	document.getElementById("userEmail").value = user.get('email');
	document.getElementById("exportEmailBtn").disabled = true;
	var month = document.getElementById("month").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from sources other than employment</th> <th>Cumulative net emoluments year-to-date</th> <th>Cumulative tax free emoluments year-to-date</th> <th>Cumulative taxable emoluments year-to-date </th> <th>Corresponding cumulative tax year to date</th> </tr> ';
	
	for (var i = 0; i < monthlyValues.length; i++) {
		var empName = monthlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
		var totalEmployment = parseInt(monthlyValues[i]['totalEmployment']);
		var benefitsInKind = monthlyValues[i]['benefitsInKind'];
		var incomeFromSource = monthlyValues[i]['incomeFromSource'];
		var pension = monthlyValues[i]['pension'];

		var value1 = 0;
		var value2 = 0;

		if(pension == "Yes"){
			value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
		}
		else{
			value1 = 0;
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
		}

		var value3 = 0;

		if(value2*0.01 < 200000/12){
			value3 = parseInt(200000/12);
		}
		else{
			value3 = parseInt(value2*0.01);
		}

		var value4 = parseInt(value2 * 0.2);

		var value5 = 0;
		var value6 = 0;

		if(pension == "Yes"){
			value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			value6 = value3 + value4 + value5;
		}
		else{
			value5 = 0;
			value6 = value3 + value4;
		}

		var value7 = value2 - value6;

		var value8 = 0;

		if(value7 > 0){
			if(value7 > 300000/12){
				value8 = parseInt((300000/12)*0.07);
			}
			else{
				value8 = parseInt(value7*0.07)
			}
		}
		else{
			value8 = value2*0.01;
		}


		var value9 = 0;

		if((value7 - 300000/12) > 0){
			if(value7 > 600000/12){
				value9 = 300000/12*0.11;
			}
			else{
				value9 = (value7 - 300000/12)*0.11;
			}
		}
		else{
			value9 = 0;
		}


		var value10 = 0;

		if((value7 - 600000/12) > 0){
			if(value7 > 1100000/12){
				value10 = 500000/12*0.15;
			}
			else{
				value10 = (value7 - 600000/12)*0.15;
			}
		}
		else{
			value10 = 0;
		}


		var value11 = 0;

		if((value7 - 1100000/12) > 0){
			if(value7 > 1600000/12){
				value11 = 500000/12*0.19;
			}
			else{
				value11 = (value7 - 1100000/12)*0.19;
			}
		}
		else{
			value11 = 0;
		}


		var value12 = 0;

		if((value7 - 1600000/12) > 0){
			if(value7 > 3200000/12){
				value12 = 1600000/12*0.19;
			}
			else{
				value12 = (value7 - 1600000/12)*0.19;
			}
		}
		else{
			value12 = 0;
		}


		var value13 = 0;

		if((value7 - 3200000/12) > 0){
			if(value7 > 3200000/12){
				value13 = (value7 - 3200000/12)*0.24;
			}
			else{
				value13 = 0;
			}
		}
		else{
			value13 = 0;
		}


		var value14 = value8 + value9 + value10  + value11 + value12 + value13;

		var value15 = 0;

		if(pension == "Yes"){
			value15 = value5 + value14;
		}
		else{
			value15 = value14;
		}
		
		var value16 = parseInt(value2 - value15);

		var index = employeeNamesArray.indexOf(empName);

		var cumulative1 = employeeCumulativeArray[index];
		var cumulative2 = employeeCumulativeArray1[index];
		var cumulative3 = employeeCumulativeArray2[index];
		var cumulative4 = employeeCumulativeArray3[index];

		totalEmployment = parseFloat(totalEmployment).toFixed(2);
		benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
                incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
                value1 = parseFloat(value1).toFixed(2);
		value2 = parseFloat(value2).toFixed(2);
		value3 = parseFloat(value3).toFixed(2);
		value4 = parseFloat(value4).toFixed(2);
		value5 = parseFloat(value5).toFixed(2);
		value6 = parseFloat(value6).toFixed(2);
		value7 = parseFloat(value7).toFixed(2);
		value8 = parseFloat(value8).toFixed(2);
		value9 = parseFloat(value9).toFixed(2);
		value10 = parseFloat(value10).toFixed(2);
		value11 = parseFloat(value11).toFixed(2);
		value12 = parseFloat(value12).toFixed(2);
		value13 = parseFloat(value13).toFixed(2);
		value14 = parseFloat(value14).toFixed(2);
		value15 = parseFloat(value15).toFixed(2);
		value16 = parseFloat(value16).toFixed(2);
		cumulative1 = parseFloat(cumulative1).toFixed(2);
		cumulative2 = parseFloat(cumulative2).toFixed(2);
		cumulative3 = parseFloat(cumulative3).toFixed(2);
		cumulative4 = parseFloat(cumulative4).toFixed(2);

		var sec1Value = 0;
		var sec2Value = 0;
		var sec3Value = 0

		if(pension == "Yes"){
		sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
		sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
                sec3Value = sec1Value + sec2Value;
		}
               else{
			sec1Value = 0;
			sec2Value = 0;
			sec3Value = 0;
                      }

		var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+month+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td>'+'<td>'+cumulative1+'</td>'+'<td>'+cumulative2+'</td>'+'<td>'+cumulative3+'</td>'+'<td>'+cumulative4+'</td></tr>';

		tableDiv = tableDiv + insideDiv;
	}

	tableDiv = tableDiv + '</table>';

	document.getElementById("table").value = tableDiv;
	
	$.ajax({
        type: 'POST',
        url: 'archieveScripts/paye_monthly/saveHmtlEmail.php',
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

function exportDataMonthly(){
	var archiveType = document.getElementById("archiveType").value;
	var month = document.getElementById("month").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from source other than employment</th> <th>Cumulative net emoluments year-to-date</th> <th>Cumulative tax free emoluments year-to-date</th> <th>Cumulative taxable emoluments year-to-date </th> <th>Corresponding cumulative tax year to date</th> </tr> ';

	for (var i = 0; i < monthlyValues.length; i++) {
		var empName = monthlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
		var totalEmployment = parseInt(monthlyValues[i]['totalEmployment']);
		var benefitsInKind = monthlyValues[i]['benefitsInKind'];
		var incomeFromSource = monthlyValues[i]['incomeFromSource'];
		var pension = monthlyValues[i]['pension'];

		var value1 = 0;
		var value2 = 0;

		if(pension == "Yes"){
			value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
		}
		else{
			value1 = 0;
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
		}

		var value3 = 0;

		if(value2*0.01 < 200000/12){
			value3 = parseInt(200000/12);
		}
		else{
			value3 = parseInt(value2*0.01);
		}

		var value4 = parseInt(value2 * 0.2);

		var value5 = 0;
		var value6 = 0;

		if(pension == "Yes"){
			value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			value6 = value3 + value4 + value5;
		}
		else{
			value5 = 0;
			value6 = value3 + value4;
		}

		var value7 = value2 - value6;

		var value8 = 0;

		if(value7 > 0){
			if(value7 > 300000/12){
				value8 = parseInt((300000/12)*0.07);
			}
			else{
				value8 = parseInt(value7*0.07)
			}
		}
		else{
			value8 = value2*0.01;
		}


		var value9 = 0;

		if((value7 - 300000/12) > 0){
			if(value7 > 600000/12){
				value9 = 300000/12*0.11;
			}
			else{
				value9 = (value7 - 300000/12)*0.11;
			}
		}
		else{
			value9 = 0;
		}

		
		var value10 = 0;

		if((value7 - 600000/12) > 0){
			if(value7 > 1100000/12){
				value10 = 500000/12*0.15;
			}
			else{
				value10 = (value7 - 600000/12)*0.15;
			}
		}
		else{
			value10 = 0;
		}


		var value11 = 0;

		if((value7 - 1100000/12) > 0){
			if(value7 > 1600000/12){
				value11 = 500000/12*0.19;
			}
			else{
				value11 = (value7 - 1100000/12)*0.19;
			}
		}
		else{
			value11 = 0;
		}


		var value12 = 0;

		if((value7 - 1600000/12) > 0){
			if(value7 > 3200000/12){
				value12 = 1600000/12*0.19;
			}
			else{
				value12 = (value7 - 1600000/12)*0.19;
			}
		}
		else{
			value12 = 0;
		}


		var value13 = 0;

		if((value7 - 3200000/12) > 0){
			if(value7 > 3200000/12){
				value13 = (value7 - 3200000/12)*0.24;
			}
			else{
				value13 = 0;
			}
		}
		else{
			value13 = 0;
		}


		var value14 = value8 + value9 + value10  + value11 + value12 + value13;

		var value15 = 0;

		if(pension == "Yes"){
			value15 = value5 + value14;
		}
		else{
			value15 = value14;
		}
		
		var value16 = parseInt(value2 - value15);

		var index = employeeNamesArray.indexOf(empName);

		var cumulative1 = employeeCumulativeArray[index];
		//console.log("cumulative1 !!!!!" + index);
		var cumulative2 = employeeCumulativeArray1[index];
		var cumulative3 = employeeCumulativeArray2[index];
		var cumulative4 = employeeCumulativeArray3[index];

		totalEmployment = parseFloat(totalEmployment).toFixed(2);
		benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
                incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
		value1 = parseFloat(value1).toFixed(2);
		value2 = parseFloat(value2).toFixed(2);
		value3 = parseFloat(value3).toFixed(2);
		value4 = parseFloat(value4).toFixed(2);
		value5 = parseFloat(value5).toFixed(2);
		value6 = parseFloat(value6).toFixed(2);
		value7 = parseFloat(value7).toFixed(2);
		value8 = parseFloat(value8).toFixed(2);
		value9 = parseFloat(value9).toFixed(2);
		value10 = parseFloat(value10).toFixed(2);
		value11 = parseFloat(value11).toFixed(2);
		value12 = parseFloat(value12).toFixed(2);
		value13 = parseFloat(value13).toFixed(2);
		value14 = parseFloat(value14).toFixed(2);
		value15 = parseFloat(value15).toFixed(2);
		value16 = parseFloat(value16).toFixed(2);
		cumulative1 = parseFloat(cumulative1).toFixed(2);
		cumulative2 = parseFloat(cumulative2).toFixed(2);
		cumulative3 = parseFloat(cumulative3).toFixed(2);
		cumulative4 = parseFloat(cumulative4).toFixed(2);

		var sec1Value = 0;
		var sec2Value = 0;
		var sec3Value = 0

		if(pension == "Yes"){
		sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
		sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
                sec3Value = sec1Value + sec2Value;
		}
               else{
			sec1Value = 0;
			sec2Value = 0;
			sec3Value = 0;
                      }

		var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+month+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td>'+'<td>'+cumulative1+'</td>'+'<td>'+cumulative2+'</td>'+'<td>'+cumulative3+'</td>'+'<td>'+cumulative4+'</td></tr>';

		tableDiv = tableDiv + insideDiv;
	}

	tableDiv = tableDiv + '</table>';

	document.getElementById("table").value = tableDiv;

	if(archiveType == "Html"){
		$.ajax({
            type: 'POST',
            url: 'archieveScripts/paye_monthly/saveHmtl.php',
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
            url: 'archieveScripts/paye_monthly/saveHmtl.php',
            data: $("#form_name").serialize(),
            success: function(result) {
            	var res = result.split("#");
            	var linkId = res[res.length - 1];

                window.location = "generate.php?linkId="+linkId;
            }
        });
	}
}

//Yearly Reports
function loadYearlyReports1(empName, fromYearly){

	$.ajax({
        type: 'POST',
        url: 'loadYearlyReports1',
        success: function(data) {
        	var data = JSON.parse(data);
        	document.getElementById("resultsSection1").innerHTML = "";

        	var count = 0;
			for (var i = 0; i < data.length; i++) {
				var obj = data[i];

				var index = getIndexIfObjWithOwnAttr( JSON.parse(obj['yearly_values']), "employeeName", empName);

				if(index >= 0){
					var getYear = obj['year'];

					if(getYear == fromYearly){
						var secDiv = '<div class="eight columns spoolResultsItem"> <a href="#monthlySec" onclick="downloadAnnualExcelReport1(\''+obj['id']+'\', \''+empName+'\')">&#8594; '+obj['year']+'</a> </div>';

						document.getElementById("resultsSection1").innerHTML = document.getElementById("resultsSection1").innerHTML + secDiv;
						
						count++;
					}
				}
			}

			if(count == 0){
				document.getElementById("resultsSection1").innerHTML = "&nbsp;&nbsp; No reports available!"
			}
        }
    });
}

function loadYearlyReports2(fromYearly){


	$.ajax({
        type: 'POST',
        url: 'loadYearlyReports1',
        success: function(data) {
        	var data = JSON.parse(data);

        	document.getElementById("resultsSection1").innerHTML = "";

			var count = 0;

			for (var i = 0; i < data.length; i++) {
				var obj = data[i];

				console.log(obj);

				var getYear = obj['year'];

				if(getYear == fromYearly){
					var secDiv = '<div class="eight columns spoolResultsItem"> <a href="#monthlySec" onclick="downloadAnnualExcelReport2(\''+obj['id']+'\')">&#8594; '+obj['year']+'</a> </div>';

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

function downloadAnnualExcelReport2(identity) {
	document.getElementById("generatingExcelYear").innerHTML = "<img class='loadingImage' src='"+base_url+"assets/images/loading1.gif' />";

	loadPayeDetailsYearly(identity);
}

function downloadAnnualExcelReport1(identity, empName) {
	document.getElementById("generatingExcelYear").innerHTML = "<img class='loadingImage' src='"+base_url+"assets/images/loading1.gif' />";

	loadPayeDetailsYearlyByEmployee(identity, empName);
}

function loadPayeDetailsYearly(identity){
	yearlyValues = [];

	$.ajax({
		url: 'loadPayeDetailsYearlyIdentity',
		type: 'POST',
		data: {id:identity},
		success: function(data, status) {
			var data = JSON.parse(data);

			document.getElementById("year").value = data[0]['year'];
			document.getElementById("taxNo").value = data[0]['tax_no'];
			document.getElementById("taxId").value = data[0]['tax_id'];
			document.getElementById("stateBir").value = data[0]['state_bir'];
			document.getElementById("taxStationCode").value = data[0]['tax_station_code'];

			var loadArray = JSON.parse(data[0]['yearly_values']);

			for (var i = 0; i < loadArray.length; i++) {
					var obj = loadArray[i];

					var txt1 = obj['employeeName'];
					var txt2 = obj['totalEmployment'];
					var txt3 = obj['benefitsInKind'];
					var txt4 = obj['incomeFromSource'];
					var txt5 = obj['pension'];
					var hiddenValue = obj['hiddenValue'];

					yearlyRowCount++;

					var divSec = '<div id="yearlyValueRow'+yearlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemYearly('+yearlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

					// document.getElementById("rowDataYearlyValues").innerHTML = document.getElementById("rowDataYearlyValues").innerHTML + divSec;
					
					var arr = {};
					arr['employeeName'] = txt1;
					arr['totalEmployment'] = txt2;
					arr['benefitsInKind'] = txt3;
					arr['incomeFromSource'] = txt4;
					arr['pension'] = txt5;
					arr['hiddenValue'] = hiddenValue;

					yearlyValues.push(arr);
				}

				exportDataYearly();
		}
	});

	// var PAYEYearlyArchives = Parse.Object.extend("PAYEYearlyArchives");
	// var query = new Parse.Query(PAYEYearlyArchives);
	// query.equalTo("objectId", identity);
	// query.first({
	// 	success: function(resultsObj) {
	// 		if(resultsObj){
	// 			document.getElementById("year").value = resultsObj.get('year');
	// 			document.getElementById("taxNo").value = resultsObj.get('taxNo');
	// 			document.getElementById("taxId").value = resultsObj.get('taxId');
	// 			document.getElementById("stateBir").value = resultsObj.get('stateBir');
	// 			document.getElementById("taxStationCode").value = resultsObj.get('taxStationCode');

	// 			var loadArray = resultsObj.get('yearlyValues');

	// 			for (var i = 0; i < loadArray.length; i++) {
	// 				var obj = loadArray[i];

	// 				var txt1 = obj['employeeName'];
	// 				var txt2 = obj['totalEmployment'];
	// 				var txt3 = obj['benefitsInKind'];
	// 				var txt4 = obj['incomeFromSource'];
	// 				var txt5 = obj['pension'];
	// 				var hiddenValue = obj['hiddenValue'];

	// 				yearlyRowCount++;

	// 				var divSec = '<div id="yearlyValueRow'+yearlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemYearly('+yearlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

	// 				// document.getElementById("rowDataYearlyValues").innerHTML = document.getElementById("rowDataYearlyValues").innerHTML + divSec;
					
	// 				var arr = {};
	// 				arr['employeeName'] = txt1;
	// 				arr['totalEmployment'] = txt2;
	// 				arr['benefitsInKind'] = txt3;
	// 				arr['incomeFromSource'] = txt4;
	// 				arr['pension'] = txt5;
	// 				arr['hiddenValue'] = hiddenValue;

	// 				yearlyValues.push(arr);
	// 			}

	// 			exportDataYearly();
	// 		}
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function loadPayeDetailsYearlyByEmployee(identity, empName){
	yearlyValues = [];


	$.ajax({
		url: 'loadPayeDetailsYearlyIdentity',
		type: 'POST',
		data: {id:identity},
		success: function(data, status) {
			var data = JSON.parse(data);

			document.getElementById("year").value = data[0]['year'];
			document.getElementById("taxNo").value = data[0]['tax_no'];
			document.getElementById("taxId").value = data[0]['tax_id'];
			document.getElementById("stateBir").value = data[0]['state_bir'];
			document.getElementById("taxStationCode").value = data[0]['tax_station_code'];

			var loadArray = JSON.parse(data[0]['yearly_values']);

			for (var i = 0; i < loadArray.length; i++) {
				var obj = loadArray[i];

				var txt1 = obj['employeeName'];

				if(txt1 == empName){
					var txt2 = obj['totalEmployment'];
					var txt3 = obj['benefitsInKind'];
					var txt4 = obj['incomeFromSource'];
					var txt5 = obj['pension'];
					var hiddenValue = obj['hiddenValue'];

					yearlyRowCount++;

					var divSec = '<div id="yearlyValueRow'+yearlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemYearly('+yearlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

					// document.getElementById("rowDataYearlyValues").innerHTML = document.getElementById("rowDataYearlyValues").innerHTML + divSec;
					
					var arr = {};
					arr['employeeName'] = txt1;
					arr['totalEmployment'] = txt2;
					arr['benefitsInKind'] = txt3;
					arr['incomeFromSource'] = txt4;
					arr['pension'] = txt5;
					arr['hiddenValue'] = hiddenValue;

					yearlyValues.push(arr);
				}
			}

			exportDataYearlyByEmployee();

		}
	});

	// var PAYEYearlyArchives = Parse.Object.extend("PAYEYearlyArchives");
	// var query = new Parse.Query(PAYEYearlyArchives);
	// query.equalTo("objectId", identity);
	// query.first({
	// 	success: function(resultsObj) {
	// 		if(resultsObj){
	// 			document.getElementById("year").value = resultsObj.get('year');
	// 			document.getElementById("taxNo").value = resultsObj.get('taxNo');
	// 			document.getElementById("taxId").value = resultsObj.get('taxId');
	// 			document.getElementById("stateBir").value = resultsObj.get('stateBir');
	// 			document.getElementById("taxStationCode").value = resultsObj.get('taxStationCode');

	// 			var loadArray = resultsObj.get('yearlyValues');

	// 			for (var i = 0; i < loadArray.length; i++) {
	// 				var obj = loadArray[i];

	// 				var txt1 = obj['employeeName'];

	// 				if(txt1 == empName){
	// 					var txt2 = obj['totalEmployment'];
	// 					var txt3 = obj['benefitsInKind'];
	// 					var txt4 = obj['incomeFromSource'];
	// 					var txt5 = obj['pension'];
	// 					var hiddenValue = obj['hiddenValue'];

	// 					yearlyRowCount++;

	// 					var divSec = '<div id="yearlyValueRow'+yearlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemYearly('+yearlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

	// 					// document.getElementById("rowDataYearlyValues").innerHTML = document.getElementById("rowDataYearlyValues").innerHTML + divSec;
						
	// 					var arr = {};
	// 					arr['employeeName'] = txt1;
	// 					arr['totalEmployment'] = txt2;
	// 					arr['benefitsInKind'] = txt3;
	// 					arr['incomeFromSource'] = txt4;
	// 					arr['pension'] = txt5;
	// 					arr['hiddenValue'] = hiddenValue;

	// 					yearlyValues.push(arr);
	// 				}
	// 			}

	// 			exportDataYearlyByEmployee();
	// 		}
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}

function archiveForYear(){
	// var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var taxId = document.getElementById("taxId").value;
	var stateBir = document.getElementById("stateBir").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

	var PAYEYearlyArchives = Parse.Object.extend("PAYEYearlyArchives");
	var query = new Parse.Query(PAYEYearlyArchives);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.equalTo("year", year);
	query.first({
		success: function(resultsObj) {
			if(resultsObj){
				resultsObj.destroy({
					success: function(resultsObj) {
						// alert("Removed existing archived file!");
					},
					error: function(resultsObj, error) {
					}
				});
			}

			var PAYEYearlyArchives = Parse.Object.extend("PAYEYearlyArchives");
			var payeArchives = new PAYEYearlyArchives();

			payeArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			payeArchives.set("year", year);
			payeArchives.set("taxNo", taxNo);
			payeArchives.set("taxId", taxId);
			payeArchives.set("stateBir", stateBir);
			payeArchives.set("taxStationCode", taxStationCode);
			payeArchives.set("yearlyValues", yearlyValues);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			payeArchives.setACL(acl);

			payeArchives.save(null, {
				success: function(payeArchives) {
					alert("Your paye calculation form is archived!");
					window.location = "paye_reports_yearly.html?id="+payeArchives.id;
				},
				error: function(payeArchives, error) {
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

function removeItemYearly(id, hiddenValue){
	var r = confirm("Are you sure want to remove?");
	if (r == true) {
	    var index = functiontofindIndexByKeyValue(yearlyValues, "hiddenValue", hiddenValue);
		if(index != null){
			yearlyValues.splice(index, 1);
			document.getElementById("yearlyValueRow"+id).style.display = "none";
		}
		else{
			alert("Please add atleast one item!");
		}
	}
}

function addYearValues() {
	var txt1 = document.getElementById("txt1").value;
	var txt2 = document.getElementById("txt2").value;
	var txt3 = document.getElementById("txt3").value;
	var txt4 = document.getElementById("txt4").value;
	var txt5 = document.getElementById("txt5").value;

	if(txt1 == ""){
		alert("Please enter employee name!");
		return false;
	}

	if(txt2 == ""){
		alert("Please enter total employment income for the year!");
		return false;
	}

	if(txt3 == ""){
		alert("Please enter benefits in kind!");
		return false;
	}

	if(txt4 == ""){
		alert("Please enter income from other sources!");
		return false;
	}

	if(txt5 == ""){
		alert("Please enter pension!");
		return false;
	}

	var hiddenValue = Math.floor((Math.random() * 10000000000000000000) + 1);

	yearlyRowCount++;

	var divSec = '<div id="yearlyValueRow'+yearlyRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItemYearly('+yearlyRowCount+', '+hiddenValue+')">Delete</button> </div> </div>';

	document.getElementById("rowDataYearlyValues").innerHTML = document.getElementById("rowDataYearlyValues").innerHTML + divSec;
	
	var arr = {};
	arr['employeeName'] = txt1;
	arr['totalEmployment'] = txt2;
	arr['benefitsInKind'] = txt3;
	arr['incomeFromSource'] = txt4;
	arr['pension'] = txt5;
	arr['hiddenValue'] = hiddenValue;

	yearlyValues.push(arr);

	document.getElementById("txt1").value = "";
   	document.getElementById("txt2").value = "";
 	document.getElementById("txt3").value = "";
 	document.getElementById("txt4").value = "";
 	document.getElementById("txt5").value = "";
}

function exportDataEmailYearly(){
	document.getElementById("userEmail").value = user.get('email');
	document.getElementById("exportEmailBtn").disabled = true;
	var year = document.getElementById("year").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Year under review</th> <th>Total emolument for the year</th> <th>Contribution by the employee to approved pension funds in the year</th> <th>Contribution by employer on behalf of employee for the year</th> <th>Total pension contributions for the year</th> <th>Tax free emoluments for the year</th> <th>Taxable emolument for the year</th> <th>Total tax for the year</th> <th>Net emoluments for the year</th> <th>Income from source other than employment</th> </tr> ';

	for (var i = 0; i < yearlyValues.length; i++) {
		var empName = yearlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
		var totalEmployment = parseInt(yearlyValues[i]['totalEmployment']);
		var benefitsInKind = yearlyValues[i]['benefitsInKind'];
		var incomeFromSource = yearlyValues[i]['incomeFromSource'];
		var pension = yearlyValues[i]['pension'];

		var value1 = 0;
		var value2 = 0;

		if(pension == "Yes"){
			value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
		}
		else{
			value1 = 0;
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
		}

		var value3 = 0;

		if(value2*0.01 < 200000){
			value3 = parseInt(200000);
		}
		else{
			value3 = parseInt(value2*0.01);
		}

		var value4 = parseInt(value2 * 0.2);

		var value5 = 0;
		var value6 = 0;

		if(pension == "Yes"){
			value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			value6 = value3 + value4 + value5;
		}
		else{
			value5 = 0;
			value6 = value3 + value4;
		}

		var value7 = value2 - value6;

		var value8 = 0;

		if(value7 > 0){
			if(value7 > 300000){
				value8 = parseInt((300000)*0.07);
			}
			else{
				value8 = parseInt(value7*0.07)
			}
		}
		else{
			value8 = value2*0.01;
		}


		var value9 = 0;

		if((value7 - 300000) > 0){
			if(value7 > 600000){
				value9 = 300000*0.11;
			}
			else{
				value9 = (value7 - 300000)*0.11;
			}
		}
		else{
			value9 = 0;
		}


		var value10 = 0;

		if((value7 - 600000) > 0){
			if(value7 > 1100000){
				value10 = 500000*0.15;
			}
			else{
				value10 = (value7 - 600000)*0.15;
			}
		}
		else{
			value10 = 0;
		}


		var value11 = 0;

		if((value7 - 1100000) > 0){
			if(value7 > 1600000){
				value11 = 500000*0.19;
			}
			else{
				value11 = (value7 - 1100000)*0.19;
			}
		}
		else{
			value11 = 0;
		}


		var value12 = 0;

		if((value7 - 1600000) > 0){
			if(value7 > 3200000){
				value12 = 1600000*0.19;
			}
			else{
				value12 = (value7 - 1600000)*0.19;
			}
		}
		else{
			value12 = 0;
		}


		var value13 = 0;

		if((value7 - 3200000) > 0){
			if(value7 > 3200000){
				value13 = (value7 - 3200000)*0.24;
			}
			else{
				value13 = 0;
			}
		}
		else{
			value13 = 0;
		}


		var value14 = value8 + value9 + value10  + value11 + value12 + value13;

		var value15 = 0;

		if(pension == "Yes"){
			value15 = value5 + value14;
		}
		else{
			value15 = value14;
		}
		
		var value16 = parseInt(value2 - value15);
		
		totalEmployment = parseFloat(totalEmployment).toFixed(2);
		benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
		incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
		value1 = parseFloat(value1).toFixed(2);
		value2 = parseFloat(value2).toFixed(2);
		value3 = parseFloat(value3).toFixed(2);
		value4 = parseFloat(value4).toFixed(2);
		value5 = parseFloat(value5).toFixed(2);
		value6 = parseFloat(value6).toFixed(2);
		value7 = parseFloat(value7).toFixed(2);
		value8 = parseFloat(value8).toFixed(2);
		value9 = parseFloat(value9).toFixed(2);
		value10 = parseFloat(value10).toFixed(2);
		value11 = parseFloat(value11).toFixed(2);
		value12 = parseFloat(value12).toFixed(2);
		value13 = parseFloat(value13).toFixed(2);
		value14 = parseFloat(value14).toFixed(2);
		value15 = parseFloat(value15).toFixed(2);
		value16 = parseFloat(value16).toFixed(2);

		var sec1Value = 0;
		var sec2Value = 0;
		var sec3Value = 0

		if(pension == "Yes"){
		sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
		sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
                sec3Value = sec1Value + sec2Value;
		}
                else{
		sec1Value = 0;
		sec2Value = 0;
		sec3Value = 0;
                }

		var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+year+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td> </tr>';

		tableDiv = tableDiv + insideDiv;
	}

	tableDiv = tableDiv + '</table>';

	document.getElementById("table").value = tableDiv;
	
	$.ajax({
        type: 'POST',
        url: 'archieveScripts/paye/saveHmtlEmail.php',
        data: $("#form_name").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];

        	alert("Your results are sent to your email.");

        	document.getElementById("exportEmailBtn").disabled = false;
        }
    });
}

function exportDataYearly(){
	var year = document.getElementById("year").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Year under review</th> <th>Total emolument for the year</th> <th>Contribution by the employee to approved pension funds in the year</th> <th>Contribution by employer on behalf of employee for the year</th> <th>Total pension contributions for the year</th> <th>Tax free emoluments for the year</th> <th>Taxable emolument for the year</th> <th>Total tax for the year</th> <th>Net emoluments for the year</th> <th>Income from source other than employment</th> </tr> ';

	for (var i = 0; i < yearlyValues.length; i++) {
		var empName = yearlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
		var totalEmployment = parseInt(yearlyValues[i]['totalEmployment']);
		var benefitsInKind = yearlyValues[i]['benefitsInKind'];
		var incomeFromSource = yearlyValues[i]['incomeFromSource'];
		var pension = yearlyValues[i]['pension'];

		var value1 = 0;
		var value2 = 0;

		if(pension == "Yes"){
			value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
		}
		else{
			value1 = 0;
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
		}

		var value3 = 0;

		if(value2*0.01 < 200000){
			value3 = parseInt(200000);
		}
		else{
			value3 = parseInt(value2*0.01);
		}

		var value4 = parseInt(value2 * 0.2);

		var value5 = 0;
		var value6 = 0;

		if(pension == "Yes"){
			value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			value6 = value3 + value4 + value5;
		}
		else{
			value5 = 0;
			value6 = value3 + value4;
		}

		var value7 = value2 - value6;

		var value8 = 0;

		if(value7 > 0){
			if(value7 > 300000){
				value8 = parseInt((300000)*0.07);
			}
			else{
				value8 = parseInt(value7*0.07)
			}
		}
		else{
			value8 = value2*0.01;
		}


		var value9 = 0;

		if((value7 - 300000) > 0){
			if(value7 > 600000){
				value9 = 300000*0.11;
			}
			else{
				value9 = (value7 - 300000)*0.11;
			}
		}
		else{
			value9 = 0;
		}


		var value10 = 0;

		if((value7 - 600000) > 0){
			if(value7 > 1100000){
				value10 = 500000*0.15;
			}
			else{
				value10 = (value7 - 600000)*0.15;
			}
		}
		else{
			value10 = 0;
		}


		var value11 = 0;

		if((value7 - 1100000) > 0){
			if(value7 > 1600000){
				value11 = 500000*0.19;
			}
			else{
				value11 = (value7 - 1100000)*0.19;
			}
		}
		else{
			value11 = 0;
		}


		var value12 = 0;

		if((value7 - 1600000) > 0){
			if(value7 > 3200000){
				value12 = 1600000*0.19;
			}
			else{
				value12 = (value7 - 1600000)*0.19;
			}
		}
		else{
			value12 = 0;
		}


		var value13 = 0;

		if((value7 - 3200000) > 0){
			if(value7 > 3200000){
				value13 = (value7 - 3200000)*0.24;
			}
			else{
				value13 = 0;
			}
		}
		else{
			value13 = 0;
		}


		var value14 = value8 + value9 + value10  + value11 + value12 + value13;

		var value15 = 0;

		if(pension == "Yes"){
			value15 = value5 + value14;
		}
		else{
			value15 = value14;
		}
		
		var value16 = parseInt(value2 - value15);

		totalEmployment = parseFloat(totalEmployment).toFixed(2);
		benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
		incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
		value1 = parseFloat(value1).toFixed(2);
		value2 = parseFloat(value2).toFixed(2);
		value3 = parseFloat(value3).toFixed(2);
		value4 = parseFloat(value4).toFixed(2);
		value5 = parseFloat(value5).toFixed(2);
		value6 = parseFloat(value6).toFixed(2);
		value7 = parseFloat(value7).toFixed(2);
		value8 = parseFloat(value8).toFixed(2);
		value9 = parseFloat(value9).toFixed(2);
		value10 = parseFloat(value10).toFixed(2);
		value11 = parseFloat(value11).toFixed(2);
		value12 = parseFloat(value12).toFixed(2);
		value13 = parseFloat(value13).toFixed(2);
		value14 = parseFloat(value14).toFixed(2);
		value15 = parseFloat(value15).toFixed(2);
		value16 = parseFloat(value16).toFixed(2);

		var sec1Value = 0;
		var sec2Value = 0;
		var sec3Value = 0

		if(pension == "Yes"){
			sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			sec3Value = sec1Value + sec2Value;
		}
		else{
			sec1Value = 0;
			sec2Value = 0;
			sec3Value = 0;
		}

		var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+year+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td> </tr>';

		tableDiv = tableDiv + insideDiv;
	}

	tableDiv = tableDiv + '</table>';

	document.getElementById("table").value = tableDiv;

	$.ajax({
        type: 'POST',
        url: 'saveHtml',
        data: $("#form_name").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];

            window.location = "../generate.php?linkId="+linkId;

            document.getElementById("generatingExcelYear").innerHTML = "<img class='doneImage' src='"+base_url+"assets/images/done.png' />";
        }
    });
}

function exportDataYearlyByEmployee(){
	var year = document.getElementById("year").value;

	var tableDiv = '<table border="1">';

	for (var i = 0; i < yearlyValues.length; i++) {
		var empName = yearlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNamesArray.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNamesArray.indexOf(empName)];
		var totalEmployment = parseInt(yearlyValues[i]['totalEmployment']);
		var benefitsInKind = yearlyValues[i]['benefitsInKind'];
		var incomeFromSource = yearlyValues[i]['incomeFromSource'];
		var pension = yearlyValues[i]['pension'];

		var value1 = 0;
		var value2 = 0;

		if(pension == "Yes"){
			value1 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind) + value1;
		}
		else{
			value1 = 0;
			value2 = parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind);
		}

		var value3 = 0;

		if(value2*0.01 < 200000){
			value3 = parseInt(200000);
		}
		else{
			value3 = parseInt(value2*0.01);
		}

		var value4 = parseInt(value2 * 0.2);

		var value5 = 0;
		var value6 = 0;

		if(pension == "Yes"){
			value5 = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1 + (parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			value6 = value3 + value4 + value5;
		}
		else{
			value5 = 0;
			value6 = value3 + value4;
		}

		var value7 = value2 - value6;

		var value8 = 0;

		if(value7 > 0){
			if(value7 > 300000){
				value8 = parseInt((300000)*0.07);
			}
			else{
				value8 = parseInt(value7*0.07)
			}
		}
		else{
			value8 = value2*0.01;
		}


		var value9 = 0;

		if((value7 - 300000) > 0){
			if(value7 > 600000){
				value9 = 300000*0.11;
			}
			else{
				value9 = (value7 - 300000)*0.11;
			}
		}
		else{
			value9 = 0;
		}


		var value10 = 0;

		if((value7 - 600000) > 0){
			if(value7 > 1100000){
				value10 = 500000*0.15;
			}
			else{
				value10 = (value7 - 600000)*0.15;
			}
		}
		else{
			value10 = 0;
		}


		var value11 = 0;

		if((value7 - 1100000) > 0){
			if(value7 > 1600000){
				value11 = 500000*0.19;
			}
			else{
				value11 = (value7 - 1100000)*0.19;
			}
		}
		else{
			value11 = 0;
		}


		var value12 = 0;

		if((value7 - 1600000) > 0){
			if(value7 > 3200000){
				value12 = 1600000*0.19;
			}
			else{
				value12 = (value7 - 1600000)*0.19;
			}
		}
		else{
			value12 = 0;
		}


		var value13 = 0;

		if((value7 - 3200000) > 0){
			if(value7 > 3200000){
				value13 = (value7 - 3200000)*0.24;
			}
			else{
				value13 = 0;
			}
		}
		else{
			value13 = 0;
		}


		var value14 = value8 + value9 + value10  + value11 + value12 + value13;

		var value15 = 0;

		if(pension == "Yes"){
			value15 = value5 + value14;
		}
		else{
			value15 = value14;
		}
		
		var value16 = parseInt(value2 - value15);

		totalEmployment = parseFloat(totalEmployment).toFixed(2);
		benefitsInKind = parseFloat(benefitsInKind).toFixed(2);
		incomeFromSource = parseFloat(incomeFromSource).toFixed(2);
		value1 = parseFloat(value1).toFixed(2);
		value2 = parseFloat(value2).toFixed(2);
		value3 = parseFloat(value3).toFixed(2);
		value4 = parseFloat(value4).toFixed(2);
		value5 = parseFloat(value5).toFixed(2);
		value6 = parseFloat(value6).toFixed(2);
		value7 = parseFloat(value7).toFixed(2);
		value8 = parseFloat(value8).toFixed(2);
		value9 = parseFloat(value9).toFixed(2);
		value10 = parseFloat(value10).toFixed(2);
		value11 = parseFloat(value11).toFixed(2);
		value12 = parseFloat(value12).toFixed(2);
		value13 = parseFloat(value13).toFixed(2);
		value14 = parseFloat(value14).toFixed(2);
		value15 = parseFloat(value15).toFixed(2);
		value16 = parseFloat(value16).toFixed(2);

		var sec1Value = 0;
		var sec2Value = 0;
		var sec3Value = 0

		if(pension == "Yes"){
			sec1Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.08);
			sec2Value = parseInt((parseInt(totalEmployment) + parseInt(benefitsInKind))*0.1);
			sec3Value = sec1Value + sec2Value;
		}
		else{
			sec1Value = 0;
			sec2Value = 0;
			sec3Value = 0;
		}

		var insideDiv = '<tr> <th>Employee Name</th> <td>'+empName+'</td> </tr> <tr> <th>Employee TIN</th> <td>'+empTIN+'</td> </tr> <tr> <th>Address of employee</th> <td>'+empAddress+'</td> </tr> <tr> <th>Year under review</th> <td>'+year+'</td> </tr> <tr> <th>Total emolument for the year</th> <td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td> </tr> <tr> <th>Contribution by the employee to approved pension funds in the year</th> <td>'+sec1Value+'</td> </tr> <tr> <th>Contribution by employer on behalf of employee for the year</th> <td>'+sec2Value+'</td> </tr> <tr> <th>Total pension contributions for the year</th> <td>'+sec3Value+'</td> </tr> <tr> <th>Tax free emoluments for the year</th> <td>'+(value6 - value1).toFixed(2)+'</td> </tr> <tr> <th>Taxable emolument for the year</th> <td>'+value7+'</td> </tr> <tr> <th>Total tax for the year</th> <td>'+value14+'</td> </tr> <tr> <th>Net emoluments for the year</th> <td>'+value16+'</td> </tr> <tr> <th>Income from sources other than employment</th> <td>'+parseInt(incomeFromSource)+'</td> </tr>';
		
		tableDiv = tableDiv + insideDiv;
	}

	tableDiv = tableDiv + '</table>';

	document.getElementById("table").value = tableDiv;

	$.ajax({
        type: 'POST',
        url: 'saveHtml',
        data: $("#form_name").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];

            window.location = "../generate.php?linkId="+linkId;

            document.getElementById("generatingExcelYear").innerHTML = "<img class='doneImage' src='"+base_url+"assets/images/done.png' />";
        }
    });
}