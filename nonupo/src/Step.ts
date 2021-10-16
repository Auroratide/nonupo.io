import Grid from './Grid'
import { History } from './History'
import { PlayerOrdinal } from './PlayerOrdinal'

export abstract class Step {
    readonly grid: Grid
    readonly history: History

    constructor(grid: Grid, history: History) {
        this.grid = grid
        this.history = history
    }

    get currentPlayer(): PlayerOrdinal {
        return Math.floor(this.history.length / 2) % 2 === 0
            ? PlayerOrdinal.first
            : PlayerOrdinal.second
    }
}
