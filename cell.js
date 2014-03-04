var Cell = function (x, y) {
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
	var handler = null;
	
	
    this.setClassName = function (state) {
        this.td.className = (state == 'sank') ? state : ('standart-cell '+ state);   
    }
    
    this.createElement = function (attachment) {
        this.td = document.createElement('td');
        this.td.setAttribute('data-x', this.x);
        this.td.setAttribute('data-y', this.y);
        //доработать!!!!!!!!!
		if (attachment == 'enemyField') {
			this.td.className = 'standart-cell '+'empty';
			handler = this.clicked.bind(this);
			this.td.addEventListener('click', handler, true );
			this.td.addEventListener('mouseover', this.hover.bind(this));
			this.td.addEventListener('mouseout',this.returnState.bind(this));
		}
		else {
			this.td.className = 'standart-cell '+this.state;
		}
        return this.td;
    };
	
			                            
    this.clicked = function (event) {
		var shotResult = this.checkShot();
		this.delEvent('click');
		theGame.priority(shotResult);
	}

	this.delEvent = function (event) {

		this.td.removeEventListener(event, handler , true);
	}
	
 
    this.hover = function (event) {
        this.setClassName(underCursor);
	}
    
    this.returnState = function (event) {
        this.setClassName(this.previousClassName);
    }
	
	
	
	//проверяет резултат выстрела 
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

