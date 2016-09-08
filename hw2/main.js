window.onload = function(){
	var viewProfile = document.getElementById("viewProfile");
	var jump2Profile = function(){
		location = "profile.html";
	}
	viewProfile.addEventListener("click", jump2Profile, false);

	var images = [document.getElementById("december25"), 
				  document.getElementById("december18"), 
				  document.getElementById("october1"), 
				  document.getElementById("september25"),
				  document.getElementById("july2"),
				  document.getElementById("june25")];


	var imageSources = ["http://petapixel.com/assets/uploads/2016/06/Yellowstone-National-Park-5-800x473.jpg", 
						"http://www.yellowstonepark.com/wp-content/uploads/Grand-Prismatic-Spring_680x392.jpg", 
						"http://d1njyp8tsu122i.cloudfront.net/wp-content/uploads/yellowstone-teton-snake-river-sunset-courtesy.jpg", 
						"http://nationalparktourz.com/wp-content/uploads/yellowstone-bison.jpg", 
						"http://d1njyp8tsu122i.cloudfront.net/wp-content/uploads/yellowstone-visit-utah-moab.jpg", 
						"http://www.visityellowstonepark.com/img/visityellowstonepark-hp-explorer-cabins-at-yellowstone-spring-summer.jpg"];

	// index of the photo going to be shown
	var idxPhoto = [0, 1, 2, 3, 4, 5];

	// periodically cycle through different images, with time interval a random number of seconds between 1 and 5 inclusive
	var interval = [setInterval(function(){update(0)}, randomNumber()), 
					setInterval(function(){update(1)}, randomNumber()), 
					setInterval(function(){update(2)}, randomNumber()), 
					setInterval(function(){update(3)}, randomNumber()), 
					setInterval(function(){update(4)}, randomNumber()), 
					setInterval(function(){update(5)}, randomNumber())];

	// return a random period of time as the interval for each image
	function randomNumber(){
		return Math.floor((Math.random() * 5) + 1) * 1000;
	}

	// change the image by changing the src
	function update(index){
		images[index].src = imageSources[idxPhoto[index]];
		idxPhoto[index]++;
		if (idxPhoto[index] >= 6){
			idxPhoto[index] = idxPhoto[index] - 6;
		}
	}

	
	var STOP = "Stop";
	var START = "Start";

	var btnStop = [document.getElementById("stop1"), 
				   document.getElementById("stop2"),
				   document.getElementById("stop3"),
				   document.getElementById("stop4"),
				   document.getElementById("stop5"), 
				   document.getElementById("stop6")];

	
	// for each button, define their onclick() function
	var defineOnclick = function(item, index){
		btnStop[index].onclick = function() {
			if (btnStop[index].value == STOP) {
				pause(index);
			} else {
				resume(index);
			}
		}
	}

	// Iteritate all buttons and define their onclick behavior
	btnStop.forEach(defineOnclick);

	function pause(index){
		btnStop[index].value = START;
		clearInterval(interval[index]);
	}

	function resume(index){
		btnStop[index].value = STOP;
		interval[index] = setInterval(function(){update(index)}, randomNumber());
	}
	
}