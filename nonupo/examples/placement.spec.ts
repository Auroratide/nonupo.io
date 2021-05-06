import * as Nonupo from '../src'
import { buildGrid } from './grid-builder'

describe('placement', () => {
    test('placing the number', () => {
        const step = new Nonupo.PlaceStep(buildGrid(), Nonupo.Number.Five, new Nonupo.D10())

        const nextStep = step.placeNumber(3)

        expect(nextStep.grid[3]).toEqual(Nonupo.Number.Five)
    })

    test('placing operators', () => {
        const step = new Nonupo.PlaceStep(buildGrid(), Nonupo.Number.Five, new Nonupo.D10())

        const nextStep = step.placeOperator(4, Nonupo.Operator.Plus)

        expect(nextStep.grid[4]).toEqual(Nonupo.Operator.Plus)
    })

    describe('getting valid positions', () => {
        test('for number', () => {
            const step = new Nonupo.PlaceStep(buildGrid({
                1: Nonupo.Number.Six,
                10: Nonupo.Operator.Plus,
                20: Nonupo.Operator.Minus,
            }), Nonupo.Number.Five, new Nonupo.D10())

            const positions = step.validPlacementsFor(Nonupo.Number)

            expect(positions).not.toIncludeAnyMembers([1, 10, 20])
            expect(positions.length).toEqual(33)
        })

        test('for operator', () => {
            const step = new Nonupo.PlaceStep(buildGrid({
                1: Nonupo.Number.Six,
                10: Nonupo.Operator.Plus,
                22: Nonupo.Operator.Minus,
            }), Nonupo.Number.Five, new Nonupo.D10())

            const positions = step.validPlacementsFor(Nonupo.Operator)

            expect(positions).not.toIncludeAnyMembers([1, 4, 9, 10, 11, 16, 21, 22, 23, 28])
            expect(positions.length).toEqual(26)
        })
    })

    describe('illegal moves', () => {
        test('overriding a filled square', () => {
            const step = new Nonupo.PlaceStep(buildGrid({ 1: Nonupo.Number.One }), Nonupo.Number.Five, new Nonupo.D10())
    
            expect(() => step.placeNumber(1)).toThrow(Nonupo.Exception)
            expect(step.grid[1]).toEqual(Nonupo.Number.One)
        })
    
        test('placing operators adjacent to one another', () => {
            const step = new Nonupo.PlaceStep(buildGrid({ 7: Nonupo.Operator.Plus }), Nonupo.Number.Five, new Nonupo.D10())
    
            expect(() => step.placeOperator(1, Nonupo.Operator.Plus)).toThrow(Nonupo.Exception)
            expect(step.grid[1]).toEqual(Nonupo.Empty)
    
            expect(() => step.placeOperator(6, Nonupo.Operator.Minus)).toThrow(Nonupo.Exception)
            expect(step.grid[6]).toEqual(Nonupo.Empty)
    
            expect(() => step.placeOperator(8, Nonupo.Operator.Plus)).toThrow(Nonupo.Exception)
            expect(step.grid[8]).toEqual(Nonupo.Empty)
    
            expect(() => step.placeOperator(13, Nonupo.Operator.Minus)).toThrow(Nonupo.Exception)
            expect(step.grid[13]).toEqual(Nonupo.Empty)
        })
    })
})
