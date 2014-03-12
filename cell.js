seaBattle.Cell = function (x, y) {
    var empty = 'empty',
		miss = 'miss',
		ship = 'ship-horizontal',
		shipBegin = 'ship-begin-horizontal',
		shipEnd = 'ship-end-horizontal',
		ship = 'ship-vertical',
		shipBegin = 'ship-begin-vertical',
		shipEnd = 'ship-end-vertical',
		shipCrashed = 'ship-crashed',
		sank = 'sank',
		underCursor = 'under-cursor';
				
    
    this.x = x;
    this.y = y;
    this.state = empty;
    this.ship = null;
    this.previousClassName = 'empty';
	this.td = null;
	this.field = null;
	var handler1 = null,
		handler2 = null;
	
	
    this.setClassName = function (state) {
        this.td.className = (state == 'sank') ? state : ('standart-cell '+ state);   
    }
    
    this.createElement = function (attachment, randomly) {
        this.td = document.createElement('td');
        this.td.setAttribute('data-x', this.x);
        this.td.setAttribute('data-y', this.y);
        
        //Enemy`s Field. Click means shot.
		if (attachment == 'enemyField') {
			this.td.className = 'standart-cell '+'empty';
			handler1 = this.shoot.bind(this);
			this.td.addEventListener('click', handler1 );
			this.td.addEventListener('mouseover', this.hover.bind(this));
			this.td.addEventListener('mouseout',this.returnState.bind(this));
		}
		else {
			// Player`s field. Clicks are used to arrange ships 
			if (randomly) {
				this.td.className = 'standart-cell '+this.state;
			}
		//If player chose random arrangement of his ships
			else {
				this.td.className = 'standart-cell '+this.state;
				handler2 = this.clicked.bind(this);
				this.td.addEventListener('click', handler2, true );
				//this.td.addEventListener('mouseover', this.hover.bind(this));
				//this.td.addEventListener('mouseout',this.returnState.bind(this));
			}
		}
        return this.td;
    };
	
	this.clicked = function () {
		this.field.arrangeShip(this.x, this.y);
	}
			                            
    this.shoot = function (event) {
		var shotResult = this.checkShot();
		this.delEvent('click');
		seaBattle.theGame.priority(shotResult);
	}

	this.setShip = function () {
		
	}

	this.delEvent = function (event) {
		var h = handler1 || handler2;
		this.td.removeEventListener(event, h );
	}
	
 
    this.hover = function (event) {
        this.setClassName(underCursor);
	}
    
    this.returnState = function (event) {
        this.setClassName(this.previousClassName);
    }
	
	
	
	//cheks shot result
	this.checkShot = function () {
		if (this.state == 'empty') {
					this.state ='miss';
		}
		else {
			this.ship.lives --;
			if (this.ship.lives == 0) {
				this.ship.draw ('sank');
				this.state = 'sank';
			}
			else {
				this.state = 'ship-crashed';
			}
		}
		this.setClassName(this.state);
		this.previousClassName = this.state;
		return this.state;
	}	
}

