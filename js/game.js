seaBattle.Game = function () {
	var result = null;
	this.playerField = null;
	this.enemyField = null;

	this.prepare = function () {
		this.playerField = new seaBattle.Field (10, 10),
		this.enemyField = new seaBattle.Field (10,10),
		enemy = new seaBattle.Player();
		for (var i = 0; i < 10; i++) {
			for (var j = 0; j < 10; j++) {
				var playerCell = new seaBattle.Cell(i, j);
				var enemyCell = new seaBattle.Cell(i,j);
				playerCell.field = this.playerField;
				enemyCell.field = this.enemyField;
				this.playerField.addCell(playerCell);
				this.enemyField.addCell(enemyCell);
			}
		}
	
	// creates objects 'ship' for each field
		for (var k = 0; k < this.playerField.maxShipSize ; k++) {
			for (var m = 0; m < (this.playerField.maxShipSize - k); m++) {
				var playerShip = new seaBattle.Ship(k+1);
				var enemyShip = new seaBattle.Ship(k+1);
				this.playerField.addShip(playerShip, m);
				this.enemyField.addShip(enemyShip, m);
			}
		}

		var arrangeRandomly = confirm('Расставить твои корабли случайным образом?');
		if (arrangeRandomly) {
			this.playerField.arrangeShipRandomly();
			this.start();
		}
		else {
			alert ('1-й раз кликнешь - начало корабля выберешь,\r\n 2-й раз кликнешь - поставишь корабль.')
		}
		
		this.playerField.draw('playerField', arrangeRandomly );
	}
	
	this.start = function  () {
		this.enemyField.draw('enemyField');
		this.enemyField.arrangeShipRandomly();
		
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
			this.enemyField.drawLiveShips();
			this.enemyField.delCelEvents();
			alert ('ЛУЗЕР!!');
		}
		else {
			if (enemyShipsCrashed ==20) {
				this.enemyField.delCelEvents();
				alert('Поздравляем! Ты настолько крут, что Чак Норрис' +
					' отправляет своим врагам открытки' +
					' с твоей фоткой!');
			}
		}
		//window.location.reload();
	}
		
}