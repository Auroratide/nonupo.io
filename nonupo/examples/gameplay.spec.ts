import { cyclic } from './generators'
import * as Nonupo from '../src'

describe('gameplay', () => {
    test('taking turns', () => {
        const game = new Nonupo.NewGame(Array(36).fill(''), new Nonupo.D10(cyclic([8, 2])))

        const step = game
            .start()
            .roll()
            .placeNumber(0)
            .roll()
            .placeNumber(1)
            .roll()
            .placeOperator(2, Nonupo.Operator.Minus)
        
        expect(step.grid).toEqual([
            '8', '2', '-', '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
        ])
    })
})