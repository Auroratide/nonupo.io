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

    test('illegal to override a filled square', () => {
        const step = new Nonupo.PlaceStep(buildGrid({ 1: Nonupo.Number.One }), Nonupo.Number.Five, new Nonupo.D10())

        expect(() => step.placeNumber(1)).toThrow(Nonupo.Exception)
        expect(step.grid[1]).toEqual(Nonupo.Number.One)
    })

    test('illegal to place operators adjacent to one another', () => {
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
