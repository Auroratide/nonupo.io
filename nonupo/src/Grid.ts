import { Exception } from './Exception'

class Grid {
    readonly width: number
    readonly values: Grid.Square[]
    constructor(width: number = 6) {
        this.width = width
        this.values = Array(width * width).fill(Grid.Empty)
    }

    place: (position: number, value: Grid.Placeable) => Grid = (position, value) => {
        if (!value.canPlaceIn(this, position)) {
            throw new Exception(`ILLEGAL MOVE: Attempted to fill position ${position} with ${value}`)
        }

        this.values[position] = value
        return this
    }
}

module Grid {
    export interface Placeable {
        toString: () => string
        canPlaceIn: (grid: Grid, position: number) => boolean
    }

    export class Operator implements Placeable {
        private value: string
        private constructor(value: string) {
            this.value = value
        }

        toString: () => string = () => this.value
        canPlaceIn: (grid: Grid, position: number) => boolean = (grid, position) =>
            grid.values[position] === Grid.Empty &&
            [position - grid.width, position - 1, position + 1, position + grid.width]
                .filter(p => 0 <= p && p < grid.width * grid.width)
                .every(p => !(grid.values[p] instanceof Operator))

        static Plus = new Operator('+')
        static Minus = new Operator('-')
    }

    export class Number implements Placeable {
        private value: number
        private constructor(value: number) {
            this.value = value
        }

        toString: () => string = () => this.value.toString()
        canPlaceIn: (grid: Grid, position: number) => boolean = (grid, position) =>
            grid.values[position] === Grid.Empty

        static Zero = new Number(0)
        static One = new Number(1)
        static Two = new Number(2)
        static Three = new Number(3)
        static Four = new Number(4)
        static Five = new Number(5)
        static Six = new Number(6)
        static Seven = new Number(7)
        static Eight = new Number(8)
        static Nine = new Number(9)
    }

    export const Empty = ''

    export type Square = typeof Empty | Placeable
}

export default Grid