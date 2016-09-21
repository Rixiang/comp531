window.onload = function(){

    window.addEventListener("load", addTimeStamp);

    function addTimeStamp(){
        // add timestamp
        var timestamp = new Date().getTime();
        document.getElementById("timestamp").value = timestamp;
    }

    var logIn = document.getElementById("logIn");
    var signOn = document.getElementById("signOn");
    var signOnForm = document.getElementById("signOnForm");


    function validateSignOn(){
        var nameValue = document.forms["accountRegisteration"]["accountName"].value;
        var displayName = document.forms["accountRegisteration"]["displayName"].value;
        var emailAddr = document.forms["accountRegisteration"]["emailAddr"].value;
        var phoneNumber = document.forms["accountRegisteration"]["phoneNumber"].value;
        var dateOfBirth = document.forms["accountRegisteration"]["dateOfBirth"].value;
        var zipCode = document.forms["accountRegisteration"]["zipCode"].value;
        var password = document.forms["accountRegisteration"]["password"].value;
        var passwordConf = document.forms["accountRegisteration"]["passwordConf"].value;

        // validate that two passwords are equal
        if (password != passwordConf){
            alert("Two passwords are not the same");
            return false;
        }

        // validate all required fields are inputted
        if (nameValue == null || nameValue == "") {
            alert("Account name is required");
            return false;
        }if (emailAddr == null || emailAddr == "") {
            alert("E-mail address is required");
            return false;
        }if (phoneNumber == null || phoneNumber == "") {
            alert("Phone number is required");
            return false;
        }if (dateOfBirth == null || dateOfBirth == "") {
            alert("Date of birth is required");
            return false;
        }if (zipCode == null || zipCode == "" ) {
            alert("Zip code is required");
            return false;
        }if (password == null || password == "" ) {
            alert("Password is required");
            return false;
        }if (passwordConf == null || passwordConf == "") {
            alert("Confirmation of password is required");
            return false;
        }else{
            // nevigate to the main page and set the get request
            signOnForm.action = "main.html";
            signOnForm.method = "get";
            return true;
        }
    }

    function validateLogIn(){
        var inputAccount = document.getElementById("inputAccount").value;
        var inputPassword = document.getElementById("inputPassword").value;

        // validate all required fields are inputted
        if (inputAccount == null || inputAccount == "") {
            alert("Account name is required");
            return false;
        }if (inputPassword == null || inputPassword == "") {
            alert("Password is required");
            return false;
        }else{
            location = "main.html";
            return true;
        }
    }

    signOn.addEventListener("click", validateSignOn, false);
    logIn.addEventListener("click", validateLogIn, false);
    
}