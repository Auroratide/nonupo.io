import { Home } from './Home'
import { Game } from './Game'
import NotFound from './NotFound.svelte'
import { FetchGamesApi } from '@/api/games/fetch'

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
