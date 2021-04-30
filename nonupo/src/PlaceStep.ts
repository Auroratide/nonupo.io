import { Number, Operator, GridValue } from './GridValue'

export class PlaceStep {
    readonly grid: GridValue[]
    readonly num: Number
    constructor(grid: GridValue[], num: Number) {
        this.grid = grid
        this.num = num
    }

    placeNumber(position: number): PlaceStep {
        return this.place(position, this.num)
    }

    placeOperator(position: number, op: Operator): PlaceStep {
        return this.place(position, op)
    }

    private place(position: number, value: GridValue): PlaceStep {
        const newGrid = [...this.grid]
        newGrid[position] = value
        return new PlaceStep(newGrid, this.num)
    }
}