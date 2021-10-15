import * as Nonupo from '@auroratide/nonupo'
import { Game, Player } from '../../src/games/types'
import { GameStore } from '../../src/games/store'

describe('GameStore', () => {
    const makePlayer = (name: string, type: 'human' | 'ai' = 'human'): Player => ({
        id: name,
        type,
        name
    })

    it('storage and retrieval', () => {
        const store = new GameStore()

        const player = makePlayer('aurora')

        const id = store.create(player)

        const game = store.get(id)
        expect(game?.id).toEqual(id)
        expect(game?.players?.first).toEqual(player)
    })

    it('creation with second player', () => {
        const store = new GameStore()

        const player = makePlayer('aurora')

        const id = store.create(undefined, player)

        const game = store.get(id)
        expect(game?.players?.second).toEqual(player)
    })

    it('game is missing', () => {
        const store = new GameStore()

        const game = store.get('nonexistant')
        expect(game).toBeNull()
    })

    it('saving a game', () => {
        const store = new GameStore()

        const step = Nonupo.History.fromNotation(['5', '#@1']).replay()
        const game = new Game<Nonupo.Step>('someid', step, {
            first: makePlayer('aurora'),
            second: makePlayer('eventide'),
        })

        store.save(game)

        const retrievedGame = store.get(game.id)!
        expect(retrievedGame.step.history.asNotation()).toEqual(game.step.history.asNotation())
    })
})