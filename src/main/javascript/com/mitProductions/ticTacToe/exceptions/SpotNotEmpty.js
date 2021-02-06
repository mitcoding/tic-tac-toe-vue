const boardPositions = [
	["Top Left", "Top Middle", "Top Right"],
	["Middle Left", "Middle Middle", "Middle Right"],
	["Bottom Left", "Bottom Middle", "Bottom Right"]
];

export default class SpotNotEmpty extends Error {
	constructor(x, y, playerPiece) {
		super(playerPiece + " already filled the " + boardPositions[x][y] + " position");
	}
}