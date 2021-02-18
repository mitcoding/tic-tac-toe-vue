<template>
	<div class="board" :key="totalMoves">
		<div v-for="(row, x) in spots" :key="x">
			<div v-for="(spot, y) in row" :key="y">
				<spot @click="game.doMove(x, y);recordMove();" :value="spot" />
			</div>
		</div>
		
	</div>
</template>

<script>
import Spot from "./Spot.vue";

export default {
	components: {
		Spot
	},
	data: function() {
		return {
			totalMoves: this.game.board.totalMoves,
			spots: this.game.board.spots
		};
	},
	props: {
		game: {
			type: Object,
			default: () => ({})
		},
		value: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		recordMove() {
			this.totalMoves = this.game.board.totalMoves;
		}
	}
}
</script>
<style>
	.board {
		display: flex;
		flex-wrap: wrap;
		width: 250px;
		height: 250px;
	}
</style>