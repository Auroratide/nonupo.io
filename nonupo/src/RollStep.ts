import { D10 } from "./D10";
import { GridValue } from "./GridValue";
import { PlaceStep } from "./PlaceStep";

export class RollStep {
    readonly grid: GridValue[]
    private d10: D10
    constructor(grid: GridValue[], d10: D10) {
        this.grid = grid
        this.d10 = d10
    }

    roll: () => PlaceStep = () => {
        return new PlaceStep(this.grid, this.d10.roll(), this.d10)
    }
}