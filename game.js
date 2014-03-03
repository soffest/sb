var game = function () {
	var result = null;
	
	this.priority = function (result) {
		this.checkShipsLeft();
		if (result == 'miss') {
			enemy.move();
		}
		return;
	}
	this.checkShipsLeft = function () {
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