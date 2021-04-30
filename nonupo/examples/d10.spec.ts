import * as seedrandom from 'seedrandom'
import { cyclic, single } from './generators'
import * as Nonupo from '../src'

describe('d10', () => {
    const nonupoNumbers: Nonupo.Number[] = Object.values(Nonupo.Number)
    const manyRolls = (d10: Nonupo.D10) => [...Array(50).keys()].map(d10.roll)

    const canReturnAllPossibleValues = (d10: Nonupo.D10) => {
        test('can return all possible values', () => {
            const values = manyRolls(d10)
    
            nonupoNumbers.forEach(n => expect(values).toContain(n))
            values.forEach(n => expect(nonupoNumbers).toContain(n))
        })
    }

    describe('random generator', () => {
        canReturnAllPossibleValues(new Nonupo.D10(seedrandom('fixed seed')))
    })

    describe('cyclic generator', () => {
        canReturnAllPossibleValues(new Nonupo.D10(cyclic([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])))
    })

    describe('single generator', () => {
        test('returns same value each call', () => {
            const d10 = new Nonupo.D10(single(3))
            const values = manyRolls(d10)
    
            values.forEach(n => expect(n).toEqual(Nonupo.Number.Three))
        })
    })
})