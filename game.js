var game = function () {
	var result = null;

	this.prepare = function () {
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				var playerCell = new Cell(i, j);
				var enemyCell = new Cell(i,j);
				playerField.addCell(playerCell);
				enemyField.addCell(enemyCell);
			}
		}
	
	// создание кораблей
		for (var k = 0; k < playerField.maxShipSize ; k++) {
			for (var m = 0; m < (playerField.maxShipSize - k); m++) {
				var playerShip = new ship(k+1);
				var enemyShip = new ship(k+1);
				playerField.addShip(playerShip, m);
				enemyField.addShip(enemyShip, m);
   
			}
		}

		var arrangeRandomly = confirm("Расставить твои корабли случайным образом?");
		if (arrangeRandomly) {
	 		playerField.arrangeShipRandomly();
		}
		/*else {
			//расставить не случайно
		}*/
		enemyField.arrangeShipRandomly();
		this.start();
	}
	
	this.start = function  () {
		playerField.draw('playerField');
		enemyField.draw('enemyField');
	} 
	
	this.priority = function (result) {
		this.checkShipsLeft();
		if (result == 'miss') {
			enemy.move();
		}
		return;
	}
	this.checkShipsLeft = function () {
		var plField = document.getElementById('playerField');
		var enField = document.getElementById('enemyField');
		var playerShipsCrashed = plField.querySelectorAll('.sank').length;
		var enemyShipsCrashed = enField.querySelectorAll('.sank').length;
		if ((playerShipsCrashed ==20) || (enemyShipsCrashed ==20)) {
			message = (playerShipsCrashed ==20) ? 'ЛУЗЕР!!' : 'Ура, победа!!!';
			alert (message);
			window.location.reload();
		}
		return;
	}






}