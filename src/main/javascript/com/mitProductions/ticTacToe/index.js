import App from './components/TicTacToe.vue';
import Home from "./components/Home.vue";
import Game from "./components/Game.vue";
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{ path: "/", name: "Home", component: Home },
	{ path: "/game", name: "Game", component: Game }
];

const router = new VueRouter({
	routes: routes
});

window.app = new Vue({
	el: '#app',
	render: h => h(App),
	router: router
});