import { D10 } from "./D10";
import Grid from './Grid'
import { RollStep } from "./RollStep";

export class NewGame {
    readonly grid: Grid
    private d10: D10
    constructor(grid: Grid = new Grid(), d10: D10 = new D10()) {
        this.grid = grid
        this.d10 = d10
    }

    start: () => RollStep = () => {
        return new RollStep(this.grid, this.d10)
    }
}