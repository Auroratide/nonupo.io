import { Nonupo } from '.'
import { component } from '@/testing/component'
import { screen, fireEvent } from '@testing-library/svelte'

describe('Nonupo', () => {
    const elements = {
        square: (row: number, column: number) => screen.getByTitle(`Square ${6 * row + column}`) as SquareElement,
        number: () => screen.getByText(/^\d$/) as OptionElement,
        plus: () => screen.getByText('+') as OptionElement,
        minus: () => screen.getByText('-') as OptionElement,
    }

    const actions = {
        place: async (option: OptionElement, square: SquareElement) => {
            await fireEvent.click(option)
            await fireEvent.click(square)
        },
    }

    test('placing a number', async () => {
        component(Nonupo).render()

        expect(elements.square(0, 3).innerText).toEqual('')

        await actions.place(elements.number(), elements.square(0, 3))

        expect(elements.square(0, 3).innerText).not.toEqual('')
    })

    test('placing an operator', async () => {
        component(Nonupo).render()

        expect(elements.square(0, 3).innerText).toEqual('')

        await actions.place(elements.plus(), elements.square(0, 3))

        expect(elements.square(0, 3).innerText).not.toEqual('')
    })
})

type SquareElement = HTMLElement
type OptionElement = HTMLElement
