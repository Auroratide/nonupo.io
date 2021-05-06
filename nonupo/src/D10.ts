import * as seedrandom from 'seedrandom'
import Grid from './Grid'

export class D10 {
    private generator: () => number // [0, 1]
    private values: Grid.Number[] = Object.values(Grid.Number)
    constructor(generator: () => number = seedrandom()) {
        this.generator = generator
    }

    roll: () => Grid.Number = () => {
        return this.values[Math.floor(this.generator() * 10)]
    }
}
