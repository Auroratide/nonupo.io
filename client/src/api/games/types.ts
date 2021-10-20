export type PlayerResponse = {
    id: string,
    type: 'human' | 'ai',
    name: string,
}

export type GameResponse = {
    id: string,
    players: {
        first?: PlayerResponse,
        second?: PlayerResponse,
    },
    history: string[],
}
