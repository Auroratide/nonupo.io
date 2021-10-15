import type Grid from './Grid'
import type { Step } from './Step'
import type { D10 } from './D10'
import type { History } from './History'

export interface Action {
    readonly notation: string
    play(grid: Grid, history: History, d10: D10): Step
}
