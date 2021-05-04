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
})
