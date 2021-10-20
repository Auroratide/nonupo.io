import type { GameResponse, PlayerResponse } from '@/api/games/types'

type InitialPlayers = 'aurora' | 'eventide'

export const players = (): Record<InitialPlayers, PlayerResponse> => ({
    aurora: {
        id: 'aurora',
        type: 'human',
        name: 'Aurora',
    },
    eventide: {
        id: 'eventide',
        type: 'human',
        name: 'Eventide',
    }
})

type InitialGames = 'justStarted'

export const games = (): Record<InitialGames, GameResponse> => {
    const p = players()

    return {
        justStarted: {
            id: 'justStarted',
            players: {
                first: p.aurora,
                second: p.eventide,
            },
            history: [],
        },
    }
}
