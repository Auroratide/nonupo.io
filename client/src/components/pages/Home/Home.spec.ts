import { Home } from '.'
import { component } from '@/testing/component'
import { screen, act } from '@testing-library/svelte'
import { games } from '@/testing/mock-server/data'
import userEvent from '@testing-library/user-event'

describe('Home', () => {
    test('creating a game', async () => {
        const goTo = jest.fn()
        const game = games().newGame
        const greybox: {
            createGameRequest?: Promise<any>
        } = {}

        component(Home)
            .prop('goTo', goTo)
            .prop('greybox', greybox)
            .render()

        userEvent.click(await screen.findByText(/create game/i))

        await greybox.createGameRequest

        expect(goTo).toHaveBeenCalledWith(`/games/${game.id}`)
    })
})