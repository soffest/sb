var player = function () {
	var lastOrientation = null,
	lastShipX = null,
	lastShipY = null,
	result = null,
	lastStepX = null,
	lastStepY = null,
	lastX = null,
	lastY = null,
	x = null;
	
	this.move = function () {
		while (result!='miss') {
			this.shoot();
			if (result == 'sank') {
				lastShipX = null;
				lastShipY = null;
				lastOrientation = null;
				theGame.checkShipsLeft();
				
			}
		}
		result = 0;
		return;
	}
	//выбирает как стрелять
	this.shoot = function () {
		if (lastShipX) {
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
	// стреляет рандомно
	this.shootRandomly = function () {
		var check = false;
		while (!(check)) {
			var randomX = ( Math.round( Math.random()*10- 0.5 ) );
			var randomY = ( Math.round( Math.random()*10- 0.5 ) );
			check = playerField.checkPlace( randomX, randomY, 1);
		}
		result = playerField.cells[randomX][randomY].checkShot();
		if (result == 'ship-crashed') {
		lastShipX = randomX;
		lastShipY = randomY;
		}
		return;
	}
	
	this.findOrientation = function () {
		var check = false;
		while (!(check)) {
			lastStepX = Math.round( Math.random()*3 - 1.5 ) ;
			lastStepY = (lastStepX != 0) ? 0 : (Math.round( Math.random()*3 - 1.5));
			//alert ('StepX:' + lastStepX + '   StepY:' + lastStepY);
			lastX = lastShipX + lastStepX;
			lastY = lastShipY + lastStepY;
			check = playerField.checkPlace( lastX, lastY, 1);
		}
		result = playerField.cells[lastX][lastY].checkShot();
		if (result == 'ship-crashed') {
			lastOrientation = (lastStepX != 0) ? 'horizontal' : 'vertical';
		}
		return;
	}

	this.shootShip = function () {
		var check = false;
		lastX = lastX + lastStepX;
		lastY = lastY + lastStepY;
		//alert ('X:' + lastX + '   Y:' + lastY);
		check = playerField.checkPlace( (lastX), (lastY), 1);
		if (!(check)) {
			lastStepX = -lastStepX;
			lastStepY = -lastStepY;
			lastX = lastShipX + lastStepX;
			lastY = lastShipY + lastStepY;
			//alert('-StepX:' + lastStepX + '   -StepY:' + lastStepY);
		}
		result = playerField.cells[lastX][lastY].checkShot();
		if (result == 'miss') {
			lastStepX = -lastStepX;
			lastStepY = -lastStepY;
			lastX = lastShipX;
			lastY = lastShipY;
		}
		return;
	}
	
}



