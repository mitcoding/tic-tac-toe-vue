import Game from "./Game";
import Board from "./Board";
import Vue from 'vue'
import App from './TicTacToe.vue'

window.Game = Game;
window.Board = Board;

window.app = new Vue({
	el: '#app',
	render: h => h(App)
});
