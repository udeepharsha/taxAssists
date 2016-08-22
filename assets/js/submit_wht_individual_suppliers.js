var user = getCurrentUser();
var suppliersOfService = [];
var suppliersOfGoods = [];
var serviceRowCount = 0;
var goodsRowCount = 0;
var isArchived = false;
var archivedDocument = "";

function saveDetails(){
	var monthCovered = document.getElementById("monthCovered").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var stateTaxFillingOffice = document.getElementById("stateTaxFillingOffice").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

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
					alert("Your wht calculation form is saved! If you think this is final version for month, please archive it. Only archived reports can be spooled later!");
					document.getElementById("loadingSec").innerHTML = '<div style="width:100%; height:6px;"></div> Successfully Saved!';
					
					exportDataSave();
				},
				error: function(wht, error) {
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

function saveAfetrArchive(){
	var monthCovered = document.getElementById("monthCovered").value;
	var year = document.getElementById("year").value;
	var taxNo = document.getElementById("taxNo").value;
	var firsTaxOffice = document.getElementById("firsTaxOffice").value;
	var stateTaxFillingOffice = document.getElementById("stateTaxFillingOffice").value;
	var taxStationCode = document.getElementById("taxStationCode").value;

	document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

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
					//Success
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

	document.getElementById("loadingSec").innerHTML = '<img src="images/loading.gif" style="width:37px; height:37px;">';

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
				success: function(vatArchives) {
					saveAfetrArchive();
					alert("Your wht calculation form is archived!");
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

function loadWhtDetails(){
	var WHTIndividual = Parse.Object.extend("WHTIndividual");
	var query = new Parse.Query(WHTIndividual);
	query.equalTo("userId", { "__type": "Pointer", "className": "_User", "objectId": user.id });
	query.first({
		success: function(resultsObj) {
			document.getElementById("monthCovered").value = resultsObj.get('monthCovered');
			document.getElementById("year").value = resultsObj.get('year');
			document.getElementById("taxNo").value = resultsObj.get('taxNo');
			document.getElementById("firsTaxOffice").value = resultsObj.get('firsTaxOffice');
			document.getElementById("stateTaxFillingOffice").value = resultsObj.get('stateTaxFillingOffice');
			document.getElementById("taxStationCode").value = resultsObj.get('taxStationCode');

			var inSuppliersOfService = resultsObj.get('suppliersOfService');
			var inSuppliersOfGoods = resultsObj.get('suppliersOfGoods');

			for (var i = 0; i < inSuppliersOfService.length; i++) {
				var obj = inSuppliersOfService[i];

				var txt1 = obj['supplierName'];
				var txt2 = obj['supplierAddress'];
				var txt3 = obj['supplierTIN'];
				var txt4 = obj['typeOfTransaction'];
				var txt5 = obj['amount'];
				var hiddenValue = obj['hiddenValue'];

				txt5 = parseInt(txt5).toFixed(2);

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
			}

			for (var i = 0; i < inSuppliersOfGoods.length; i++) {
				var obj = inSuppliersOfGoods[i];

				var txt1g = obj['supplierName'];
				var txt2g = obj['supplierAddress'];
				var txt3g = obj['supplierTIN'];
				var txt4g = obj['typeOfTransaction'];
				var txt5g = obj['amount'];
				var hiddenValue = obj['hiddenValue'];

				txt5g = parseInt(txt5g).toFixed(2);

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
			}
		},
		error: function(error) {
			// alert("Please check your internet connection!");
		}
	});
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
		return amount*0.05;
	}
	else if(type == "Construction"){
		return amount*0.05;
	}
	else if(type == "Commissions"){
		return amount*0.05;
	}
	else if(type == "Professional Service"){
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
	else if(type == "Director's fees"){
		return amount*0.1;
	}
	else if(type == "Contract for supply of other services"){
		return amount*0.05;
	}
	else if(type == "Agency Arrangements"){
		return amount*0.05;
	}
	else if(type == "Others- I cannot determine"){
		return amount*0.05;
	}
	else if(type == "Supply of goods"){
		return amount*0.05;
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
		alert("Please enter supplier TIN!");
		return false;
	}

	if(txt5 == ""){
		alert("Please enter amount!");
		return false;
	}

	if(!isInt(txt5)){
		alert("Please enter integer amount!");
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


	var selectDiv = '<select id="typeOfTransaction'+id+'"> <option value="Rent">Rent</option> <option value="Interest">Interest</option> <option value="Dividend">Dividend</option> <option value="Royalty">Royalty</option> <option value="Construction">Construction</option> <option value="Commissions">Commissions</option> <option value="Professional Service">Professional Service</option> <option value="Consultancy Service">Consultancy Service</option> <option value="Technical Service">Technical Service</option> <option value="Management Service">Management Service</option> <option value="Director\'s fees">Director\'s fees</option> <option value="Contract for supply of other services">Contract for supply of other services</option> <option value="Agency Arrangements">Agency Arrangements</option> <option value="Others- I cannot determine">Others- I cannot determine</option> </select>';

	document.getElementById("serviceRow"+id).innerHTML = '<div class="rowTD"><input type="text" id="supplierName'+id+'" value='+supplierName+' /></div> <div class="rowTD"><input type="text" id="supplierAddress'+id+'" value='+supplierAddress+' /></div> <div class="rowTD"><input type="text" id="supplierTIN'+id+'" value='+supplierTIN+' /></div> <div class="rowTD"> '+selectDiv+' </div> <div class="rowTD"><input type="text" id="amount'+id+'" value='+amount+' /></div> <div class="rowTD"> <button class="btn1" onclick="saveEditedRowService('+id+', '+hiddenValue+')">Save</button></div>';

	document.getElementById("typeOfTransaction"+id).value = typeOfTransaction;
}

function saveEditedRowService(id, hiddenValue){
	var supplierName = document.getElementById("supplierName"+id).value;
	var supplierAddress = document.getElementById("supplierAddress"+id).value;
	var supplierTIN = document.getElementById("supplierTIN"+id).value;
	var typeOfTransaction = document.getElementById("typeOfTransaction"+id).value;
	var amount = document.getElementById("amount"+id).value;

	if(!isInt(amount)){
		alert("Please enter integer amount!");
		return false;
	}


	var index = functiontofindIndexByKeyValue(suppliersOfService, "hiddenValue", hiddenValue);

	suppliersOfService[index]['supplierName'] = supplierName;
	suppliersOfService[index]['supplierAddress'] = supplierAddress;
	suppliersOfService[index]['supplierTIN'] = supplierTIN;
	suppliersOfService[index]['typeOfTransaction'] = typeOfTransaction;
	suppliersOfService[index]['amount'] = amount;
	suppliersOfService[index]['whtDeduction'] = getWHTDeduction(amount, typeOfTransaction).toFixed(2);

	document.getElementById("serviceRow"+id).innerHTML = '<div class="rowTD">'+supplierName+'</div> <div class="rowTD">'+supplierAddress+'</div> <div class="rowTD">'+supplierTIN+'</div> <div class="rowTD"> '+typeOfTransaction+' </div> <div class="rowTD">'+parseInt(amount).toFixed(2)+'</div> <div class="rowTD"> <button class="btn1" onclick="removeServiceItem('+id+', '+hiddenValue+')">Delete</button> &nbsp;&nbsp; <button class="btn1" onclick="editServiceItem('+id+', '+hiddenValue+')">Edit</button> </div>';
}

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
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
		alert("Please enter supplier TIN!");
		return false;
	}

	if(txt5g == ""){
		alert("Please enter amount!");
		return false;
	}

	if(!isInt(txt5g)){
		alert("Please enter integer amount!");
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

	if(!isInt(amountg)){
		alert("Please enter integer amount!");
		return false;
	}

	var index = functiontofindIndexByKeyValue(suppliersOfGoods, "hiddenValue", hiddenValue);

	suppliersOfGoods[index]['supplierName'] = supplierNameg;
	suppliersOfGoods[index]['supplierAddress'] = supplierAddressg;
	suppliersOfGoods[index]['supplierTIN'] = supplierTINg;
	suppliersOfGoods[index]['typeOfTransaction'] = typeOfTransactiong;
	suppliersOfGoods[index]['amount'] = amountg;
	suppliersOfGoods[index]['whtDeduction'] = getWHTDeduction(amountg, typeOfTransactiong).toFixed(2);

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

function exportDataEmail(){
	document.getElementById("userEmail").value = user.get('email');
	document.getElementById("exportEmailBtn").disabled = true;

	//Services
	var tableDiv1 = '<table border="1"> <tr> <th>Individual Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

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
	var tableDiv2 = '<table border="1"> <tr> <th>Individual Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

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
	var tableDiv1 = '<table border="1"> <tr> <th>Individual Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

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

               console.log(tableDiv1);

	//Goods
	var tableDiv2 = '<table border="1"> <tr> <th>Individual Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

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

function exportDataSave(){
    //Services
	var tableDiv1 = '<table border="1"> <tr> <th>Individual Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

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

              console.log(tableDiv1);

	//Goods
	var tableDiv2 = '<table border="1"> <tr> <th>Individual Supplier Name</th> <th>Supplier Address</th> <th>Supplier Tin</th> <th>Type of transaction</th> <th>Amount (Excluding VAT on invoice NGN)</th> <th>WHT Deducted (NGN)</th></tr>';

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

	if(suppliersOfGoods.length == 0){
		document.getElementById("table2").value = "";
	}

	$.ajax({
	    type: 'POST',
	    url: 'archieveScripts/wht/saveHmtlSave.php',
	    data: $("#form_name").serialize(),
	    success: function(result) {
	    	var res = result.split("#");
	    	var linkId = res[res.length - 1];

	        var win = window.open("files/"+linkId, '_blank');
			win.focus();
	    }
	});
}