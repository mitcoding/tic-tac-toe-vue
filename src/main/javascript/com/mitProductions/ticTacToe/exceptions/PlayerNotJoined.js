export default class PlayerNotJoined extends Error {
	constructor(message) {
		super(message + " has not joined game yet");
	}
}