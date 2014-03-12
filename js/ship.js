seaBattle.Ship = function (size) {
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
				this.decks[k].setClassName(className);
				this.decks[k].previousClassName = className;
			}
			else {
				this.decks[k].setClassName(this.decks[k].state);
				this.decks[k].previousClassName = this.decks[k].state;
			}
		}
	} 

	
	this.makeState = function (deckNumber) {
		state = (deckNumber == 0) ? 'ship-begin' : (deckNumber == this.size-1) ? 'ship-end' : 'ship';
		state = state + '-' + this.orientation;
		this.decks[deckNumber].state = state;
		return state; 
	}
	
	
}


