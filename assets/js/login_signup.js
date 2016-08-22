var emptyArray = [];

$(document).ready(function() {

	$('#login_form').on('submit', function(event){
		event.preventDefault();

		var email = $("#loginEmail").val();
		var password = $("#upass").val();

		if(loginEmail == "" | loginEmail == null){
			alert("Email is missing!");
			return false;
		}

		if(password == "" || password == null){
			alert("Password is missing!");
			return false;
		}

		document.getElementById("loginButton").innerHTML = "Please Wait..";

		$.ajax({
			url: 'user/login',
			type: 'POST',
			data: {email:email,password:password},
			success: function(data, status) {
				if( (data != 'not_email_verified_user') && (data != 'Wrong')  ){
					window.location.href = 'home';
				}
				else if(data == 'not_email_verified_user'){
					alert("Please verify your email address before you login!");
					window.location.reload();
				}
				else if(data == 'Wrong'){
					alert("Login failed, Please check your username & password!");
					window.location.reload();
				}
				else{
					alert("Error occured!");
					window.location.reload();
				}
			}
		});

		event.preventDefault();
	});

	$('#register_form').on('submit', function(event){ 
		event.preventDefault();
		var formData = new FormData(this);

		var individualChecked = document.getElementById("individual").checked;

		if(individualChecked){
			var emailAddressIndividual = document.getElementById("emailAddressIndividual").value;
			var username = emailAddressIndividual.split("@")[0];
			var password = document.getElementById("password").value;
			var confirm_password = document.getElementById("confirm_password").value;

			if(emailAddressIndividual == "" | emailAddressIndividual == null){
				alert("Email address is missing!");
				return false;
			}

			if(password == "" || password == null){
				alert("Password is missing!");
				return false;
			}

			if(confirm_password == "" || confirm_password == null){
				alert("Confirm password is missing!");
				return false;
			}

			if(password != confirm_password){
				alert("Passwords do not match!");
				return false;
			}

			var score = scorePassword(password);

			if(score < 60) {
				alert("Password is weak. \nPassword should contain caps, letter, figures and special character.");
				return false;
			}

			var agreeToTerms = document.getElementById("agreeToTerms").checked;

			if(agreeToTerms){
				document.getElementById("signupButton").innerHTML = "Please Wait..";
				$.ajax({
					url: 'user/registerIndividuals',
					type: 'POST',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					success: function(data, status) {
						alert(data);
					}
				});
			}
			else{
				alert("You must agree to our terms & conditions before you proceed!");
			}
		}

		else{
			var namOfOrganizaion = document.getElementById("namOfOrganizaion").value;
			var typeOfOrganization = document.getElementById("typeOfOrganization").value;
			var natureOfBusinessActivity = document.getElementById("natureOfBusinessActivity").value;
			var businessAddress = document.getElementById("businessAddress").value;
			var contactPerson = document.getElementById("contactPerson").value;
			var designation = document.getElementById("designation").value;
			var emailAddress = document.getElementById("emailAddress").value;
			var username = emailAddress.split("@")[0];
			var loginPassword = document.getElementById("loginPassword").value;

			if(namOfOrganizaion == "" | namOfOrganizaion == null){
				alert("Enter name of the organization!");
				return false;
			}

			if(typeOfOrganization == "" | typeOfOrganization == null){
				alert("Pick type of organization!");
				return false;
			}

			if(natureOfBusinessActivity == "" | natureOfBusinessActivity == null){
				alert("Enter nature of business activity!");
				return false;
			}

			if(businessAddress == "" | businessAddress == null){
				alert("Enter business address!");
				return false;
			}

			if(contactPerson == "" | contactPerson == null){
				alert("Enter contact person!");
				return false;
			}

			if(designation == "" | designation == null){
				alert("Enter designation!");
				return false;
			}

			if(emailAddress == "" | emailAddress == null){
				alert("Email address is missing!");
				return false;
			}

			if(loginPassword == "" || loginPassword == null){
				alert("Password is weak. \nPassword should contain caps, letter, figures and special character.");
				return false;
			}

			var agreeToTerms = document.getElementById("agreeToTerms").checked;

			var score = scorePassword(loginPassword);

			if(score <60) {
				alert("Password is weak. \nPassword should contain caps, letter, figures and special character");
				return false;
			}


			if(agreeToTerms){
				document.getElementById("signupButton").innerHTML = "Please Wait..";
				$.ajax({
					url: 'user/registerOrganizations',
					type: 'POST',
					data: formData,
					cache: false,
					contentType: false,
					processData: false,
					success: function(data, status) {
						alert(data);
					}
				});
			}
			else{
				alert("You must agree to our terms & conditions before you proceed!");
			}
		}
	});

});

function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 9.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

function checkPassStrength(pass) {
    var score = scorePassword(pass);

    if(score <60) return "Password is weak. \nPassword should contain caps, letter, figures and special character";

    if (score > 80)
        return "strong";
    if (score > 60)
        return "good";
    if (score >= 30)
        return "weak";

    return "very weak";
}

function loginSuccess(){
	var loginEmail = document.getElementById("loginEmail").value;
	var password = document.getElementById("upass").value;

	console.log(loginEmail + "  " + password);

	if(loginEmail == "" | loginEmail == null){
		alert("Email is missing!");
		return false;
	}

	if(password == "" || password == null){
		alert("Password is missing!");
		return false;
	}

	var username = loginEmail.split("@")[0];

	document.getElementById("loginButton").innerHTML = "Please Wait..";

	Parse.User.logIn(username, password, {
		success: function(user) {
			if(user.get("emailVerified")){
				// alert("Login success -- "+user.get('username'));
				window.location = "vat.html";
			}
			else{
				alert("Please verify your email address before you login!");
				Parse.User.logOut();
				window.location = "index.html";
			}
		},
		error: function(user, error) {
			alert("Login failed, Please check your username & password!");
			window.location = "index.html";
		}
	});
}

function createEmptyVat(user){
	var VAT = Parse.Object.extend("VAT");
	var vat = new VAT();

	vat.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	vat.set("monthUnderReview", "");
	vat.set("yearUnderReview", "");
	vat.set("taxNo", "");
	vat.set("vatNo", "");
	vat.set("firsTaxOffice", "");
	vat.set("outputSalesIncome", "");
	vat.set("exemptedZero", "");
	vat.set("totalSuppliesVat", "");
	vat.set("outputVat", "");
	vat.set("vatOnLocalSupplies", "");
	vat.set("vatOnImportedGoods", "");
	vat.set("vatOnSubcontracted", "");
	vat.set("totalInputTaxClaimable", "");
	vat.set("excessInputVat", "");
	vat.set("vatPayableForMonth", "");
	vat.set("authorizedSignatory", "");
	vat.set("designation", "");
	vat.set("signature", "");
	vat.set("companyStampAndDate", "");

	var acl = new Parse.ACL();
	acl.setPublicReadAccess(false);
	acl.setPublicWriteAccess(false);
	acl.setReadAccess(user, true);
	acl.setWriteAccess(user, true);
	vat.setACL(acl);

	vat.save(null, {
		success: function(vat) {
			var WHT = Parse.Object.extend("WHT");
			var wht = new WHT();

			wht.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
			wht.set("monthCovered", "");
			wht.set("year", "");
			wht.set("taxNo", "");
			wht.set("firsTaxOffice", "");
			wht.set("stateTaxFillingOffice", "");
			wht.set("taxStationCode", "");
			wht.set("suppliersOfService", emptyArray);
			wht.set("suppliersOfGoods", emptyArray);

			var acl = new Parse.ACL();
			acl.setPublicReadAccess(false);
			acl.setPublicWriteAccess(false);
			acl.setReadAccess(user, true);
			acl.setWriteAccess(user, true);
			wht.setACL(acl);

			wht.save(null, {
				success: function(wht) {

					var WHTIndividual = Parse.Object.extend("WHTIndividual");
					var whtIndividual = new WHTIndividual();

					whtIndividual.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
					whtIndividual.set("monthCovered", "");
					whtIndividual.set("year", "");
					whtIndividual.set("taxNo", "");
					whtIndividual.set("firsTaxOffice", "");
					whtIndividual.set("stateTaxFillingOffice", "");
					whtIndividual.set("taxStationCode", "");
					whtIndividual.set("suppliersOfService", emptyArray);
					whtIndividual.set("suppliersOfGoods", emptyArray);

					var acl = new Parse.ACL();
					acl.setPublicReadAccess(false);
					acl.setPublicWriteAccess(false);
					acl.setReadAccess(user, true);
					acl.setWriteAccess(user, true);
					whtIndividual.setACL(acl);

					whtIndividual.save(null, {
						success: function(wht) {
							updateBusinessInformation(user);
						},
						error: function(wht, error) {
							alert(error.message);
						}
					});
				},
				error: function(wht, error) {
					alert(error.message);
				}
			});
		},
		error: function(vat, error) {
			alert(error.message);
		}
	});
}

function resetPassword(){
	var email_address = document.getElementById("forgotemail").value;

   	if(email_address == "" || email_address == null){
   		alert("Please enter email address!");
   	}
   	else{
   		Parse.User.requestPasswordReset(email_address, {
	      	success: function(user) {
	      		alert("Please check your email inbox to reset password!");

	      		setTimeout(function(){
          			window.location = "index.html";
          		}, 6000);
	      	},
	      	error: function(user, error) {
	      		alert("Check your email address again!");
	      	}
		});
   	}
}

function updateBusinessInformation(user){
	var BusinessInformation = Parse.Object.extend("BusinessInformation");
	var businessInformation = new BusinessInformation();

	businessInformation.set("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	businessInformation.set("organizationName", "");
	businessInformation.set("typeOfOrganization", emptyArray);
	businessInformation.set("registrationNumber", "");
	businessInformation.set("nature", "");
	businessInformation.set("descriptionOfGoodsOrServices", "");
	businessInformation.set("businessAddress", "");
	businessInformation.set("alternateAddress", "");
	businessInformation.set("dateOfIncorporation", "");
	businessInformation.set("dateOfCommencement", "");
	businessInformation.set("accountingYearEnd", "");
	businessInformation.set("contactPerson", "");
	businessInformation.set("designation", "");
	businessInformation.set("email", "");
	businessInformation.set("phone", "");
	businessInformation.set("alternatePhone", "");

	var acl = new Parse.ACL();
	acl.setPublicReadAccess(false);
	acl.setPublicWriteAccess(false);
	acl.setReadAccess(user, true);
	acl.setWriteAccess(user, true);
	businessInformation.setACL(acl);

	businessInformation.save(null, {
		success: function(vat) {
			updateTaxInformation(user);
		},
		error: function(vat, error) {
			alert(error.message);
		}
	});
}

function updateTaxInformation(user){
	var TaxInformation = Parse.Object.extend("TaxInformation");
	var taxInformation = new TaxInformation();

	taxInformation.set("fedaralTaxIdentificationNumber", "");
	taxInformation.set("lagosTaxIdentificationNumber", "");
	taxInformation.set("jointTaxBoard", "");
	taxInformation.set("valueAddedTaxRegNumber", "");
	taxInformation.set("firsTaxStation", "");
	taxInformation.set("lirsTaxStation", "");
	taxInformation.set("lirsTaxStationCode", "");
	taxInformation.set("requestAssistance", emptyArray);

	var acl = new Parse.ACL();
	acl.setPublicReadAccess(false);
	acl.setPublicWriteAccess(false);
	acl.setReadAccess(user, true);
	acl.setWriteAccess(user, true);
	taxInformation.setACL(acl);

	taxInformation.save(null, {
		success: function(vat) {
			alert("Registered successfully! Please check your inbox to verify your email!");
			Parse.User.logOut();
			window.location = "index.html";
		},
		error: function(vat, error) {
			alert(error.message);
		}
	});
}

function logOut(){
	window.location.href = 'home/logout';
}

