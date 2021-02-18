<template>
	<div class="game">
		<boardView :game="game" v-if="doStartGame()" />
		<router-link v-if="game.isGameOver()" to="/">Play Again</router-link>
	</div>
</template>

<script>
import Game from "../Game.js";
import Board from "../Board.js";
import BoardView from "./Board.vue";

export default {
	components: {
		BoardView
	},
	created: function() {
		let params = this.$route.params;
		
		this.playerOne = params.playerOne;
		this.playertwo = params.playerTwo;
	},
	data: function() {
		return { 
			game: new Game(new Board() ),
			playerOne: undefined,
			playerTwo: undefined
		}
	},
	methods: {
		doStartGame: function() {
			this.game.newPlayer1(this.playerOne === "person" ? "real" : "computer");
			this.game.newPlayer2(this.playertwo === "person" ? "real" : "computer");
			
			return this.playerOne;
		}
	}
}
</script>