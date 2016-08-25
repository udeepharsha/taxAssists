function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function saveDetails(){
	document.getElementById("loadingSec1").innerHTML = '<img src="'+base_url+'assets/images/loading.gif" style="width:37px; height:37px;">';
	
	if(!validateEmail(document.getElementById("userEmail").value)){
		alert("Please, fill in valid email address!");
		document.getElementById("loadingSec1").innerHTML = ""
		return;
	}
	// else if(document.getElementById("userPassword").value.trim() == ''){
	// 	alert("Password can't be empty");
	// 	document.getElementById("loadingSec1").innerHTML = ""
	// 	return;		
	// }

	if(document.getElementById("userPassword").value.trim() != ""){
		var score = scorePassword(document.getElementById("userPassword").value.trim());

		if(score <60) {
			alert("Password is weak. \nPassword should contain caps, letter, figures and special character");
			document.getElementById("loadingSec1").innerHTML = ""
			return;
		}
	}

	
	$.ajax({
		url: 'loadMyDetails',
		type: 'POST',
		success: function(data, status) {
			var data1 = JSON.parse(data);

			var role = data1[0]['role_id'];

			if(role == 1){
				var userEmail = document.getElementById("userEmail").value;
				var userPassword = document.getElementById("userPassword").value;
				$.ajax({
					url: 'saveMyDetailsIndividual',
					type: 'POST',
					data: {email:userEmail,u_pass:userPassword},
					success: function(data, status) {
						document.getElementById("loadingSec1").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';							
					}
				});

			}
			else{
				var namOfOrganizaion = document.getElementById("namOfOrganizaion").value;
			 	var typeOfOrganization = document.getElementById("typeOfOrganization").value;
			 	var natureOfBusinessActivity = document.getElementById("natureOfBusinessActivity").value;
			 	var businessAddress = document.getElementById("businessAddress").value;
			 	var contactPerson = document.getElementById("contactPerson").value;
			 	var designation = document.getElementById("designation").value;
			 	var userEmail = document.getElementById("userEmail").value;
			 	var userPassword = document.getElementById("userPassword").value;

			 	$.ajax({
					url: 'saveMyDetailsOrganization',
					type: 'POST',
					data: {email:userEmail,name_org:namOfOrganizaion,type_org:typeOfOrganization,nature_bactivity:natureOfBusinessActivity,b_adress:businessAddress,c_person:contactPerson,des:designation,u_pass:userPassword},
					success: function(data, status) {
						document.getElementById("loadingSec1").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';							
					}
				});
			}
			
		}
	});
}

function loadMyDetails(){

	$.ajax({
		url: 'loadMyDetails',
		type: 'POST',
		success: function(data, status) {
			var data1 = JSON.parse(data);


			var role = data1[0]['role_id'];

			if(role == 1){
				document.getElementById("appRegDetails").innerHTML = '<div class="eight columns mydetails_sec"> User Email: <input type="text" class="input-box1" id="userEmail" /> </div> <div class="eight columns mydetails_sec"> User Password: <input type="password" class="input-box1" id="userPassword" /> </div>';
				document.getElementById("userEmail").value = data1[0]['email'];
			}
			else{

				$.ajax({
					url: 'loadOrganizationDetails',
					type: 'POST',
					success: function(data, status) {
						var data2 = JSON.parse(data);
						document.getElementById("namOfOrganizaion").value = data2[0]['nam_of_organizaion'];			
						document.getElementById("typeOfOrganization").value = data2[0]['type_of_organization'];
						document.getElementById("natureOfBusinessActivity").value = data2[0]['nature_of_business_activity'];
						document.getElementById("businessAddress").value = data2[0]['business_address'];
						document.getElementById("contactPerson").value = data2[0]['contact_person'];
						document.getElementById("designation").value = data2[0]['designation'];
						document.getElementById("userEmail").value = data1[0]['email'];
					}
				});

			}
			
		}
	});
}

function processNow(){
	var valString = "";

	var check1 = document.getElementById("check1").checked;
	var check2 = document.getElementById("check2").checked;
	var check3 = document.getElementById("check3").checked;

	if(!check1 && !check2 && !check3){
		alert("Please check at least one checkbox!");
		return;
	}

	if(check1){
		valString = valString + "Register me with FIRS for Companies Income Tax#";
	}

	if(check2){
		valString = valString + "Register me with FIRS for Value Added Tax#";
	}

	if(check3){
		valString = valString + "Register me with LIRS or my State of business residence for personal income tax";
	}

	document.getElementById("hiddenValue").value = valString;

	$.ajax({
		type: 'POST',
		url: 'myDetailsProcess',
		data: $("#form_name").serialize(),
		success: function(result) {
			alert("Your message is sent!");
			window.location.reload();
		}
	});
}