import * as Nonupo from '../src'
import { buildGrid } from './grid-builder'

describe('placement', () => {
    test('placing the number', () => {
        const step = new Nonupo.PlaceStep(buildGrid(), new Nonupo.History(), Nonupo.Grid.Number.Five, new Nonupo.D10())

        const nextStep = step.placeNumber(3)

        expect(nextStep.grid.values[3]).toEqual(Nonupo.Grid.Number.Five)
    })

    test('placing operators', () => {
        const step = new Nonupo.PlaceStep(buildGrid(), new Nonupo.History(), Nonupo.Grid.Number.Five, new Nonupo.D10())

        const nextStep = step.placeOperator(4, Nonupo.Grid.Operator.Plus)

        expect(nextStep.grid.values[4]).toEqual(Nonupo.Grid.Operator.Plus)
    })

    describe('getting valid positions', () => {
        test('for number', () => {
            const step = new Nonupo.PlaceStep(buildGrid({
                1: Nonupo.Grid.Number.Six,
                10: Nonupo.Grid.Operator.Plus,
                20: Nonupo.Grid.Operator.Minus,
            }), new Nonupo.History(), Nonupo.Grid.Number.Five, new Nonupo.D10())

            const positions = step.validPlacementsFor(Nonupo.Grid.Number.Seven)

            expect(positions).not.toIncludeAnyMembers([1, 10, 20])
            expect(positions.length).toEqual(33)
        })

        test('for operator', () => {
            const step = new Nonupo.PlaceStep(buildGrid({
                1: Nonupo.Grid.Number.Six,
                10: Nonupo.Grid.Operator.Plus,
                22: Nonupo.Grid.Operator.Minus,
            }), new Nonupo.History(), Nonupo.Grid.Number.Five, new Nonupo.D10())

            const positions = step.validPlacementsFor(Nonupo.Grid.Operator.Plus)

            expect(positions).not.toIncludeAnyMembers([1, 4, 9, 10, 11, 16, 21, 22, 23, 28])
            expect(positions.length).toEqual(26)
        })
    })
})
