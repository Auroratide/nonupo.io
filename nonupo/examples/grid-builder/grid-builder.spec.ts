import { buildGrid } from '.'
import { Number, Operator, Empty } from '../../src/GridValue'

describe('grid builder', () => {
    test('empty', () => {
        const grid = buildGrid()

        expect(grid.length).toBeGreaterThan(0)
        grid.forEach(value => {
            expect(value).toEqual(Empty)
        })
    })

    test('values specified', () => {
        const grid = buildGrid({
            0: Number.Five,
            10: Operator.Minus,
        })

        expect(grid[0]).toEqual(Number.Five)
        expect(grid[10]).toEqual(Operator.Minus)
    })
})