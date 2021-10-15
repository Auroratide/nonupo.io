import Grid from './Grid'
import { History } from './History'

export interface Step {
    readonly grid: Grid
    readonly history: History
}
