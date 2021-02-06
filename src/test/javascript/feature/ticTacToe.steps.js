import Board from "../../../main/javascript/com/mitProductions/ticTacToe/Board";
import Game from "../../../main/javascript/com/mitProductions/ticTacToe/Game";
import SpotNotEmpty from "../../../main/javascript/com/mitProductions/ticTacToe/exceptions/SpotNotEmpty";
import PlayerNotJoined from "../../../main/javascript/com/mitProductions/ticTacToe/exceptions/PlayerNotJoined";

let 
	positionToCoords = {
		"Top Left": { x: 0, y: 0 },
		"Top Middle": { x: 0, y: 1 },
		"Top Right": { x: 0, y: 2 },
		"Middle Left": { x: 1, y: 0 },
		"Middle Middle": { x: 1, y: 1 },
		"Middle Right": { x: 1, y: 2 },
		"Bottom Left": { x: 2, y: 0 },
		"Bottom Middle": { x: 2, y: 1 },
		"Bottom Right": { x: 2, y: 2 }
	}
;

function doMove(world, maxMoves) {
	let 
		coords = [
			[0,0],
			[0,1],
			[0,2],
			[1,0],
			[1,1],
			[1,2],
			[2,0],
			[2,1],
			[2,2],
			[2,3],
		]
	;

	while(world.game.board.totalMoves < maxMoves) {
		let move = coords[world.game.board.totalMoves];
		world.game.board.doMove(move[0], move[1]);
	}
}

function gamePieceToPlayer(gamePiece) {
	return (gamePiece.toLowerCase() === "x") ? "player1" : "player2";
}

function parseStringToArray(string) {
	string = string.replace(/([,\s]*)?true([,\s]*)/gi, "$1true$2").replace(/([,\s]*)false([,\s]*)/gi, "$1false$2");
	return JSON.parse(string, (key, value) => {
		return parseStringToNumber(value);
	});
}

function parseStringToNumber(value) {
	switch (true) {
		case Array.isArray(value) :
			return value;
		case (/^FALSE$/i).test(value):
			return 0;
		case (/^TRUE$/i).test(value):
			return -1;
		case /^[-]?\d+$/.test(value):
			return value * 1;
	}

	return value;
};

defineParameterType({
	name: "array", 
	regexp: /(\[.*\])/,
	transformer: parseStringToArray
});

Before(function() {
	var world = this;

	world.board	= new Board();
	world.game = new Game(world.board);
	world.exception = {};
	world.playerTypeResultsMap = {};
});

Given('User places an {string} on the {string} place', function(gamePiece, position) {
	let 
		coords = positionToCoords[position],
		world = this
	;

	try {
		world.board.doMove(coords.x, coords.y, { piece: gamePiece });
	} catch(e) {
		world.exception = e;
	}
});

Given('{string} is {string}', function(player, playerType) {
	let world = this;

	if (player.toLowerCase() === 'x') {
		world.game.newPlayer1(playerType);
	} else {
		world.game.newPlayer2(playerType);
	}
});

Given('{int} moves on board', function(intMoves) {
	let world = this;

	world.game.newPlayer1('real');
	world.game.newPlayer2('real');

	doMove(world, intMoves);
});

Given('Game board looks like this {array}', function (gameBoard) {
	let world = this;

	gameBoard.forEach(function(row, x) {
		row.forEach(function(gamePiece, y) {
			if (gamePiece === "x" || gamePiece === "o") {
				let player = world.game[gamePieceToPlayer(gamePiece)];
				world.game.board.doMove(x, y, player);
				world.game.board.spots[x][y].gamePiece.should.equal(gameBoard[x][y].toUpperCase(), gamePiece + x + y);
			}
		});
	});
});

When('I ask whose turn it is', function() {
	let world = this;
	world.currentPlayer = world.game.getCurrentPlayer();
});

When('I ask what {string} is', function(player) {
	let world = this;

	world.playerTypeResultsMap[player] = world.game[gamePieceToPlayer(player)].type;
});

When('A User asks what the score is', function () {
	let world = this;

	world.currentScore = world.game.getScore();
});

When('User tries to place an {string} on the {string} place', function (gamePiece, position) {
	let 
		coords = positionToCoords[position],
		world = this
	;

	try {
		world.game.doMove(coords.x, coords.y);
	} catch (e) {
		world.exception = e;
	}
});

When('First player places a x on the {string} place', function (position) {
	let 
		coords = positionToCoords[position],
		world = this
	;
	
	world.game.doMove(coords.x, coords.y);
});

Then('{string} should have an {string}', function(position, expectedGamePiece) {
	let 
		coords = positionToCoords[position],
		world = this
	;

	world.board.spots[coords.x][coords.y].piece.should.equal(expectedGamePiece);
});

Then('Board should register {int} moves total', function(expectedTotalMoves) {
	let world = this;

	world.board.totalMoves.should.equal(expectedTotalMoves);
});

Then('User should be informed that {string} was already placed on the {string} place', function(gamePiece, position) {
	let 
		coords = positionToCoords[position],
		world = this,
		expectedException = new SpotNotEmpty(coords.x, coords.y, world.board.spots[coords.x][coords.y].gamePiece)
	;
	
	world.exception.message.should.equal(expectedException.message, " ");
});

Then('Game should tell me it is {string} turn', function(gamePiece) {
	let world = this;

	world.game.getCurrentPlayer().should.eql(world.currentPlayer, " ");
	world.game.getCurrentPlayer().gamePiece.should.equal(gamePiece);
});

Then('Game should tell me that {string} is {string}', function(player, expectedPlayerType) {
	let world = this;
	
	world.playerTypeResultsMap[player].should.equal(expectedPlayerType);
});

Then('The score should be {int} points', function (expectedPoints) {
	let world = this;

	world.game.getScore().should.equal(expectedPoints);
});

Then('The game state to be {string}', function (gameState) {
	let world = this;

	if (gameState === "active") {
		world.game.isGameOver().should.equal(false);
	} else {
		world.game.isGameOver().should.equal(true);
	}
});

Then('I expect this list of moves {array}', function (expectedAvailableMoves) {
	let world = this;

	world.game.board.getAvailableMoves().should.eql(expectedAvailableMoves);
});

Then('User should be notified that {string} has not joined yet', function (playerName) {
	let world = this;

	world.exception.message.should.eql(new PlayerNotJoined(playerName).message);
});

Then('Best move should be {array}', function (expectedCoords) {
	let world = this;

	world.game.getBestMoveHint().move.should.eql(expectedCoords, " ");
});

Then('Game should finish looking like this {array}', function (expectedGameBoard) {
	let world = this;
	expectedGameBoard.forEach(function(row, x){
		row.forEach(function(spot, y){
			expectedGameBoard[x][y] = spot === "x" ? world.game.player1 : world.game.player2;
		});
	});

	world.game.board.spots.should.eql(expectedGameBoard);
});