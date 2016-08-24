var monthlyValues = [];
var rowCount = 0;
var isArchived = false;
var archivedDocument = "";
var employeeNames = [];
var employeeTINs = [];
var employeeAddresses = [];
var employeeCumulativeArray = [];
var employeeCumulativeArray1 = [];
var employeeCumulativeArray2 = [];
var employeeCumulativeArray3 = [];
var employeeLength;
var base_url = 'http://localhost/TaxAssists/';

function loadEmployees(){
	var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
	var query = new Parse.Query(PAYEEmployee);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });

	query.first({
		success: function(resultsObj) {
			if(resultsObj != undefined){
				var employeeDetails = resultsObj.get('employeeDetails');

				var employeeDiv = "";

				employeeLength = employeeDetails.length;

				for (var i = 0; i < employeeDetails.length; i++) {
					var name = employeeDetails[i].employeeName;
					employeeDiv = employeeDiv + "<option value='"+name+"'>"+name+"</option>";

					employeeNames.push(employeeDetails[i].employeeName);
					employeeTINs.push(employeeDetails[i].taxIdentificationNumber);
					employeeAddresses.push(employeeDetails[i].employeeAddress);
				}

				emptyCumulativeArray();

				document.getElementById("employeeNameSet").innerHTML = "<select id='txt1'><option value='' selected disabled>-- Select Employee --</option>"+employeeDiv+"</select>";
			}
		},
		error: function(error) {
			// alert("Please check your internet connection!");
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

	rowCount++;

	var divSec = '<div id="monthlyValueRow'+rowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItem('+rowCount+', '+hiddenValue+')">Delete</button>  &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+rowCount+', '+hiddenValue+')">Edit</button> </div> </div>';

	document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;

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

	document.getElementById("txt1").value = "";
   	document.getElementById("txt2").value = "";
 	document.getElementById("txt3").value = "";
 	document.getElementById("txt4").value = "";
 	document.getElementById("txt5").value = "";
}

function removeItem(id, hiddenValue){
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

function calculateCumulativeFigures(currentMonthValue, curentYear){
	emptyCumulativeArray();

	// alert(user.id);

	var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	var query = new Parse.Query(PAYEMonthlyArchives);

	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.equalTo("year", curentYear);

	query.find({
		success: function(results) {

			// alert(results.length);

			for (var i = 0; i < results.length; i++) {
				var obj = results[i];

				var getMonthVal = returnMonthValue(obj.get('month'));

				// alert(getMonthVal +" -- "+ currentMonthValue);


				if(getMonthVal <= currentMonthValue){
					var monthlyValuesNew = obj.get('monthlyValues');

					// alert(obj.get('month'));

					for (var j = 0; j < monthlyValuesNew.length; j++) {
						var employeeName = monthlyValuesNew[j]['employeeName'];

						var empIndex = employeeNames.indexOf(employeeName);

						if(empIndex > -1){
							employeeCumulativeArray[empIndex] = employeeCumulativeArray[empIndex] + parseInt(monthlyValuesNew[j]['cumulativeNetEmoluments']);
							employeeCumulativeArray1[empIndex] = employeeCumulativeArray1[empIndex] + parseInt(monthlyValuesNew[j]['cumulativeTaxFreeEmoluments']);
							employeeCumulativeArray2[empIndex] = employeeCumulativeArray2[empIndex] + parseInt(monthlyValuesNew[j]['cumulativeTaxableEmoluments']);
							employeeCumulativeArray3[empIndex] = employeeCumulativeArray3[empIndex] + parseInt(monthlyValuesNew[j]['correspondingCumulativeTax']);
						}
					}
				}
			}

			// console.log(employeeNames);
			// console.log(employeeCumulativeArray);
		},
		error: function(error) {
			// alert("Please check your internet connection!");
		}
	});
}

function editServiceItem(id, hiddenValue){
	var index = functiontofindIndexByKeyValue(monthlyValues, "hiddenValue", hiddenValue);

	var employeeName = monthlyValues[index]['employeeName'];
	var totalEmployment = monthlyValues[index]['totalEmployment'];
	var benefitsInKind = monthlyValues[index]['benefitsInKind'];
	var incomeFromSource = monthlyValues[index]['incomeFromSource'];
	var pension = monthlyValues[index]['pension'];

	var empSelectSet = "";

	for (var i = 0; i < employeeNames.length; i++) {
		empSelectSet = empSelectSet + "<option value='"+employeeNames[i]+"'>"+employeeNames[i]+"</option>";
	}

	var selectDiv = '<select id="pension'+id+'"> <option value="Yes">Yes</option> <option value="No">No</option> </select>';

	document.getElementById("monthlyValueRow"+id).innerHTML = '<div class="rowTD"><select id="employeeName'+id+'">'+empSelectSet+'</select> </div> <div class="rowTD"><input type="text" id="totalEmployment'+id+'" value='+totalEmployment+' /></div> <div class="rowTD"><input type="text" id="benefitsInKind'+id+'" value='+benefitsInKind+' /></div> <div class="rowTD"><input type="text" id="incomeFromSource'+id+'" value='+incomeFromSource+' /></div> <div class="rowTD"> '+selectDiv+' </div> <div class="rowTD"> <button class="btn1" onclick="saveEditedRowService('+id+', '+hiddenValue+')">Save</button></div>';

	document.getElementById("pension"+id).value = pension;
	document.getElementById("employeeName"+id).value = employeeName;
}

function saveEditedRowService(id, hiddenValue){
	var employeeName = document.getElementById("employeeName"+id).value;
	var totalEmployment = document.getElementById("totalEmployment"+id).value;
	var benefitsInKind = document.getElementById("benefitsInKind"+id).value;
	var incomeFromSource = document.getElementById("incomeFromSource"+id).value;
	var pension = document.getElementById("pension"+id).value;

	var index = functiontofindIndexByKeyValue(monthlyValues, "hiddenValue", hiddenValue);


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

	monthlyValues[index]['employeeName'] = employeeName;
	monthlyValues[index]['totalEmployment'] = totalEmployment;
	monthlyValues[index]['benefitsInKind'] = benefitsInKind;
	monthlyValues[index]['incomeFromSource'] = incomeFromSource;
	monthlyValues[index]['pension'] = pension;
	monthlyValues[index]['cumulativeNetEmoluments'] = value16;
	monthlyValues[index]['cumulativeTaxFreeEmoluments'] = value6 - value1;
	monthlyValues[index]['cumulativeTaxableEmoluments'] = value7;
	monthlyValues[index]['correspondingCumulativeTax'] = value14;

	document.getElementById("monthlyValueRow"+id).innerHTML = '<div class="rowTD">'+employeeName+'</div> <div class="rowTD">'+totalEmployment+'</div> <div class="rowTD">'+benefitsInKind+'</div> <div class="rowTD"> '+incomeFromSource+' </div> <div class="rowTD">'+pension+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItem('+id+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+id+', '+hiddenValue+')">Edit</button> </div>';
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) {

		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}
	return null;
}

function loadPayeDetails(){

	$.ajax({
		url: 'loadPayeDetails',
		type: 'POST',
		success: function(data, status) {
			var data = JSON.parse(data);

			if(data.length != 0){
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

					rowCount++;

					var divSec = '<div id="monthlyValueRow'+rowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItem('+rowCount+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+rowCount+', '+hiddenValue+')">Edit</button> </div> </div>';

					document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;
					
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
				}
			}
		}
	});



	// var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
	// var query = new Parse.Query(PAYEMonthly);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
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

	// 				rowCount++;

	// 				var divSec = '<div id="monthlyValueRow'+rowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD">'+txt5+'</div> <div class="rowTD"> <button class="btn1" onclick="removeItem('+rowCount+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+rowCount+', '+hiddenValue+')">Edit</button> </div> </div>';

	// 				document.getElementById("rowDataMonthlyValues").innerHTML = document.getElementById("rowDataMonthlyValues").innerHTML + divSec;
					
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
	// 			}
	// 		}
	// 	},
	// 	error: function(error) {
	// 		// alert("Please check your internet connection!");
	// 	}
	// });
}


$(document).ready(function() {


	$('#monthly_cal').on('submit', function(event){
		event.preventDefault();

		if(monthlyValues.length != 0){
			document.getElementById('monthlyValues').value = JSON.stringify(monthlyValues);
		}

		var formData = new FormData(this);

		var other_data = $('#monthly_cal').serializeArray();
	    $.each(other_data,function(key,input){
	        formData.append(input.name,input.value);
	    });

		archiveForMonth(formData);

		document.getElementById("loadingSec").innerHTML = '<img src=" '+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';

		$.ajax({
			url: 'submitPayMonthly',
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data, status) {
				if(data == 1){
						alert("Your paye monthly calculation form is saved! If you think this is final version for month, please archive it. Only archived reports can be spooled later!");
						document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';
						exportDataSave();
				}
				else{
					document.getElementById("loadingSec").innerHTML = "";
				}
			}
		});

	});

});

function saveDetails(){
	// var month = document.getElementById("month").value;
	// var year = document.getElementById("year").value;
	// var taxNo = document.getElementById("taxNo").value;
	// var taxId = document.getElementById("taxId").value;
	// var stateBir = document.getElementById("stateBir").value;
	// var taxStationCode = document.getElementById("taxStationCode").value;

	// document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

	// var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
	// var query = new Parse.Query(PAYEMonthly);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.first({
	// 	success: function(resultsObj) {
	// 		if(resultsObj){
	// 			var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
	// 			var paye = new PAYEMonthly();

	// 			paye.set("objectId", resultsObj.id);
	// 			paye.set("month", month);
	// 			paye.set("year", year);
	// 			paye.set("taxNo", taxNo);
	// 			paye.set("taxId", taxId);
	// 			paye.set("stateBir", stateBir);
	// 			paye.set("taxStationCode", taxStationCode);
	// 			paye.set("monthlyValues", monthlyValues);

	// 			paye.save(null, {
	// 				success: function(paye) {
	// 					alert("Your paye monthly calculation form is saved! If you think this is final version for month, please archive it. Only archived reports can be spooled later!");
	// 					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';
						
	// 					exportDataSave();
	// 				},
	// 				error: function(paye, error) {
	// 					alert(error.message);
	// 					document.getElementById("loadingSec").innerHTML = "";
	// 				}
	// 			});
	// 		}
	// 		else{
	// 			var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
	// 			var paye = new PAYEMonthly();

	// 			paye.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// 			paye.set("month", month);
	// 			paye.set("year", year);
	// 			paye.set("taxNo", taxNo);
	// 			paye.set("taxId", taxId);
	// 			paye.set("stateBir", stateBir);
	// 			paye.set("taxStationCode", taxStationCode);
	// 			paye.set("monthlyValues", monthlyValues);

	// 			var acl = new Parse.ACL();
	// 			acl.setPublicReadAccess(false);
	// 			acl.setPublicWriteAccess(false);
	// 			acl.setReadAccess(user, true);
	// 			acl.setWriteAccess(user, true);
	// 			paye.setACL(acl);

	// 			paye.save(null, {
	// 				success: function(paye) {
	// 					alert("Your paye montly calculation form is saved! If you think this is final version for month, please archive it!");
	// 					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';
						
	// 					exportDataSave();
	// 				},
	// 				error: function(paye, error) {
	// 					alert(error.message);
	// 					document.getElementById("loadingSec").innerHTML = "";
	// 				}
	// 			});
	// 		}
	// 	},
	// 	error: function(error) {
	// 		alert(error.message);
	// 		document.getElementById("loadingSec").innerHTML = "";
	// 	}
	// });
}

function saveAfetrArchive(){
	var month = document.getElementById("month").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var taxId = document.getElementById("taxId").value;
	var stateBir = document.getElementById("stateBir").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

	var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
	var query = new Parse.Query(PAYEMonthly);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			if(resultsObj){
				var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
				var paye = new PAYEMonthly();

				paye.set("objectId", resultsObj.id);
				paye.set("month", month);
				paye.set("year", year);
				paye.set("taxNo", taxNo);
				paye.set("taxId", taxId);
				paye.set("stateBir", stateBir);
				paye.set("taxStationCode", taxStationCode);
				paye.set("monthlyValues", monthlyValues);

				paye.save(null, {
					success: function(paye) {
						//Success
					},
					error: function(paye, error) {
						alert(error.message);
						document.getElementById("loadingSec").innerHTML = "";
					}
				});
			}
			else{
				var PAYEMonthly = Parse.Object.extend("PAYEMonthly");
				var paye = new PAYEMonthly();

				paye.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
				paye.set("month", month);
				paye.set("year", year);
				paye.set("taxNo", taxNo);
				paye.set("taxId", taxId);
				paye.set("stateBir", stateBir);
				paye.set("taxStationCode", taxStationCode);
				paye.set("monthlyValues", monthlyValues);

				var acl = new Parse.ACL();
				acl.setPublicReadAccess(false);
				acl.setPublicWriteAccess(false);
				acl.setReadAccess(user, true);
				acl.setWriteAccess(user, true);
				paye.setACL(acl);

				paye.save(null, {
					success: function(paye) {
						//Success
					},
					error: function(paye, error) {
						alert(error.message);
						document.getElementById("loadingSec").innerHTML = "";
					}
				});
			}
		},
		error: function(error) {
			alert(error.message);
			document.getElementById("loadingSec").innerHTML = "";
		}
	});
}

function archiveForMonth(formData){
	// var month = document.getElementById("month").value;
	// var year = document.getElementById("year").value;
	// var taxNo = document.getElementById("taxNo").value;
	// var taxId = document.getElementById("taxId").value;
	// var stateBir = document.getElementById("stateBir").value;
	// var taxStationCode = document.getElementById("taxStationCode").value;

	// document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

	// var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	// var query = new Parse.Query(PAYEMonthlyArchives);
	// query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// query.equalTo("monthArchived", month+" "+year);
	// query.first({
	// 	success: function(resultsObj) {
	// 		// console.log(resultsObj);

	// 		if(resultsObj){
	// 			resultsObj.destroy({
	// 				success: function(resultsObj) {
	// 					// alert("Removed existing archived file!");
	// 					var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	// 					var payeArchives = new PAYEMonthlyArchives();

	// 					payeArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// 					payeArchives.set("month", month);
	// 					payeArchives.set("year", year);
	// 					payeArchives.set("taxNo", taxNo);
	// 					payeArchives.set("taxId", taxId);
	// 					payeArchives.set("stateBir", stateBir);
	// 					payeArchives.set("taxStationCode", taxStationCode);
	// 					payeArchives.set("monthlyValues", monthlyValues);
	// 					payeArchives.set("monthArchived", month+" "+year);

	// 					var acl = new Parse.ACL();
	// 					acl.setPublicReadAccess(false);
	// 					acl.setPublicWriteAccess(false);
	// 					acl.setReadAccess(user, true);
	// 					acl.setWriteAccess(user, true);
	// 					payeArchives.setACL(acl);

	// 					payeArchives.save(null, {
	// 						success: function(payeArchives) {
	// 							calculateCumulativeFigures(returnMonthValue(month), year);

	// 							saveAfetrArchive();
	// 							alert("Your paye calculation form is archived!");
	// 							document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!</a>';
	// 							document.getElementById("loadingSec1").innerHTML = '<select id="archiveType" style="width:200px;"> <option value="Excel">Export As Excel</option> <option value="Html">Export As Html</option> </select> <br/> <button onclick="exportData()">Export</button> &nbsp;&nbsp;&nbsp; <button id="exportEmailBtn" onclick="exportDataEmail()">Email Archive</button>';
	// 						},
	// 						error: function(payeArchives, error) {
	// 							alert(error.message);
	// 							document.getElementById("loadingSec").innerHTML = "";
	// 						}
	// 					});
	// 				},
	// 				error: function(resultsObj, error) {
	// 				}
	// 			});
	// 		}
	// 		else{
	// 			var PAYEMonthlyArchives = Parse.Object.extend("PAYEMonthlyArchives");
	// 			var payeArchives = new PAYEMonthlyArchives();

	// 			payeArchives.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	// 			payeArchives.set("month", month);
	// 			payeArchives.set("year", year);
	// 			payeArchives.set("taxNo", taxNo);
	// 			payeArchives.set("taxId", taxId);
	// 			payeArchives.set("stateBir", stateBir);
	// 			payeArchives.set("taxStationCode", taxStationCode);
	// 			payeArchives.set("monthlyValues", monthlyValues);
	// 			payeArchives.set("monthArchived", month+" "+year);

	// 			var acl = new Parse.ACL();
	// 			acl.setPublicReadAccess(false);
	// 			acl.setPublicWriteAccess(false);
	// 			acl.setReadAccess(user, true);
	// 			acl.setWriteAccess(user, true);
	// 			payeArchives.setACL(acl);

	// 			payeArchives.save(null, {
	// 				success: function(payeArchives) {
	// 					calculateCumulativeFigures(returnMonthValue(month), year);

	// 					saveAfetrArchive();
	// 					alert("Your paye calculation form is archived!");
	// 					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!</a>';
	// 					document.getElementById("loadingSec1").innerHTML = '<select id="archiveType" style="width:200px;"> <option value="Excel">Export As Excel</option> <option value="Html">Export As Html</option> </select> <br/> <button onclick="exportData()">Export</button> &nbsp;&nbsp;&nbsp; <button id="exportEmailBtn" onclick="exportDataEmail()">Email Archive</button>';
	// 				},
	// 				error: function(payeArchives, error) {
	// 					alert(error.message);
	// 					document.getElementById("loadingSec").innerHTML = "";
	// 				}
	// 			});
	// 		}
	// 	},
	// 	error: function(error) {
	// 		alert(error.message);
	// 		document.getElementById("loadingSec").innerHTML = "";
	// 	}
	// });


		$.ajax({
			url: 'archiveForMonth',
			type: 'POST',
			data: formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data, status) {
				alert(data);
				if(data == 11){
					//saveAfetrArchive();
					alert("Your paye calculation form is archived!");
					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Archived!</a>';
					document.getElementById("loadingSec1").innerHTML = '<select id="archiveType" style="width:200px;"> <option value="Excel">Export As Excel</option> <option value="Html">Export As Html</option> </select> <br/> <button onclick="exportData()">Export</button> &nbsp;&nbsp;&nbsp; <button id="exportEmailBtn" onclick="exportDataEmail()">Email Archive</button>';
				}
				else{
					document.getElementById("loadingSec").innerHTML = "";
				}
			}
		});

}

function exportDataEmail(){

	document.getElementById("exportEmailBtn").disabled = true;
	var month = document.getElementById("month").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from sources other than employment</th> <th>Cumulative net emoluments year-to-date</th> <th>Cumulative tax free emoluments year-to-date</th> <th>Cumulative taxable emoluments year-to-date </th> <th>Corresponding cumulative tax year to date</th> </tr> ';

	for (var i = 0; i < monthlyValues.length; i++) {
		var empName = monthlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNames.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNames.indexOf(empName)];
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

		var index = employeeNames.indexOf(empName);

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
        url: 'saveHmtlEmail',
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
	var month = document.getElementById("month").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from sources other than employment</th> <th>Cumulative net emoluments year-to-date</th> <th>Cumulative tax free emoluments year-to-date</th> <th>Cumulative taxable emoluments year-to-date </th> <th>Corresponding cumulative tax year to date</th> </tr> ';

	for (var i = 0; i < monthlyValues.length; i++) {
		var empName = monthlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNames.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNames.indexOf(empName)];
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

		var index = employeeNames.indexOf(empName);

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

	// console.log(tableDiv);

	document.getElementById("table").value = tableDiv;

	if(archiveType == "Html"){
		$.ajax({
            type: 'POST',
            url: 'saveHtml',
            data: $("#monthly_cal").serialize(),
            success: function(result) {
            	var res = result.split("#");
            	var linkId = res[res.length - 1];

                var win = window.open("../files/"+linkId, '_blank');
  				win.focus();
            }
        });
	}
	else if(archiveType == "Excel"){
		$.ajax({
            type: 'POST',
            url: 'saveHtml',
            data: $("#monthly_cal").serialize(),
            success: function(result) {
            	var res = result.split("#");
            	var linkId = res[res.length - 1];

                window.location = "../generate.php?linkId="+linkId;
            }
        });
	}
}

function exportDataSave(){
	var month = document.getElementById("month").value;

	var tableDiv = '<table border="1"> <tr> <th>Employee Name</th> <th>Employee TIN</th> <th>Address of employee</th> <th>Month</th> <th>Total emolument for the month</th> <th>Contribution by the employee to approved pension funds in the month</th> <th>Contribution by employer on behalf of employee for the month</th> <th>Total pension contributions</th> <th>Tax free emoluments for the month</th> <th>Taxable emolument for the month</th> <th>Tax for the month</th> <th>Net emoluments for the month</th> <th>Income from sources other than employment</th> </tr>';

	for (var i = 0; i < monthlyValues.length; i++) {
		var empName = monthlyValues[i]['employeeName'];
		var empTIN = employeeTINs[employeeNames.indexOf(empName)];
		var empAddress = employeeAddresses[employeeNames.indexOf(empName)];
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

		var index = employeeNames.indexOf(empName);

		// var cumulative1 = employeeCumulativeArray[index];
		// var cumulative2 = employeeCumulativeArray1[index];
		// var cumulative3 = employeeCumulativeArray2[index];
		// var cumulative4 = employeeCumulativeArray3[index];

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
		// cumulative1 = parseFloat(cumulative1).toFixed(2);
		// cumulative2 = parseFloat(cumulative2).toFixed(2);
		// cumulative3 = parseFloat(cumulative3).toFixed(2);
		// cumulative4 = parseFloat(cumulative4).toFixed(2);

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

		var insideDiv = '<tr> <td>'+empName+'</td>'+'<td>'+empTIN+'</td>'+'<td>'+empAddress+'</td>'+'<td>'+month+'</td>'+'<td>'+(parseInt(totalEmployment) + parseInt(incomeFromSource) + parseInt(benefitsInKind))+'</td>'+'<td>'+sec1Value+'</td>'+'<td>'+sec2Value+'</td>'+'<td>'+sec3Value+'</td>'+'<td>'+(value6 - value1).toFixed(2)+'</td>'+'<td>'+value7+'</td>'+'<td>'+value14+'</td>'+'<td>'+value16+'</td>'+'<td>'+parseInt(incomeFromSource)+'</td></tr>';

		tableDiv = tableDiv + insideDiv;
	}

	tableDiv = tableDiv + '</table>';

	document.getElementById("table").value = tableDiv;

	alert('aaa');

	$.ajax({
        type: 'POST',
        url: 'saveHmtlSave',
        data: $("#monthly_cal").serialize(),
        success: function(result) {
        	var res = result.split("#");
        	var linkId = res[res.length - 1];

            var win = window.open("../files/"+linkId, '_blank');
			win.focus();
        }
    });
}