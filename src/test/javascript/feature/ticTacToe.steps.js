function convertAllStringNumbersToNumber(array) {
	return array.map(parseStringToNumber);
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
	world.positionToCoords = {
		"Top Left": { x: 0, y: 0 },
		"Top Middle": { x: 0, y: 1 },
		"Top Right": { x: 0, y: 2 },
		"Middle Left": { x: 1, y: 0 },
		"Middle Middle": { x: 1, y: 1 },
		"Middle Right": { x: 1, y: 2 },
		"Bottom Left": { x: 2, y: 0 },
		"Bottom Middle": { x: 2, y: 1 },
		"Bottom Right": { x: 2, y: 2 }
	};
});

Given('User places an {string} on the {string} place', function(gamePiece, position) {
	let coords = this.positionToCoords[position];
	console.log(gamePiece, position, coords.x, coords.y);
	return 'pending';
});

Given('{string} is {string}', function(player, playerType) {
	console.log(player, playerType, convertAllStringNumbersToNumber);
	return 'pending';
});

Given('{int} moves on board', function(intMoves) {
	console.log('total moves: ' + intMoves);
	return 'pending';
});

When('I ask whose turn it is', function() {
	return 'pending';
});

When('I ask what {string} is', function(player) {
	console.log('player: ' + player);
	return 'pending';
});

Then('{string} should have an {string}', function(position, gamePiece) {
	let coords = this.positionToCoords[position];
	console.log(gamePiece, position, coords.x, coords.y);
	return 'pending';
});

Then('Board should register {int} moves total', function(totalMoves) {
	console.log(totalMoves);
	return 'pending';
});

Then('User should be informed that {string} was already placed on the {string} place', function(gamePiece, position) {
	let coords = this.positionToCoords[position];
	console.log(gamePiece, position, coords.x, coords.y);
	return 'pending'
});

Then('Game should tell me it is {string} turn', function(player) {
	console.log("it is " + player + "'s turn");
	return 'pending';
});

Then('Game should tell me that {string} is {string}', function(player, playerType) {
	console.log('player: ' + player + ' is ' + playerType);
	return 'pending';
});
