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

export class Game<TStep extends Nonupo.Step> {
    readonly id: string
    private _step: TStep
    get step(): TStep { return this._step }
    readonly players: {
        first?: Player,
        second?: Player,
    }

    constructor(id: string, step: TStep, players: {
        first?: Player,
        second?: Player,
    }) {
        this.id = id
        this._step = step
        this.players = players
    }

    isReady = (): boolean => {
        return this.players.first != null && this.players.second != null
    }

    isRollStep(): this is Game<Nonupo.RollStep> {
        return this._step instanceof Nonupo.RollStep
    }

    isPlaceStep(): this is Game<Nonupo.PlaceStep> {
        return this._step instanceof Nonupo.PlaceStep
    }

    advance = <R extends Nonupo.Step>(action: (step: TStep) => R): Game<R> => {
        return new Game(this.id, action(this._step), this.players)
    }

    addPlayer = (p: Nonupo.PlayerOrdinal, player: Player): Game<TStep> => {
        if (this.players[p])
            throw new Error(`Cannot add ${player.name} to position ${p} since it is already filled.`)
        
        return new Game(this.id, this.step, Object.assign({}, this.players, { [p]: player }))
    }
}