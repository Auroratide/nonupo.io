export class PlaceStep {
    readonly grid: string[]
    constructor(grid: string[]) {
        this.grid = grid
    }

    place(position: number): PlaceStep {
        const newGrid = [...this.grid]
        newGrid[position] = '5'
        return new PlaceStep(newGrid)
    }
}