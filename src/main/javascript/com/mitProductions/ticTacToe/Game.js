import ComputerPlayer from "./ComputerPlayer";
import Player from "./Player";
import PlayerNotJoined from "./exceptions/PlayerNotJoined";

function newPlayer(type, gamePiece) {
	if (type.toLowerCase() === 'computer') {
		return new ComputerPlayer(gamePiece);
	}

	return new Player(gamePiece);
}

export default class Game {
	constructor(board) {
		this.board = board;
	}
	
	newPlayer1(type) {
		if (this.player1) { return; }
		this.player1 = newPlayer(type, 'x');
		return this.player1;
	}

	newPlayer2(type) {
		if (this.player2) { return; }
		this.player2 = newPlayer(type, 'o');
		return this.player2;
	}

	doMove(x, y) {
		if (!this.player1) {
			throw new PlayerNotJoined("Player 1");
		}

		if (!this.player2) {
			throw new PlayerNotJoined("Player 2");
		}

		this.board.doMove(x, y, this.getCurrentPlayer() );
	}

	getCurrentPlayer() {
		return this.board.totalMoves % 2 === 0 ? this.player1 : this.player2;
	}
}