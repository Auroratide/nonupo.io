import { buildGrid } from '.'
import { Grid } from '../../src'

describe('grid builder', () => {
    test('empty', () => {
        const grid = buildGrid()

        expect(grid.values.length).toBeGreaterThan(0)
        grid.values.forEach(value => {
            expect(value).toEqual(Grid.Empty)
        })
    })

    test('values specified', () => {
        const grid = buildGrid({
            0: Grid.Number.Five,
            10: Grid.Operator.Minus,
        })

        expect(grid.values[0]).toEqual(Grid.Number.Five)
        expect(grid.values[10]).toEqual(Grid.Operator.Minus)
    })
})