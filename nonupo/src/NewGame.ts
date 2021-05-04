import { D10 } from "./D10";
import { GridValue, Empty } from "./GridValue";
import { RollStep } from "./RollStep";

export class NewGame {
    readonly grid: GridValue[]
    private d10: D10
    constructor(grid: GridValue[] = Array(36).fill(Empty), d10: D10 = new D10()) {
        this.grid = grid
        this.d10 = d10
    }

    start: () => RollStep = () => {
        return new RollStep(this.grid, this.d10)
    }
}