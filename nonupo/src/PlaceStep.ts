import { Number, GridValue } from './GridValue'

export class PlaceStep {
    readonly grid: GridValue[]
    constructor(grid: GridValue[]) {
        this.grid = grid
    }

    place(position: number): PlaceStep {
        const newGrid = [...this.grid]
        newGrid[position] = Number.Five
        return new PlaceStep(newGrid)
    }
}