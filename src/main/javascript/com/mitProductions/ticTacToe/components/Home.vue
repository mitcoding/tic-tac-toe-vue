<template>
	<div id="home">
		<h2>Setup The Players for a game of Tic Tac Toe</h2>
		<div id="playerSelect">
			<div><label>Player One is: </label><v-select v-model="playerOne" :options="['person','computer']"></v-select></div>
			<div><label>Player Two is: </label><v-select v-model="playerTwo" :options="['person','computer']"></v-select></div>
		</div>
		<router-link v-if="bothPlayersSelected()" :to="{ name: 'Game', params: { playerOne: this.playerOne, playerTwo: this.playerTwo } }">Start Game</router-link>
	</div>
</template>

<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
	data: function() {
		return {
			playerOne: "",
			playerTwo: ""
		}
	},
	components: {
		"v-select": vSelect
	},
	methods: {
		bothPlayersSelected: function() {
			return this.playerOne && this.playerTwo;
		}
	}
}
</script>
<style>
	#playerSelect {
		width: 400px;
	}

	#playerSelect > div > div {
		display: inline-block;
		width: 150px;
		margin-bottom: 1em;
	}
</style>