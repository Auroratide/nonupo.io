import { buildGrid } from './grid-builder'
import { Grid, Exception } from '../src'

describe('Grid', () => {
    describe('Number', () => {
        test('placement in empty squares', () => {
            const grid = buildGrid()

            grid.place(0, Grid.Number.One)
            grid.place(10, Grid.Number.Two)

            expect(grid.values[0]).toEqual(Grid.Number.One)
            expect(grid.values[10]).toEqual(Grid.Number.Two)
        })

        test('placement in occupied squares', () => {
            const grid = buildGrid({
                0: Grid.Number.One,
                10: Grid.Operator.Plus,
            })

            expect(() => grid.place(0, Grid.Number.Three)).toThrow(Exception)
            expect(() => grid.place(10, Grid.Number.Four)).toThrow(Exception)

            expect(grid.values[0]).toEqual(Grid.Number.One)
            expect(grid.values[10]).toEqual(Grid.Operator.Plus)
        })
    })

    describe('Operator', () => {
        test('placement in empty squares', () => {
            const grid = buildGrid()

            grid.place(0, Grid.Operator.Plus)
            grid.place(10, Grid.Operator.Minus)

            expect(grid.values[0]).toEqual(Grid.Operator.Plus)
            expect(grid.values[10]).toEqual(Grid.Operator.Minus)
        })

        test('placement in occupied squares', () => {
            const grid = buildGrid({
                0: Grid.Number.One,
                10: Grid.Operator.Plus,
            })

            expect(() => grid.place(0, Grid.Operator.Plus)).toThrow(Exception)
            expect(() => grid.place(10, Grid.Operator.Minus)).toThrow(Exception)

            expect(grid.values[0]).toEqual(Grid.Number.One)
            expect(grid.values[10]).toEqual(Grid.Operator.Plus)
        })

        test('placement in squares adjacent to numbers', () => {
            const grid = buildGrid({
                10: Grid.Number.One,
            })

            grid.place(4, Grid.Operator.Plus)
            grid.place(9, Grid.Operator.Minus)
            grid.place(11, Grid.Operator.Plus)
            grid.place(16, Grid.Operator.Minus)

            expect(grid.values[4]).toEqual(Grid.Operator.Plus)
            expect(grid.values[9]).toEqual(Grid.Operator.Minus)
            expect(grid.values[11]).toEqual(Grid.Operator.Plus)
            expect(grid.values[16]).toEqual(Grid.Operator.Minus)
        })

        test('placement in squares adjacent to other operators', () => {
            const grid = buildGrid({
                10: Grid.Operator.Plus,
            })

            expect(() => grid.place(4, Grid.Operator.Plus)).toThrow(Exception)
            expect(() => grid.place(9, Grid.Operator.Minus)).toThrow(Exception)
            expect(() => grid.place(11, Grid.Operator.Plus)).toThrow(Exception)
            expect(() => grid.place(16, Grid.Operator.Minus)).toThrow(Exception)

            expect(grid.values[4]).toEqual(Grid.Empty)
            expect(grid.values[9]).toEqual(Grid.Empty)
            expect(grid.values[11]).toEqual(Grid.Empty)
            expect(grid.values[16]).toEqual(Grid.Empty)
        })

        test('placement in squares along the left or right edges', () => {
            const grid = buildGrid({
                6: Grid.Operator.Plus,
                17: Grid.Operator.Minus,
            })

            expect(() => grid.place(0, Grid.Operator.Plus)).toThrow(Exception)
            expect(() => grid.place(5, Grid.Operator.Minus)).not.toThrow()
            expect(() => grid.place(7, Grid.Operator.Plus)).toThrow(Exception)
            expect(() => grid.place(12, Grid.Operator.Minus)).toThrow(Exception)

            expect(() => grid.place(11, Grid.Operator.Plus)).toThrow(Exception)
            expect(() => grid.place(16, Grid.Operator.Minus)).toThrow(Exception)
            expect(() => grid.place(18, Grid.Operator.Plus)).not.toThrow()
            expect(() => grid.place(23, Grid.Operator.Minus)).toThrow(Exception)

            expect(grid.values[5]).toEqual(Grid.Operator.Minus)
            expect(grid.values[18]).toEqual(Grid.Operator.Plus)
        })
    })
})