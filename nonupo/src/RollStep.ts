import { D10 } from "./D10";
import Grid from './Grid'
import { PlaceStep } from "./PlaceStep";

export class RollStep {
    readonly grid: Grid
    private d10: D10
    constructor(grid: Grid, d10: D10) {
        this.grid = grid
        this.d10 = d10
    }

    roll: () => PlaceStep = () => {
        return new PlaceStep(this.grid, this.d10.roll(), this.d10)
    }
}