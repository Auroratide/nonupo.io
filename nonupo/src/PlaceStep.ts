import { Number, GridValue } from './GridValue'

export class PlaceStep {
    readonly grid: GridValue[]
    readonly num: Number
    constructor(grid: GridValue[], num: Number) {
        this.grid = grid
        this.num = num
    }

    place(position: number): PlaceStep {
        const newGrid = [...this.grid]
        newGrid[position] = this.num
        return new PlaceStep(newGrid, this.num)
    }
}