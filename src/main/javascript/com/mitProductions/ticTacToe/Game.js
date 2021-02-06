import ComputerPlayer from "./ComputerPlayer";
import Player from "./Player";
import PlayerNotJoined from "./exceptions/PlayerNotJoined";

function newPlayer(type, gamePiece) {
	if (type.toLowerCase() === 'computer') {
		return new ComputerPlayer(gamePiece);
	}

	return new Player(gamePiece);
}

function findHorizontalWinner(board) {
	for(var i = 0; i < 3; i++) {
		if (board.spots[i][0] instanceof Player === false) { continue; }

		if (board.spots[i][0].gamePiece === board.spots[i][1].gamePiece && 
			board.spots[i][1].gamePiece === board.spots[i][2].gamePiece
		) {
			return board.spots[i][0];
		}
	}

	return false;
}

function findVerticalWinner(board) {
	for(var i = 0; i < 3; i++) {
		if (board.spots[0][i] instanceof Player === false) { continue; }

		if (board.spots[0][i].gamePiece === board.spots[1][i].gamePiece && 
			board.spots[1][i].gamePiece === board.spots[2][i].gamePiece
		) {
			return board.spots[0][i];
		}
	}

	return false;
}

function findDiagonalWinner(board) {
	if (board.spots[0][0] instanceof Player === true && 
		board.spots[0][0].gamePiece === board.spots[1][1].gamePiece && 
		board.spots[1][1].gamePiece === board.spots[2][2].gamePiece
	) {
		return board.spots[0][0];
	}

	if (board.spots[0][2] instanceof Player === true && 
		board.spots[0][2].gamePiece === board.spots[1][1].gamePiece && 
		board.spots[1][1].gamePiece === board.spots[2][0].gamePiece
	) {
		return board.spots[0][2];
	}
	
	return false;
}

function whoIsWinner(board) {
	return findHorizontalWinner(board) || findVerticalWinner(board) || findDiagonalWinner(board) || { gamePiece: "" };
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

	getScore() {
		let player = whoIsWinner(this.board);
		switch(player.gamePiece.toLowerCase() ) {
			case "x" : return 10;
			case "o" : return -10;
			default : return 0;
		}
	}

	isGameOver() {
		return (9 - this.board.totalMoves === 0) || whoIsWinner(this.board) instanceof Player === true;
	}
}