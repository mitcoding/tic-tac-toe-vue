import SpotNotEmpty from './exceptions/SpotNotEmpty'
function isEmptyObject(obj) {
	return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export default class Board {
	constructor() {
		this.spots = [
			[{},{},{}],
			[{},{},{}],
			[{},{},{}]
		];

		this.totalMoves = 0;
	}

	isSpotEmpty(x, y) {
		return isEmptyObject(this.spots[x][y]);
	}

	doMove(x, y, player) {
		if (this.isSpotEmpty(x, y) ) {
			this.spots[x][y] = player;
			this.totalMoves++;
			return;
		}

		throw new SpotNotEmpty(x, y, this.spots[x][y].gamePiece); 
	}

	clone() {
		let clone = new Board();

		this.spots.forEach(function(array, x) {
			array.forEach(function(spot, y) {
				clone.spots[x][y] = spot;
			});
		});

		clone.totalMoves = this.totalMoves;

		return clone;
	}

	getAvailableMoves() {
		let moves = [];
		this.spots.forEach(function(row, x){
			row.forEach(function(spot, y) {
				if (isEmptyObject(spot) ) {
					moves.push([x,y]);
				}
			});
		});

		return moves;
	}
}