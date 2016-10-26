
var changeAlert = function(item, index){
	var entryValues = [document.getElementById("displayNameValue"), 
				   document.getElementById("emailAddr"), 
				   document.getElementById("phoneNumber"), 
				   document.getElementById("zipCodeValue"), 
				   document.getElementById("pwdValue"), 
				   document.getElementById("pwdConfValue")];

	if (index <= 3){
		if (entryValues[index].value != null && entryValues[index].value != ""){ 	// for normal entries
			if (item.innerHTML != entryValues[index].value){
			item.innerHTML = entryValues[index].value;
			entryValues[index].value = "";
			} else{
				entryValues[index].value = "";
			}
		}
	}else if (index == 5){	// this part is for passwords, and note that alert once is enough			
		if (entryValues[4].value != null && entryValues[4].value != "" && (entryValues[5].value == null || entryValues[5].value == "")){
		}else if (entryValues[5].value != null && entryValues[5].value != "" && (entryValues[4].value == null || entryValues[4].value == "")){
		}else if ((entryValues[4].value == null || entryValues[4].value == "") && (entryValues[5].value == null || entryValues[5].value == "")){
			// do nothing
		}else{
			if (entryValues[4].value != entryValues[5].value){
					entryValues[5].value = "";
			}else{
				item.innerHTML = entryValues[index].value;
				entryValues[index - 1].value = "";
				entryValues[index].value = "";
			}
		}
	}
}


const validate = () => {
	var pattern; 
	var entryValues = [document.getElementById("displayNameValue"), 
				   document.getElementById("emailAddr"), 
				   document.getElementById("phoneNumber"), 
				   document.getElementById("zipCodeValue"), 
				   document.getElementById("pwdValue"), 
				   document.getElementById("pwdConfValue")];
				   
	var entries = [document.getElementById("displayName"), 
					   document.getElementById("email"), 
					   document.getElementById("phoneNum"), 
					   document.getElementById("zipCode"), 
					   document.getElementById("pwd"), 
					   document.getElementById("pwdConf")];

	var emailIsValid = true;
	var phoneIsValid = true;
	var zipCodeIsValid = true;
	if (entryValues[1].value != null && entryValues[1].value != ""){
		pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$");
		emailIsValid = pattern.test(entryValues[1].value);
	} 
	if (entryValues[2].value != null && entryValues[2].value != ""){
		pattern = new RegExp("^[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$");
		phoneIsValid = pattern.test(entryValues[2].value);	
	} 
	if (entryValues[3].value != null && entryValues[3].value != ""){
		pattern = new RegExp("^[0-9][0-9][0-9][0-9][0-9]$");
		zipCodeIsValid = pattern.test(entryValues[3].value);
	}
	if (entryValues[4].value != entryValues[5].value ){
		pattern = new RegExp("^[0-9][0-9][0-9][0-9][0-9]$");
		return false;
	}
	if (emailIsValid && phoneIsValid && zipCodeIsValid){
		entries.forEach(changeAlert);
		return true;
	}else{
		return false;
	}
}

export const updateProfile = (dispatch, event) => {
	event.preventDefault(); // prevent automatically redirect to the landing page immediately after the form is submitted
	if (validate()){
		return dispatch({ type: 'normalUpdate' });
	}else{
		return dispatch({ type: 'errorUpdate' });
	}
}