import type { Player } from '../../src/games/types'
import { GameStore } from '../../src/games/store'

describe('GameStore', () => {
    it('storage and retrieval', () => {
        const store = new GameStore()

        const player: Player = {
            id: 'aurora',
            type: 'human',
            name: 'Aurora',
        }

        const id = store.create(player)

        const game = store.get(id)
        expect(game?.id).toEqual(id)
        expect(game?.players?.first).toEqual(player)
        expect(game?.steps).toEqual([])
    })

    it('creation with second player', () => {
        const store = new GameStore()

        const player: Player = {
            id: 'aurora',
            type: 'human',
            name: 'Aurora',
        }

        const id = store.create(undefined, player)

        const game = store.get(id)
        expect(game?.players?.second).toEqual(player)
    })

    it('game is missing', () => {
        const store = new GameStore()

        const game = store.get('nonexistant')
        expect(game).toBeNull()
    })
})