import { D10 } from "./D10";
import Grid from './Grid'
import { RollStep } from "./RollStep";
import { History } from './History'

export class NewGame {
    readonly grid: Grid
    readonly history: History
    private d10: D10
    constructor(grid: Grid = new Grid(), history: History = new History(), d10: D10 = new D10()) {
        this.grid = grid
        this.history = history
        this.d10 = d10
    }

    start: () => RollStep = () => {
        return new RollStep(this.grid, this.history, this.d10)
    }
}