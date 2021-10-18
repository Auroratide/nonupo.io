import Home from './Home.svelte'
import Game from './Game.svelte'
import NotFound from './NotFound.svelte'

export const routes = [ {
    path: '/',
    component: Home,
}, {
    path: '/games/:id',
    component: Game,
}, {
    path: '*',
    component: NotFound,
} ]
