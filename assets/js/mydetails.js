var user = getCurrentUser();

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function saveDetails(){
	document.getElementById("loadingSec1").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';
	
	if(!validateEmail(document.getElementById("userEmail").value)){
		alert("Please, fill in valid email address!");
		document.getElementById("loadingSec1").innerHTML = ""
		return;
	}else if(document.getElementById("userPassword").value.trim() == ''){
		alert("Password can't be empty");
		document.getElementById("loadingSec1").innerHTML = ""
		return;		
	}

	var score = scorePassword(document.getElementById("userPassword").value.trim());

	if(score <60) {
		alert("Password is weak. \nPassword should contain caps, letter, figures and special character");
		document.getElementById("loadingSec1").innerHTML = ""
		return;
	}

	if(user.get('type') == "Individual"){
		var userEmail = document.getElementById("userEmail").value;
		var userPassword = document.getElementById("userPassword").value;

		user.set("password", userPassword);
		user.set("visiblePassword", userPassword);

		user.save(null, {
			success: function(vat) {
				alert("Your registration details has been updated!");
				document.getElementById("loadingSec1").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';
			},
			error: function(vat, error) {
				alert(error.message);
				document.getElementById("loadingSec1").innerHTML = "";
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

		user.set("namOfOrganizaion", namOfOrganizaion);
		user.set("typeOfOrganization", typeOfOrganization);
		user.set("natureOfBusinessActivity", natureOfBusinessActivity);
		user.set("businessAddress", businessAddress);
		user.set("contactPerson", contactPerson);
		user.set("designation", designation);
		user.set("email", userEmail);
		user.set("password", userPassword);
		user.set("visiblePassword", userPassword);

		user.save(null, {
			success: function(vat) {
				alert("Your registration details has been updated!");
				document.getElementById("loadingSec1").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';

				Parse.User.logIn(userEmail.split("@")[0], userPassword, {
					success: function(user) {
						
					},
					error: function(user, error) {
						alert("Login failed, Please check your username & password!");
						window.location = "index.html";
					}
				});
			},
			error: function(vat, error) {
				alert(error.message);
				document.getElementById("loadingSec1").innerHTML = "";
			}
		});
	}
}

function loadMyDetails(){
	if(user.get('type') == "Individual"){
		document.getElementById("appRegDetails").innerHTML = '<div class="eight columns mydetails_sec"> User Email: <input type="text" class="input-box1" id="userEmail" /> </div> <div class="eight columns mydetails_sec"> User Password: <input type="password" class="input-box1" id="userPassword" /> </div>';
		
		var User = Parse.Object.extend("_User");
		var query = new Parse.Query(User);
		query.equalTo("objectId", user.id);
		query.first({
			success: function(resultsObj) {
				document.getElementById("userEmail").value = resultsObj.get('email');
				document.getElementById("userPassword").value = resultsObj.get('visiblePassword');
			},
			error: function(error) {
				// alert("Please check your internet connection!");
			}
		});
	}
	else{
		var User = Parse.Object.extend("_User");
		var query = new Parse.Query(User);
		query.equalTo("objectId", user.id);
		query.first({
			success: function(resultsObj) {
				document.getElementById("namOfOrganizaion").value = resultsObj.get('namOfOrganizaion');			
				document.getElementById("typeOfOrganization").value = resultsObj.get('typeOfOrganization');
				document.getElementById("natureOfBusinessActivity").value = resultsObj.get('natureOfBusinessActivity');
				document.getElementById("businessAddress").value = resultsObj.get('businessAddress');
				document.getElementById("contactPerson").value = resultsObj.get('contactPerson');
				document.getElementById("designation").value = resultsObj.get('designation');
				document.getElementById("userEmail").value = resultsObj.get('email');
				document.getElementById("userPassword").value = resultsObj.get('visiblePassword');
			},
			error: function(error) {
				// alert("Please check your internet connection!");
			}
		});
	}
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
	document.getElementById("userEmail1").value = getCurrentUser().get('email');

	$.ajax({
		type: 'POST',
		url: 'archieveScripts/myDetails.php',
		data: $("#form_name").serialize(),
		success: function(result) {
			alert("Your message is sent!");
			window.location = "mydetails.html";
		}
	});
}