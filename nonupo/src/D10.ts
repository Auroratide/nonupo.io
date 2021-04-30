import * as seedrandom from 'seedrandom'
import { Number } from "./GridValue"

export class D10 {
    private generator: () => number // [0, 1]
    private values: Number[] = Object.values(Number)
    constructor(generator: () => number = seedrandom()) {
        this.generator = generator
    }

    roll: () => Number = () => {
        return this.values[Math.floor(this.generator() * 10)]
    }
}
