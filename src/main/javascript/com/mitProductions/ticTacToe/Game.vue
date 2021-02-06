<template>
	<div class="game">
		<boardView :game="game" />
	</div>
</template>

<script>
import Game from "./Game.js";
import Board from "./Board.js";
import BoardView from "./Board.vue";

export default {
	components: {
		BoardView
	},
	data: function() {
		return { 
			game: new Game(new Board() ) 
		}
	}
}
</script>