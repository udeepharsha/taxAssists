var start;
var start_num = 0;
var proceed = [];
var proceedNumber = [];
var base_url = 'http://localhost/Taxassists/';

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}

function checkIfContinue(){
    proceed.push("true");
    proceedNumber.push(11);
    start_num++;

    var myVar;

    $("#dialog-confirm"+start_num).dialog({
        resizable: false,
        height: 200,
        modal: true,
        buttons: {
            "Yes": function() {
                $( this ).dialog("close");
                proceed[start_num-1] = "false";
                document.getElementById("dialog-confirm"+start_num).style.display = "none";
                clearInterval(myVar);
                window.setTimeout('checkIfContinue()', 10*60*1000);
            },
            "Logout": function() {
                Parse.User.logOut();
                window.location = "index.html";
            }
        }
    });

    myVar = setInterval(function(){
        if(proceed[start_num-1] == "true"){
            proceedNumber[start_num-1] = proceedNumber[start_num-1] - 1;

            document.getElementById("dialog-confirm"+start_num).innerHTML = '<span class="ui-icon ui-icon-alert" style="float:left; margin:5px 7px 20px 0;"></span> Do you want to continue? Logging out in '+proceedNumber[start_num-1]+' seconds!';

            if(proceedNumber[start_num-1] == 0){
                Parse.User.logOut();
                window.location = "index.html";
            }
        }
    }, 1000);
}

function logOut(){
    Parse.User.logOut();
    window.location = "index.html";
}

function logOutIndex(){
    var logouturl = base_url+'User/logout';
    $.ajax({
        url: logouturl,
        type: 'POST',
        success: function(data, status) {
            window.location.href = base_url;
        }
    });
}

function isLoggedIn(){
    if(currentUser){
        return true;
    }
    else{
        return false;
    }
}

function getCurrentUser(){
    var currentUser = Parse.User.current();

    if(currentUser){
        return currentUser;
    }
    else{
        return "No currentUser";
    }
}

function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
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
    
    if (score > 80)
        return "strong";
    if (score > 60)
        return "good";
    if (score >= 30)
        return "weak";

    return "";
}

function validateNumeric(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 46 && charCode > 31 
        && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

//Removing mise undefined error
jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();