import { cyclic } from './generators'
import * as Nonupo from '../src'

describe('gameplay', () => {
    test('taking turns', () => {
        const game = new Nonupo.NewGame(new Nonupo.Grid(), new Nonupo.History(), new Nonupo.D10(cyclic([8, 2])))

        const step = game
            .start()
            .roll()
            .placeNumber(0)
            .roll()
            .placeNumber(1)
            .roll()
            .placeOperator(2, Nonupo.Grid.Operator.Minus)
        
        expect(step.grid.values.map(it => it.toString())).toEqual([
            '8', '2', '-', '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
            '',  '',  '',  '',  '',  '',
        ])
    })

    test('checking turns', () => {
        const game = new Nonupo.NewGame(new Nonupo.Grid(), new Nonupo.History(), new Nonupo.D10(cyclic([8, 2])))

        let step: Nonupo.Step = game.start()
        expect(step.currentPlayer).toEqual(Nonupo.PlayerOrdinal.first)

        step = (step as Nonupo.RollStep).roll()
        expect(step.currentPlayer).toEqual(Nonupo.PlayerOrdinal.first)

        step = (step as Nonupo.PlaceStep).placeNumber(0)
        expect(step.currentPlayer).toEqual(Nonupo.PlayerOrdinal.second)

        step = (step as Nonupo.RollStep).roll()
        expect(step.currentPlayer).toEqual(Nonupo.PlayerOrdinal.second)

        step = (step as Nonupo.PlaceStep).placeNumber(1)
        expect(step.currentPlayer).toEqual(Nonupo.PlayerOrdinal.first)
    })
})