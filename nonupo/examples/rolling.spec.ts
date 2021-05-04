import { single } from './generators'
import * as Nonupo from '../src'
import { buildGrid } from './grid-builder'

describe('rolling', () => {
    test('rolling a number', () => {
        const step = new Nonupo.RollStep(buildGrid(), new Nonupo.D10(single(4)))

        const nextStep = step.roll()

        expect(nextStep.num).toEqual(Nonupo.Number.Four)
    })
})
