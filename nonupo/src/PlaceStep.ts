import { D10 } from './D10'
import { Number, Operator, GridValue } from './GridValue'
import { RollStep } from './RollStep'

export class PlaceStep {
    readonly grid: GridValue[]
    readonly num: Number
    private d10: D10
    constructor(grid: GridValue[], num: Number, d10: D10) {
        this.grid = grid
        this.num = num
        this.d10 = d10
    }

    placeNumber(position: number): RollStep {
        return this.place(position, this.num)
    }

    placeOperator(position: number, op: Operator): RollStep {
        return this.place(position, op)
    }

    private place(position: number, value: GridValue): RollStep {
        const newGrid = [...this.grid]
        newGrid[position] = value
        return new RollStep(newGrid, this.d10)
    }
}