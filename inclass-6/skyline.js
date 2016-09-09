
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle = grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	var buildings = []
	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		var buildingColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
		c.fillStyle = buildingColor
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		c.fillStyle ="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				if (Math.floor(Math.random()*10) < 7){
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		}
		var building = {
			x:x0, height:blgHeight, width:blgWidth, color:buildingColor
		}

		buildings.push(building)
	}

	var grow = function(event) {	
		var xCursor = event.layerX + canvas.offsetLeft
		var yCursor = event.layerY + canvas.offsetTop
		buildings.forEach(function(building) { 
			if (building.x < xCursor && xCursor < building.x + building.width &&
				floor - building.height < yCursor && yCursor < floor)
			{
				building.height += windowHeight + floorSpacing	
				c.fillStyle = building.color			
				c.fillRect(building.x, floor - building.height , building.width, windowHeight + floorSpacing)
				c.fillStyle ="yellow"
				for (var x = windowSpacing; x < building.width - windowWidth; x += windowSpacing + windowWidth) {
					if (Math.floor(Math.random()*10) < 7){
						//c.fillRect(building.x + x, y - windowHeight, windowWidth, windowHeight)
						c.fillRect(building.x + x, floor - building.height + floorSpacing, windowWidth, windowHeight)
					}
				}
			}
		})

	}



	var sun = {x: 5, y: 5, r: 20, t: 0 }
	var movingSun = function(){
		// cover the "shadow"
		c.fillStyle = "white"
		c.beginPath()
		c.arc(sun.x, sun.y, 1.5*sun.r, 0, 2*Math.PI)
  		c.closePath()
  		c.fill()	

  		sun.t += 3  		
  		sun.y = sun.r + canvas.height / 10 * (1 + Math.sin(Math.PI * sun.t/180))  		  		
		sun.x += 3;
		if (sun.x > canvas.width) {
  			sun.x = 0
  		}  		

  		// draw the new sun
		c.fillStyle = "#ffdb4d"
		c.beginPath()
		c.arc(sun.x, sun.y, sun.r, 0, 2 * Math.PI)	
  		c.closePath()
  		c.fill()


  		buildings.forEach(function(building) { 
			c.fillStyle = building.color
			c.fillRect(building.x, floor - building.height, building.width, building.height)
			c.fillStyle ="yellow"
			for (var y = floor - floorSpacing; y > floor - building.height; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < building.width - windowWidth; x += windowSpacing + windowWidth) {
					if (Math.floor(Math.random()*10) < 7){
						c.fillRect(building.x + x, y - windowHeight, windowWidth, windowHeight)
					}
				}
			}
		})

  		setTimeout(movingSun, 50)
	}

	var car = {x: 0, height: 20, width: 50, offset: 2.5}
	var movingCar = function(){
		c.fillStyle="white"
		c.fillRect(car.x, floor - car.height - 3, car.width, car.height + 3)

		car.x += 3
		if (car.x > canvas.width) { 
			car.x = 0
		}

		// draw the new car
		c.fillStyle = "grey";
		c.fillRect(car.x, floor - car.height - car.offset, car.width, car.height)
		c.fillStyle = "black"
		c.beginPath();
		c.arc(car.x + 10, floor - 5, 5, 0, 2 * Math.PI); 
		c.closePath();
		c.fill()
		c.beginPath();
		c.arc(car.x + car.width - 7, floor - 5, 5, 0, 2 * Math.PI);
		c.closePath();
		c.fill()

		setTimeout(movingCar, 50)
	}

	return {
		build: build, 
		grow: grow,
		movingSun: movingSun,
		movingCar: movingCar
	}
}

window.onload = function() {
	var canvas = document.querySelector("canvas")
	var app = createApp(canvas)
	document.getElementById("build").onclick = app.build
	canvas.addEventListener("mousedown", app.grow, false)
	app.movingSun()
	app.movingCar()
}
