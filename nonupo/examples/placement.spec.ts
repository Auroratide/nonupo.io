import * as Nonupo from '../src'

describe('placement', () => {
    test('works', () => {
        const step = new Nonupo.PlaceStep(Array(36).fill(''))

        const nextStep = step.place(3)

        expect(nextStep.grid[3]).toEqual(Nonupo.Number.Five)
    })
})
