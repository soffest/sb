seaBattle.Player = function () {
	var lastOrientation = null,
	lastShipX = 'empty',
	lastShipY = null,
	result = null,
	lastStepX = null,
	lastStepY = null,
	lastX = null,
	lastY = null,
	x = null;
	
	this.move = function () {
		// while (result!='miss') {
		// 	this.shoot();
		// 	if (result == 'sank') {
		// 		lastShipX = 'empty';
		// 		lastShipY = null;
		// 		lastOrientation = null;
		// 		theGame.checkShipsLeft();
				
		// 	}
		// }
		// result = 0;
		// return;
		if (result == 'miss') {
			result = null;
			return;
		}
		var self = this;
		setTimeout(function () {
			self.shoot();
			if (result == 'sank') {
				lastShipX = 'empty';
				lastShipY = null;
				lastOrientation = null;
				seaBattle.theGame.checkShipsLeft();				
			}
			self.move();
		}, 300);
	}
	//choses shot method: random, when orientation is known or not
	this.shoot = function () {
		if (lastShipX != 'empty' ) {
			if (lastOrientation) {
				this.shootShip();
				return;
				
			}
			else {
				this.findOrientation();
				return;
				
			}
		}	
		else { 
			this.shootRandomly();
			return;
			
		}
		
	}	
	// shoot randomly
	this.shootRandomly = function () {
		var check = false;
		while (!(check)) {
			var randomX = ( Math.round( Math.random()*10- 0.5 ) );
			var randomY = ( Math.round( Math.random()*10- 0.5 ) );
			check = seaBattle.theGame.playerField.checkPlace( randomX, randomY, 1);
		}
		result = seaBattle.theGame.playerField.cells[randomX][randomY].checkShot();
		if (result == 'ship-crashed') {
		lastShipX = randomX;
		lastShipY = randomY;
		}
		return;
	}

	//if ship is hit but orientation unknown
	this.findOrientation = function () {
		var check = false;
		while (!(check)) {
			lastStepX = Math.round( Math.random()*3 - 1.5 ) ;
			lastStepY = (lastStepX != 0) ? 0 : (Math.round( Math.random()*3 - 1.5));
			//alert ('StepX:' + lastStepX + '   StepY:' + lastStepY);
			lastX = lastShipX + lastStepX;
			lastY = lastShipY + lastStepY;
			check = seaBattle.theGame.playerField.checkPlace( lastX, lastY, 1);
		}
		result = seaBattle.theGame.playerField.cells[lastX][lastY].checkShot();
		if (result == 'ship-crashed') {
			lastOrientation = (lastStepX != 0) ? 'horizontal' : 'vertical';
		}
		return;
	}

	//if oriantation is known
	this.shootShip = function () {
		var check = false;
		lastX = lastX + lastStepX;
		lastY = lastY + lastStepY;
		
		check = seaBattle.theGame.playerField.checkPlace( (lastX), (lastY), 1);
		if (!(check)) {
			lastStepX = -lastStepX;
			lastStepY = -lastStepY;
			lastX = lastShipX + lastStepX;
			lastY = lastShipY + lastStepY;
			
		}
		result = seaBattle.theGame.playerField.cells[lastX][lastY].checkShot();
		if (result == 'miss') {
			lastStepX = -lastStepX;
			lastStepY = -lastStepY;
			lastX = lastShipX;
			lastY = lastShipY;
		}
		return;
	}
	
}



