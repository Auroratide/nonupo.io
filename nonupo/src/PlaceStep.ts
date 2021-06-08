import { D10 } from './D10'
import Grid from './Grid'
import { RollStep } from './RollStep'
import { Step } from './Step'

export class PlaceStep implements Step {
    readonly grid: Grid
    readonly num: Grid.Number
    private d10: D10
    constructor(grid: Grid, num: Grid.Number, d10: D10) {
        this.grid = grid
        this.num = num
        this.d10 = d10
    }

    placeNumber(position: number): RollStep {
        return new RollStep(this.grid.place(position, this.num), this.d10)
    }

    placeOperator(position: number, op: Grid.Operator): RollStep {
        return new RollStep(this.grid.place(position, op), this.d10)
    }

    validPlacementsFor: (en: Grid.Placeable) => number[] = (en) => {
        return this.grid.values
            .map((_, p) => en.canPlaceIn(this.grid, p) ? p : -1)
            .filter(p => p >= 0)
    }
}