import { chunk } from '.'

describe('array extensions', () => {
    describe('chunk', () => {
        test('empty array', () => {
            expect(chunk([], 2)).toEqual([])
        })

        test('divisible sizes', () => {
            const arr = [1, 2, 3, 4, 5, 6]

            expect(chunk(arr, 1)).toEqual([[1], [2], [3], [4], [5], [6]])
            expect(chunk(arr, 2)).toEqual([[1, 2], [3, 4], [5, 6]])
            expect(chunk(arr, 3)).toEqual([[1, 2, 3], [4, 5, 6]])
            expect(chunk(arr, 6)).toEqual([[1, 2, 3, 4, 5, 6]])
        })

        test('indivisible sizes', () => {
            const arr = [1, 2, 3, 4, 5, 6]

            expect(chunk(arr, 4)).toEqual([[1, 2, 3, 4], [5, 6]])
            expect(chunk(arr, 5)).toEqual([[1, 2, 3, 4, 5], [6]])
        })

        test('size larger than array length', () => {
            const arr = [1, 2, 3, 4, 5, 6]

            expect(chunk(arr, 7)).toEqual([[1, 2, 3, 4, 5, 6]])
        })

        test('invalid chunk size', () => {
            expect(() => chunk([], 0)).toThrow()
            expect(() => chunk([], -1)).toThrow()
        })
    })
})