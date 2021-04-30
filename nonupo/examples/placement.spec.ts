import * as Nonupo from '../src'

describe('placement', () => {
    test('placing the number', () => {
        const step = new Nonupo.PlaceStep(Array(36).fill(''), Nonupo.Number.Five, new Nonupo.D10())

        const nextStep = step.placeNumber(3)

        expect(nextStep.grid[3]).toEqual(Nonupo.Number.Five)
    })

    test('placing operators', () => {
        const step = new Nonupo.PlaceStep(Array(36).fill(''), Nonupo.Number.Five, new Nonupo.D10())

        const nextStep = step.placeOperator(4, Nonupo.Operator.Plus)

        expect(nextStep.grid[4]).toEqual(Nonupo.Operator.Plus)
    })
})
