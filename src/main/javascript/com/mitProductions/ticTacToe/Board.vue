<template>
	<div class="board">
		<div v-for="(row, x) in spots" v-bind:key="x">
			<div v-for="(spot, y) in row" v-bind:key="y">
				<spot @click="game.doMove(x, y);handleUpdate();" :value="spot" />
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
	},
	methods: {
		handleUpdate() {
			this.$forceUpdate();
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