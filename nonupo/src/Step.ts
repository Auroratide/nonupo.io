import Grid from './Grid'
import { History } from './History'

export abstract class Step {
    readonly grid: Grid
    readonly history: History

    constructor(grid: Grid, history: History) {
        this.grid = grid
        this.history = history
    }
}
