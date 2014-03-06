var ship = function (size) {
	this.size = size;
	this.orientation;//horizontal or vertical
	this.decks = [];
	this.lives = size;

	for (var j = 0; j < this.size; j++) {
     this.decks.push(null);        
		}
	this.draw = function (className) {
		for (var k = 0; k< this.size; k++) {
			if (className) {
				this.decks[k].state = className;
			}
			else {
				className = this.decks[k].state;
			}
			this.decks[k].setClassName(className);
			this.decks[k].previousClassName = className;
		}
	} 
	this.makeState = function (deckNumber) {
		if (deckNumber) {
			if (deckNumber == this.size-1) {
				state ='ship-end' 
				}
				else {
				state = 'ship' 
				}
		}
		else {
		state = 'ship-begin';	
		}
		state = state + '-' + this.orientation;
		return state; 
	}
	
	
}


