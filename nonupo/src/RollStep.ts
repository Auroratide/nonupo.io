import { D10 } from "./D10";
import Grid from './Grid'
import { PlaceStep } from "./PlaceStep";
import { Step } from "./Step";
import { History } from './History'
import type { Action } from './Action'

export class RollAction implements Action {
    private num: Grid.Number
    constructor(num: Grid.Number) {
        this.num = num
    }

    get notation(): string {
        return this.num.toString()
    }

    play(grid: Grid, history: History, d10: D10): PlaceStep {
        return new PlaceStep(grid, history.add(this), this.num, d10)
    }
}

export class RollStep extends Step {
    private d10: D10
    constructor(grid: Grid, history: History, d10: D10) {
        super(grid, history)
        this.d10 = d10
    }

    roll: () => PlaceStep = () => {
        return new RollAction(this.d10.roll()).play(this.grid, this.history, this.d10)
    }
}