import { cyclic } from './generators'
import * as Nonupo from '../src'

describe('history', () => {
    it('writes history over time', () => {
        const game = new Nonupo.NewGame(new Nonupo.Grid(), new Nonupo.History(), new Nonupo.D10(cyclic([3, 5, 7])))

        const step = game
            .start()
            .roll()
            .placeNumber(0)
            .roll()
            .placeOperator(1, Nonupo.Grid.Operator.Plus)
            .roll()
            .placeOperator(3, Nonupo.Grid.Operator.Minus)

        expect(step.history.asNotation()).toEqual(['3', '#@0', '5', '+@1', '7', '-@3'])
    })

    it('replays history', () => {
        const history = Nonupo.History.fromNotation(['3', '#@0', '5', '+@1', '7', '-@3'])

        const step = history.replay()

        expect(step.grid.values.map(it => it.toString())).toEqual([
            '3', '+', '',  '-', '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
        ])
    })

    it('invalid notation', () => {
        // Not a valid roll
        expect(() => Nonupo.History.fromNotation(['g'])).toThrow()

        // Not a valid placement
        expect(() => Nonupo.History.fromNotation(['5', 'g'])).toThrow()

        // Not the correct order
        expect(() => Nonupo.History.fromNotation(['#@4', '6'])).toThrow()
    })
})