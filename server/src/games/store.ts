import * as Nonupo from '@auroratide/nonupo'
import type { Player } from './types'
import { Game } from './types'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16)

export class GameStore {
    private games: Record<string, Game>

    constructor(games: Record<string, Game> = {}) {
        this.games = games
    }

    create(first?: Player, second?: Player): string {
        const id = nanoid()

        this.games[id] = new Game(id, new Nonupo.NewGame().start(), { first, second })

        return id
    }

    get(id: string): Game | null {
        return this.games[id] ?? null
    }
}