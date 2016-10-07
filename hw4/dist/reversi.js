window.onload = function() {

    var board;		// the chess board in the arrray form
	var rows; 		// the chess board in view
	var row, iterate;
	var user;		// in default, the player has the right to move first
	var tables = document.getElementsByTagName( 'table' );
    var diffcultyLevel;
    var undoTime;
    var score;

	var selectBtn = document.getElementById("selectItem");
    selectBtn.addEventListener("change", function(){
    	diffcultyLevel = selectBtn.value;
    })

	 // initialize the board
    const initBoard = _ => {
    	// computer is positive (blue)
    	board =  [ 0,  0,  0,  0,  0,  0,  0,  0,
		           0,  0,  0,  0,  0,  0,  0,  0, 
		           0,  0,  0,  0,  0,  0,  0,  0,
		           0,  0,  0, +1, -1,  0,  0,  0,
		           0,  0,  0, -1, +1,  0,  0,  0,
		           0,  0,  0,  0,  0,  0,  0,  0,
		           0,  0,  0,  0,  0,  0,  0,  0,
		           0,  0,  0,  0,  0,  0,  0,  0 ];

		// get row elements of three tables, 8 rows in total
		rows = [];
		for (let i = 0; i < tables.length; i++) {
	        row = tables[i].rows;
	        for (let j = 0; j < row.length; j++){
	        	rows.push(row[j]);
	        }
	    }

    	newPiece(rows[3].cells[3], "computer");
    	newPiece(rows[3].cells[4], "player");
    	newPiece(rows[4].cells[3], "player");
    	newPiece(rows[4].cells[4], "computer");

		iterate = 0;
		user = "player";
		diffcultyLevel = selectBtn.value;
		undoTime = 0;
		score = 0;
    }

    // put the new piece on the board both in view and model
    const newPiece = (cell, user) => {
		var img = document.createElement("img");
		img.src = (user === "computer") ? "bluePiece.png" : "redPiece.png";
		img.style.justifyContent = "center";
		img.width = $(cell).width() * 1.04;
		cell.appendChild(img);
		return img;
	}

	initBoard();

    // determine whether this cell is available for adding the chiece
    const isCellAvailable = (user, i, j) => {
    	let opponent = (user === "player") ? 1 : -1;
    	for (let moveX = -1; moveX <= 1; moveX++){
    		for (let moveY = -1; moveY <= 1; moveY++){
				let ii = i + moveX;
				let jj = j + moveY;
				if (moveX != 0 || moveY != 0){
					if (inBound(ii, jj)){
						if (board[getIndex(ii, jj)] == opponent){
							if (existsSelf(opponent, [moveX, moveY], ii, jj)){
								return true;
							}
						}
					}
				}	
    		}
    	}
    	return false;
    }

    const existsSelf = (opponent, move, i, j) => {
    	i += move[0];
    	j += move[1];
    	while (inBound(i, j)){
    		if (board[getIndex(i, j)] == 0){
    			return false;
    		}else if (board[getIndex(i, j)] == opponent){
    			i += move[0];
    			j += move[1];
    			continue;
    		}else{
    			return true;
    		}
    	}
    	return false;
    }

	//determine whether current indice are in the chess board
	const inBound = (i, j) => {
		return (i >= 0 && i <= 7 && j >= 0 && j <= 7);
	}

	// return the index of that cell in array board[]
	const getIndex = (i, j) => {
		return (i === 0) ? j : (8 * i + j);
	}

	const isFullBoard = _ => {
		for (let i = board.length - 1; i >= 0; i--) {
			if (board[i] == 0){
				return false;
			}
		}
		return true;
	}

	const endGame = _ => {
		if (numUser == numComputer){
			alert("It's a tie!" + " numComputer: " + numUser + " numComputer: " + numComputer);
		}else{
			let winner = (numUser > numComputer) ? "Player" : "Computer";
			alert(winner + " wins!" + "Your score is " + score);
		}
	}

	var numUser = 0;
	var numComputer = 0;

	var scorePlayer = document.getElementById("scorePlayer");
	var scoreComputer = document.getElementById("scoreComputer");

	const calculateScore = _ => {
		let offset = numUser - numComputer + 65;
		score = offset / 129 * 100 * (10 - undoTime) / 10;

	}

	const betterSolution = _ => {}

	const calculateNum = _ => {
		numUser = 0;
		numComputer = 0;
	    for (var i = board.length - 1; i >= 0; i--) {
	    	if (board[i] === -1){
	    		numUser++;
	    	}else if (board[i] === 1) {
	    		numComputer++;
	    	}
	    }
	    scorePlayer.innerHTML = numUser;
	    scoreComputer.innerHTML = numComputer;
	}

	const mouseOverFunc = function() {
		let color = (user == "computer") ? "#538eed" : "#e54540";
		$(this).css("background-color", color);
	}

	const mouseOutFunc = function() {
		$(this).css("background-color", "#adf1f7");
	}

	const reverseLine = (opponent, move, i, j) => {
    	do{
    		rows[i].cells[j].firstChild.src = (user === "computer") ? "bluePiece.png" : "redPiece.png";
    		board[getIndex(i, j)] = - opponent;
    		i += move[0];
    		j += move[1];
    	} while (board[getIndex(i, j)] == opponent);
    }

    const newReverseLine = (opponent, move, i, j) => {
    	while (board[getIndex(i, j)] != 0){
    		rows[i].cells[j].firstChild.src = (user === "computer") ? "bluePiece.png" : "redPiece.png";
    		board[getIndex(i, j)] = - opponent;
    		i += move[0];
    		j += move[1];
    	} 
    }

	const reversePiece = (index, user) => {
		let i = Math.floor(index / 8);
		let j = index % 8;
		let opponent = (user === "player") ? 1 : -1;
    	for (let moveX = -1; moveX <= 1; moveX++){
    		for (let moveY = -1; moveY <= 1; moveY++){
				let ii = i + moveX;
				let jj = j + moveY;
				if (moveX != 0 || moveY != 0){
					if (inBound(ii, jj)){
						if (board[getIndex(ii, jj)] == opponent){
							if (existsSelf(opponent, [moveX, moveY], ii, jj)){
								reverseLine(opponent, [moveX, moveY], ii, jj);
							}
						}
						// new rule: if two of your pieces are consecutive during this turn, all pieces in that line become your pieces
						if (board[getIndex(ii, jj)] == -opponent){
							newReverseLine(opponent, [moveX, moveY], ii, jj);
						}
					}
				}	
    		}
    	}
	}

	const computerTurn = _ =>{
		let availableCells = [];
		let numCell = 0;
		let randomCell = 0;
		for (let index = 0; index <= 63; index++) {
			let i = Math.floor(index / 8);
			let j = index % 8;
		 	if (isCellAvailable(user, i, j)){
		 		availableCells.push(index);
		 	}
		}
		randomCell = Math.floor((Math.random() * (availableCells.length-1)) + 1);
		if (diffcultyLevel == "easy"){
			numCell = randomCell;
		}else{
			let outcome = 0;
			betterSolution();
			numCell = (randomCell + 6) % availableCells.length;
		}
		clickDivFuncHelper(availableCells[numCell]);
	}

	const clickDivFuncHelper = function(index) {
		let i = Math.floor(index / 8);
		let j = index % 8;
		let cell = rows[i].cells[j];
		if (board[index] == 0){
			var img = newPiece(cell, user);
			board[index] = (user === "computer") ? 1 : -1;
		}
		// different with tradiaional rules
		reversePiece(index, user, cell);


		// consider the next turn
		user = (user === "computer") ? "player" : "computer";

		// if no cell available
		let noCellAvailable = true;
		for (let index = 0; index <= 63; index++) {
			let i = Math.floor(index / 8);
			let j = index % 8;
		 	if (isCellAvailable(user, i, j)){
		 		noCellAvailable = false;
		 	}
		}
		if (noCellAvailable){
			if (user == "player"){
				user = "computer";
				computerTurn();
			}
		}

		// automatically let the computer move
		if (user == "computer"){
			computerTurn();
		}
		if (isFullBoard()){
			endGame();
		}
	}

	const clickDivFunc = function() {
		let indexID = parseInt(this.id)
  		clickDivFuncHelper(indexID);
	}

	const mainAction = _ => {
		if (!isFullBoard()){
			for (let i = 0; i < rows.length; i++){
		    	for (let j = 0; j < rows[i].cells.length; j++){
		    		if (iterate > 0) {
			    		rows[i].cells[j].removeEventListener("mouseover", mouseOverFunc);
			    		rows[i].cells[j].removeEventListener("click", clickDivFunc, false);
			    	}
		    		let index = getIndex(i, j);
		    		if (board[index] == 0){
			    		if (isCellAvailable(user, i, j)){
			    			rows[i].cells[j].addEventListener("mouseover", mouseOverFunc);
				    		rows[i].cells[j].addEventListener("mouseout", mouseOutFunc);
				    		rows[i].cells[j].addEventListener("click", clickDivFunc, false);	
			    		}
		    		}
		    	}
		    }
		    calculateNum();
		    iterate++;
		}		
	}

	mainAction();

	var chessBoard = document.getElementById("board");
	chessBoard.addEventListener("click", mainAction, false);

    const removeBoard = _ => {
	    for (let i = 0; i < 64; i++){
	    	let id = "" + i + "";
	    	$('td img').remove();
		}
		for (let i = 0; i < rows.length; i++){
	    	for (let j = 0; j < rows[i].cells.length; j++){
	    		if (iterate > 0) {
		    		rows[i].cells[j].removeEventListener("mouseover", mouseOverFunc);
		    		rows[i].cells[j].removeEventListener("mouseout", mouseOutFunc);
		    		rows[i].cells[j].removeEventListener("click", clickDivFunc, false);
		    	}
		    }
		}
	}
		
    const restart = _ => {
    	removeBoard();
    	initBoard();
    	mainAction();
    }

    const undo = _ => {
    	restart();
    	undoTime++;
    }

    var restartBtn = document.getElementById("restart");
    var undoBtn = document.getElementById("undo");
    restartBtn.addEventListener("click", restart, false);
    undoBtn.addEventListener("click", undo, false);




}


