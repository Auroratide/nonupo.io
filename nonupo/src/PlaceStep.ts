import { D10 } from './D10'
import Grid from './Grid'
import { RollStep } from './RollStep'
import { Step } from './Step'
import type { History } from './History'
import type { Action } from './Action'

export class PlaceAction implements Action {
    private option: Grid.Placeable
    private position: number
    constructor(option: Grid.Placeable, position: number) {
        this.option = option
        this.position = position
    }

    get notation(): string {
        return `${this.option instanceof Grid.Number ? '#' : this.option.toString()}@${this.position}`
    }

    play(grid: Grid, history: History, d10: D10): RollStep {
        return new RollStep(grid.place(this.position, this.option), history.add(this), d10)
    }
}

export class PlaceStep extends Step {
    readonly num: Grid.Number
    private d10: D10
    constructor(grid: Grid, history: History, num: Grid.Number, d10: D10) {
        super(grid, history)
        this.num = num
        this.d10 = d10
    }

    placeNumber(position: number): RollStep {
        return new PlaceAction(this.num, position)
            .play(this.grid, this.history, this.d10)
    }

    placeOperator(position: number, op: Grid.Operator): RollStep {
        return new PlaceAction(op, position)
            .play(this.grid, this.history, this.d10)
    }

    validPlacementsFor: (en: Grid.Placeable) => number[] = (en) => {
        return this.grid.values
            .map((_, p) => en.canPlaceIn(this.grid, p) ? p : -1)
            .filter(p => p >= 0)
    }
}