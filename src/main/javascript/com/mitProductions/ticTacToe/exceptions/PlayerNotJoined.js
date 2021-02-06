export default class PlayerNotJoined extends Error {
	constructor(playerName) {
		super(playerName + " has not joined game yet");
	}
}