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
	
	// creates objects 'ship' for each field
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
	 		this.start();
		}
		
		playerField.draw('playerField', arrangeRandomly );
	}
	
	this.start = function  () {
		enemyField.draw('enemyField');
		enemyField.arrangeShipRandomly();
		
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
		if (playerShipsCrashed ==20)  {
			alert ('ЛУЗЕР!!');
			enemyField.drawLiveShips();
			enemyField.delCelEvents();
		}
		else {
			if (enemyShipsCrashed ==20) {
				alert('Ура, победа!!!');
			}
		}
		//window.location.reload();
	}
		
}