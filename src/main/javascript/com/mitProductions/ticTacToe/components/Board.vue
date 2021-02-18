<template>
	<div class="board">
		<div v-for="(row, x) in spots" :key="x">
			<div v-for="(spot, y) in row" :key="y">
				<spot @click="game.doMove(x, y);" :value="spot" />
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