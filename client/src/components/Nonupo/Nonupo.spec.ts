import { Nonupo } from '.'
import { component } from '@/testing/component'
import { screen, fireEvent } from '@testing-library/svelte'

describe('Nonupo', () => {
    test('placing a number', async () => {
        component(Nonupo).render()

        expect(screen.getByTitle('Square 3').innerHTML).toEqual('')

        await fireEvent.click(screen.getByText(/^\d$/))
        await fireEvent.click(screen.getByTitle('Square 3'))

        expect(screen.getByTitle('Square 3').innerHTML).not.toEqual('')
    })

    test('placing an operator', async () => {
        component(Nonupo).render()

        expect(screen.getByTitle('Square 3').innerHTML).toEqual('')

        await fireEvent.click(screen.getByText('+'))
        await fireEvent.click(screen.getByTitle('Square 3'))

        expect(screen.getByTitle('Square 3').innerHTML).toEqual('+')
    })
})
