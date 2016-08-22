var user = getCurrentUser();
var employeeDetails = [];
var employeeRowCount = 0;

function loadPayeDetails(){
	var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
	var query = new Parse.Query(PAYEEmployee);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			if(resultsObj){
				var employeeDetailsLoad = resultsObj.get('employeeDetails');

				for (var i = 0; i < employeeDetailsLoad.length; i++) {
					var obj = employeeDetailsLoad[i];

					var txt1 = obj['employeeName'];
					var txt2 = obj['taxIdentificationNumber'];
					var txt3 = obj['designation'];
					var txt4 = obj['employeeAddress'];
					var hiddenValue = obj['hiddenValue'];

					employeeRowCount++;

					var divSec = '<div id="employeeRow'+employeeRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD"> <button class="btn1" onclick="removeEmployee('+employeeRowCount+', '+hiddenValue+', \''+resultsObj.id+'\')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editEmployee('+employeeRowCount+', '+hiddenValue+', \''+resultsObj.id+'\')">Edit</button></div> </div>';

					document.getElementById("rowDataEmployees").innerHTML = document.getElementById("rowDataEmployees").innerHTML + divSec;
					
					var arr = {};

					arr['employeeName'] = txt1;
					arr['taxIdentificationNumber'] = txt2;
					arr['designation'] = txt3;
					arr['employeeAddress'] = txt4;
					arr['hiddenValue'] = hiddenValue;

					employeeDetails.push(arr);
				}
			}
		},
		error: function(error) {
			// alert("Please check your internet connection!");
		}
	});
}

function addNewEmployee(){
	var txt1 = document.getElementById("txt1").value;
	var txt2 = document.getElementById("txt2").value;
	var txt3 = document.getElementById("txt3").value;
	var txt4 = document.getElementById("txt4").value;

	if(txt1 == ""){
		alert("Please enter employee name!");
		return false;
	}

	if(txt2 == ""){
		alert("Please enter tax identification no!");
		return false;
	}

	if(txt3 == ""){
		alert("Please enter designation!");
		return false;
	}

	if(txt4 == ""){
		alert("Please enter employee address!");
		return false;
	}

	var hiddenValue = Math.floor((Math.random() * 10000000000000000000) + 1);

	var arr = {};
	arr['employeeName'] = txt1;
	arr['taxIdentificationNumber'] = txt2;
	arr['designation'] = txt3;
	arr['employeeAddress'] = txt4;
	arr['hiddenValue'] = hiddenValue;

	employeeDetails.push(arr);

	var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
	var query = new Parse.Query(PAYEEmployee);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			if(!resultsObj){
				var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
				var payeEmployee = new PAYEEmployee();

				payeEmployee.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
				payeEmployee.set("employeeDetails", employeeDetails);

				var acl = new Parse.ACL();
				acl.setPublicReadAccess(false);
				acl.setPublicWriteAccess(false);
				acl.setReadAccess(user, true);
				acl.setWriteAccess(user, true);
				payeEmployee.setACL(acl);

				payeEmployee.save(null, {
					success: function(payeEmployee) {
						employeeRowCount++;

						var divSec = '<div id="employeeRow'+employeeRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD"> <button class="btn1" onclick="removeEmployee('+employeeRowCount+', '+hiddenValue+', \''+payeEmployee.id+'\')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editEmployee('+employeeRowCount+', '+hiddenValue+')">Edit</button> </div> </div>';

						document.getElementById("rowDataEmployees").innerHTML = document.getElementById("rowDataEmployees").innerHTML + divSec;

						document.getElementById("txt1").value = "";
						document.getElementById("txt2").value = "";
						document.getElementById("txt3").value = "";
						document.getElementById("txt4").value = "";

						alert("New employee is added!");
					},
					error: function(payeEmployee, error) {
						alert(error.message);
					}
				});
			}
			else{
				var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
				var payeEmployee = new PAYEEmployee();

				payeEmployee.set("objectId", resultsObj.id);
				payeEmployee.set("employeeDetails", employeeDetails);

				payeEmployee.save(null, {
					success: function(payeEmployee) {
						employeeRowCount++;

						var divSec = '<div id="employeeRow'+employeeRowCount+'"> <div class="rowTD">'+txt1+'</div> <div class="rowTD">'+txt2+'</div> <div class="rowTD">'+txt3+'</div> <div class="rowTD"> '+txt4+' </div> <div class="rowTD"> <button class="btn1" onclick="removeEmployee('+employeeRowCount+', '+hiddenValue+', \''+payeEmployee.id+'\')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editEmployee('+employeeRowCount+', '+hiddenValue+', \''+payeEmployee.id+'\')">Edit</button></div> </div>';

						document.getElementById("rowDataEmployees").innerHTML = document.getElementById("rowDataEmployees").innerHTML + divSec;

						document.getElementById("txt1").value = "";
						document.getElementById("txt2").value = "";
						document.getElementById("txt3").value = "";
						document.getElementById("txt4").value = "";

						alert("New employee is added!");
					},
					error: function(payeEmployee, error) {
						alert(error.message);
					}
				});
			}
		},
		error: function(error) {
			alert(error.message);
		}
	});
}

function removeEmployee(id, hiddenValue, objectId){
	var r = confirm("Are you sure want to remove?");
	if (r == true) {
	    var index = functiontofindIndexByKeyValue(employeeDetails, "hiddenValue", hiddenValue);
		if(index != null){
			employeeDetails.splice(index, 1);

			var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
			var payeEmployee = new PAYEEmployee();

			payeEmployee.set("objectId", objectId);
			payeEmployee.set("employeeDetails", employeeDetails);

			payeEmployee.save(null, {
				success: function(payeEmployee) {
					document.getElementById("employeeRow"+id).style.display = "none";
				},
				error: function(payeEmployee, error) {
					alert(error.message);
				}
			});
		}
		else{
			alert("Please add atleast one item!");
		}
	}
}

function editEmployee(id, hiddenValue, empId){
	var index = functiontofindIndexByKeyValue(employeeDetails, "hiddenValue", hiddenValue);

	var employeeName = employeeDetails[index]['employeeName'];
	var taxIdentificationNumber = employeeDetails[index]['taxIdentificationNumber'];
	var designation = employeeDetails[index]['designation'];
	var employeeAddress = employeeDetails[index]['employeeAddress'];

	document.getElementById("employeeRow"+id).innerHTML = '<div class="rowTD"><input type="text" id="employeeName'+id+'" value='+employeeName+' /></div> <div class="rowTD"><input type="text" id="taxIdentificationNumber'+id+'" value='+taxIdentificationNumber+' /></div> <div class="rowTD"><input type="text" id="designation'+id+'" value='+designation+' /></div>  <div class="rowTD"><input type="text" id="employeeAddress'+id+'" value='+employeeAddress+' /></div> <div class="rowTD"> <button class="btn1" onclick="saveEditedEmployee('+id+', '+hiddenValue+', \''+empId+'\')">Save</button></div>';
}

function saveEditedEmployee(id, hiddenValue, empId){
	var employeeName = document.getElementById("employeeName"+id).value;
	var taxIdentificationNumber = document.getElementById("taxIdentificationNumber"+id).value;
	var designation = document.getElementById("designation"+id).value;
	var employeeAddress = document.getElementById("employeeAddress"+id).value;

	var index = functiontofindIndexByKeyValue(employeeDetails, "hiddenValue", hiddenValue);

	employeeDetails[index]['employeeName'] = employeeName;
	employeeDetails[index]['taxIdentificationNumber'] = taxIdentificationNumber;
	employeeDetails[index]['designation'] = designation;
	employeeDetails[index]['employeeAddress'] = employeeAddress;

	document.getElementById("employeeRow"+id).innerHTML = '<div class="rowTD">'+employeeName+'</div> <div class="rowTD">'+taxIdentificationNumber+'</div> <div class="rowTD">'+designation+'</div> <div class="rowTD"> '+employeeAddress+' </div> <div class="rowTD"> <button class="btn1" onclick="removeEmployee('+id+', '+hiddenValue+', \''+empId+'\')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editEmployee('+id+', '+hiddenValue+', \''+empId+'\')">Edit</button> </div>';

	var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
	var query = new Parse.Query(PAYEEmployee);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			var PAYEEmployee = Parse.Object.extend("PAYEEmployee");
			var payeEmployee = new PAYEEmployee();

			payeEmployee.set("objectId", resultsObj.id);
			payeEmployee.set("employeeDetails", employeeDetails);

			payeEmployee.save(null, {
				success: function(payeEmployee) {
					alert("Employee is updated!");
				},
				error: function(payeEmployee, error) {
					alert(error.message);
				}
			});
		},
		error: function(error) {
			alert(error.message);
		}
	});
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
	for (var i = 0; i < arraytosearch.length; i++) {

		if (arraytosearch[i][key] == valuetosearch) {
			return i;
		}
	}
	return null;
}