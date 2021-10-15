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

export type Game = {
    id: string,
    players: {
        first?: Player,
        second?: Player,
    },
    steps: Step[],
}