import { Game } from '.'
import { component } from '@/testing/component'
import { screen } from '@testing-library/svelte'
import { games } from '@/testing/mock-server/data'

describe('Game Page', () => {
    test('player names', async () => {
        const game = games().justStarted

        component(Game)
            .prop('id', game.id)
            .render()

        expect(await screen.findByText(game.players.first.name)).toBeInTheDocument()
        expect(await screen.findByText(game.players.second.name)).toBeInTheDocument()
    })

    test('game not found', async () => {
        component(Game)
            .prop('id', 'doesnnotexist')
            .render()

        expect(await screen.findByText(/doesn't exist/)).toBeInTheDocument()
    })
})
