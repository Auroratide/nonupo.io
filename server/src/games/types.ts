import * as Nonupo from '@auroratide/nonupo'

export type Player = {
    id: string,
    type: 'human' | 'ai',
    name: string,
}

export const isPlayer = (v: any): v is Player =>
    (v && v.id && v.type && v.name &&
    typeof(v.id) === 'string' &&
    (v.type === 'human' || v.type === 'ai') &&
    typeof(v.name) === 'string') ?? false

export type Step = string

// export type Game = {
//     id: string,
//     players: {
//         first?: Player,
//         second?: Player,
//     },
//     steps: Step[],
//     game: Nonupo.Step,
// }

export class Game {
    readonly id: string
    private _step: Nonupo.Step
    get step(): Nonupo.Step { return this._step }
    readonly players: {
        first?: Player,
        second?: Player,
    }

    constructor(id: string, step: Nonupo.Step, players: {
        first?: Player,
        second?: Player,
    }) {
        this.id = id
        this._step = step
        this.players = players
    }

    advance = <T extends Nonupo.Step, R extends Nonupo.Step>(action: (step: T) => R): R => {
        const nextStep = action(this._step as T)
        this._step = nextStep

        return nextStep
    }
}