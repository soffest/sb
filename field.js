var Field = function (width, height) {
    this.maxShipSize = 4;
    this.width = width;
    this.height = height;
    this.cells = [];
	this.ships = [];
	var currentShipSize = 0;
	var currentShipNumber = 0;

    for (var i = 0; i < width; i++) {
        this.cells.push([]);
        for (var j = 0; j < height; j++) {
            this.cells[i].push(null);
        }
    }
    
	for (var k = 0; k < this.maxShipSize ; k++) {
	this.ships.push([]);
        for (var m = 0; m < (this.maxShipSize - k); m++) {
	    this.ships[k].push(null);
	    }
	}
	
    this.addCell = function (cell) {
        this.cells[cell.x][cell.y] = cell;
    }
	
	this.addShip = function (ship, orderNumber) {
	this.ships[ship.size-1][orderNumber] = ship; 
	}
	
    this.draw = function (attachment) {
        var table = document.createElement('table');
			table.setAttribute('id', attachment);
			table.setAttribute('align', 'left');
            body = document.querySelector('body');
			body.appendChild(table);
        for (var y = 0; y < this.width; y++) {
            var tr = document.createElement('tr');
            table.appendChild(tr);
            for (var x = 0; x < this.height; x++) {
                var td = this.cells[x][y].createElement(attachment);
                tr.appendChild(td);
			}
        }
    }

    this.delCelEvents = function () {
    	for (var i = 0; i < width; i++) {
        	for (var j = 0; j < height; j++) {
            	this.cells[i].delEvent('click');
        	}
    	}	
    }

	//расставляет корабли в случайном порядке
	this.arrangeShipRandomly = function ( ) {
	
		for (var k = this.maxShipSize - 1; k >= 0 ; k--) {
			for (var m = 0; m < (this.maxShipSize - k); m++) {
				size = this.ships[k][m].size;
				var orientation = (Math.round(Math.random()) == 0) ? 'vertical' : 'horizontal';
				var check = false;
					while (!(check)) {
						var orientation = (Math.round(Math.random()) == 0) ? 'vertical' : 'horizontal';
						var randomX = ( Math.round( Math.random()*10- 0.5 ) );
						var randomY = ( Math.round( Math.random()*10- 0.5 ) );
						check = this.checkPlace (randomX, randomY, size, orientation);
					}
				this.ships[k][m].orientation = orientation;
				this.putShip (this.ships[k][m], randomX, randomY);
			}
		}
	}
	
	/*this.arrangeShip = function () {


	} */
		
	//проверяет, есть ли свободное место под корабль при заданных координатах первой ячейки
	this.checkPlace = function ( x, y, size, orientation ) {
		var coords = {};
		var cellX = this.cells[x];
		var check = false;
		if ( ( cellX == undefined ) || (cellX[y] == undefined) || (cellX[y].state == 'miss') || (cellX[y].state == 'ship-crashed') || (cellX[y].state == 'sank') ) {
			return false;
		}
		// выбор поперечной и продольной координаты
		if (orientation == 'vertical') {
			var keyX = 'crosscut',
			keyY = 'lengthway' ;
		}
		else {
			var keyX ='lengthway', 
			keyY = 'crosscut' ;
		}
		coords[keyX] = x;
		coords[keyY] = y;
				
		if ((coords.lengthway+size)> 10) { 
			return false; // если корабль выходит за пределы поля
		}
		coords.lengthway --;
		var m = coords.crosscut;
		for ( var i = 0; i < size + 2; i++ ) {
			for ( var j = -1; j <= 1 ; j++ ) { 
			//проверяем соседние клетки в направлении перепендикулярно протяженности корабля
				coords.crosscut = m + j;
				if ((this.cells[ coords[keyX] ]!= undefined) && (this.cells[ coords[keyX] ][ coords[keyY] ] != undefined )) {
					cellState = this.cells[ coords[keyX] ][ coords[keyY] ].state;
					check = (orientation) ? ( cellState == 'empty') : (cellState != 'sank');
					if   (!(check)) { 
						return false;	
					}
				}
			}
		coords.lengthway++;	
		}
		return true;
	}	
	
	//устанавливает корабль в ячейки согласно заданным начальным координатам  и ориентации
	this.putShip = function(ship, x, y) {
	for ( var i = 0; i < ship.size ; i++) {
	ship.decks[i] = this.cells[x][y];
	this.cells[x][y].ship = ship;
	this.cells[x][y].state = ship.makeState(i);
	if (ship.orientation == 'vertical') { y++ }
	else { x++ }
	}
	}
	
}