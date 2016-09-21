window.onload = function(){
	var viewProfile = document.getElementById("viewProfile");
	var jump2Profile = function(){
		location = "profile.html";
	}
	viewProfile.addEventListener("click", jump2Profile, false);

	var logOut = document.getElementById("logOut");
	var jump2Landing = function(){
		location = "index.html";
	}
	logOut.addEventListener("click", jump2Landing, false);


	var btnUploadStatus = document.getElementById("btnUploadStatus");
	var updateStatus = function(){
		var txfUploadStatus = document.getElementById("txfUploadStatus");
		var currentStatus = document.getElementById("currentStatus");
		currentStatus.innerHTML = txfUploadStatus.value;
		txfUploadStatus.value = null;
	}
	btnUploadStatus.addEventListener("click", updateStatus, false);
}