export type Player = {
    type: 'human' | 'ai',
    id: string,
    name: string,
}

export type Step = string

export type Game = {
    id: string,
    players: {
        first?: Player,
        second?: Player,
    },
    steps: Step[],
}