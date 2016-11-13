import { resource } from './serverAction'

const validateSignOn = () => {
	var signOnForm = document.getElementById("signOnForm");
	var nameValue = document.forms["accountRegisteration"]["accountName"].value;
	var displayName = document.forms["accountRegisteration"]["displayName"].value;
	var emailAddr = document.forms["accountRegisteration"]["emailAddr"].value;
	var phoneNumber = document.forms["accountRegisteration"]["phoneNumber"].value;
	var dateOfBirth = document.forms["accountRegisteration"]["dateOfBirth"].value;
	var zipCode = document.forms["accountRegisteration"]["zipCode"].value;
	var password = document.forms["accountRegisteration"]["password"].value;
	var passwordConf = document.forms["accountRegisteration"]["passwordConf"].value;

	if (nameValue == null || nameValue == "") {
	    return false;
	}else if (emailAddr == null || emailAddr == "") {
	    return false;
	}else if (phoneNumber == null || phoneNumber == "") {
	    return false;
	}else if (dateOfBirth == null || dateOfBirth == "") {
	    return false;
	}else if (zipCode == null || zipCode == "") {
	    return false;
	}else if (password == null || password == "") {
	    return false;
	}else if (passwordConf == null || passwordConf == "") {
	    return false;
	}else{
	    return true;
	}
}

const validatePassword = () => {
	var password = document.forms["accountRegisteration"]["password"].value;
	var passwordConf = document.forms["accountRegisteration"]["passwordConf"].value;

	if (password != passwordConf){
	    return false;
	}else{
	    return true;
	}
}

export const signOnFunc = (dispatch, event) => {
	event.preventDefault(); // prevent automatically redirect to the landing page immediately after the form is submitted
	if (validateSignOn() == false){
		return dispatch({ type: 'errorRegister' });
	}else if (validatePassword() == false){
		return dispatch({ type: 'errorPwdRegister' });
	}else {
		document.getElementById("signOnForm").method = "get";

		return registerAccount(dispatch)
		.then( _ => dispatch({ type: 'normalRegister' }))
		.catch( _ => dispatch({ type: 'errorConnectionRegister' }));
	}
}

export const registerAccount = dispatch => {
	var nameValue = document.forms["accountRegisteration"]["accountName"].value;
	var emailAddr = document.forms["accountRegisteration"]["emailAddr"].value;
	var dateOfBirth = document.forms["accountRegisteration"]["dateOfBirth"].value;
	var zipCode = document.forms["accountRegisteration"]["zipCode"].value;
	var password = document.forms["accountRegisteration"]["password"].value;
	const payload = { username: nameValue, email: emailAddr, dob: dateOfBirth, zipcode: zipCode, password: password};
	console.log(payload);
    return resource('POST', 'register', payload).then((r) => {
        dispatch({ type: 'accountRegistered', username: r.username, result: r.result});
    });
}