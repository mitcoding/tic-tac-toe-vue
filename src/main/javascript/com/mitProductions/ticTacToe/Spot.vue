<template>
	<div @click="$emit('click');" class="spot">
		<span
			v-if="isPlayerInstance(value) === true"
			:class="{ 'x' : value.gamePiece === 'X', 'o': value.gamePiece === 'O' }"
		>
			{{ value.gamePiece }}
		</span>
	</div>
</template>

<script>
import Player from './Player'
export default {
	props: {
		value: {
			type: Object,
			default: () => ({})
		}
	},
	methods: {
		isPlayerInstance(value) {
			return value instanceof Player;
		}
	}
}
</script>

<style>
	.spot {
		width: 64px;
		height: 64px;
		border: 2px solid rgb(233,233,233);
		font-size: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.x {
		color: red;
	}

	.o {
		color: green;
	}
</style>