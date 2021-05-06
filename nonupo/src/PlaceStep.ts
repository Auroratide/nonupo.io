import { D10 } from './D10'
import { Exception } from './Exception'
import { Number, Operator, GridValue, Empty } from './GridValue'
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
        if (this.positionAdjacentTo(position, Operator)) {
            throw new Exception(`ILLEGAL MOVE: Attempted to fill position ${position} with operator ${op}, but it would be adjacent to another operator`)
        }

        return this.place(position, op)
    }

    validPlacementsFor: (en: object) => number[] = (en) => {
        if (en === Number) {
            return this.grid
                .map((v, i) => v === Empty ? i : -1)
                .filter(v => v >= 0)
        } else {
            return this.grid
                .map((v, i) => {
                    return v !== Empty || [i - 6, i - 1, i + 1, i + 6]
                        .filter(p => 0 <= p && p <= 36)
                        .some(p => Object.values(en).some(v => v === this.grid[p])) ? -1 : i
                })
                .filter(v => v >= 0)
        }
    }

    private place(position: number, value: GridValue): RollStep {
        if (this.grid[position] !== Empty) {
            throw new Exception(`ILLEGAL MOVE: Attempted to fill position ${position} with ${value}, but it already has ${this.grid[position]}`)
        }

        const newGrid = [...this.grid]
        newGrid[position] = value
        return new RollStep(newGrid, this.d10)
    }

    private positionAdjacentTo: (position: number, type: object) => boolean = (position, type) => {
        return [position - 6, position - 1, position + 1, position + 6]
            .filter(p => 0 <= p && p <= 36)
            .some(p => Object.values(type).some(v => v === this.grid[p]))
    }
}