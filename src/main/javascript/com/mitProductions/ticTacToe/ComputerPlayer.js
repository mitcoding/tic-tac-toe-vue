import Player from "./Player"

export default class ComputerPlayer extends Player {
	constructor(gamePiece) {
		super(gamePiece);
		this.type = "computer";
	}
}