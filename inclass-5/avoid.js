window.onload = function(){
	var width = window.innerWidth;
	var height = window.innerHeight;
	var button = document.getElementById("click");
	button.style.width = "80px";
	button.style.height = "20px";
	button.style.position = "absolute";
	var cong = document.getElementById("cong");
	cong.style= "display: none";
	var table = document.getElementById("table");
	table.style = "border: 1px solid Black; background-color: Red; text-align: center";
	var CLICK_ME = "Click Me";
	var PLAY_AGAIN = "Play Again";

	var runAway = function(){
		if (event.shiftKey){		// when the SHIFT key is pressed, the button will stay static
			return;
		}else{
			if (button.value === PLAY_AGAIN){
				return;
			}else{					// when the game starts, the button will run away when mouse is close
				var newWidth = Math.floor(Math.random() * (width - 80)) + "px";
				var newHeight = Math.floor(Math.random() * (height - 20)) + "px";
				button.style.left = newWidth;
				button.style.top = newHeight;
			}
		}
	}
	var end = function(){
		if (button.value === CLICK_ME){
			button.value = PLAY_AGAIN;
			cong.style= "display: initial";	// display the congratualion information
		}else{
			button.value = CLICK_ME;
			cong.style= "display: none";
			runAway();						// imidiatelly make the button run away to another location, so as to maintain the game's rule
		}		
	}
	button.addEventListener("mouseover", runAway, true);
	button.addEventListener("click", end, false);
}