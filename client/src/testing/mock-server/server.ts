import type { GameResponse } from '@/api/games/types'
import * as jwt from 'jsonwebtoken'
import { players } from './data'

const blobify = (obj: object): Blob => new Blob([new TextEncoder().encode(JSON.stringify(obj))], {
    type: "application/json;charset=utf-8"
})

export class Server {
    static SECRET = 'secret'

    private games: Record<string, GameResponse>

    constructor(games: Record<string, GameResponse>) {
        this.games = games
    }

    call(input: RequestInfo, init?: RequestInit): Response {
        const url = typeof input === 'string' ? input : input.url
        let match: RegExpMatchArray = null

        if (init?.method === 'POST' && (match = url.match(/^\/api\/tickets$/))) {
            return this.newTicket()
        }

        if (match = url.match(/^\/api\/games\/(.*)$/)) {
            const id = match[1]
            return this.getGame(id)
        }

        if (init?.method === 'POST' && (match = url.match(/^\/api\/games$/))) {
            return this.validateTicket(init) ?? this.newGame()
        }

        return new Response(blobify({
            message: `No route found for ${input}`
        }), {
            status: 404,
        })
    }

    private newTicket(): Response {
        // For now, always return Aurora's id
        const ticket = jwt.sign({ id: players().aurora.id }, Server.SECRET)
        return new Response(blobify({ ticket }), {
            status: 201,
        })
    }

    private validateTicket(init: RequestInit): Response | null {
        const match = init.headers['Authorization']?.match(/^Bearer (.*)$/)
        if (match && jwt.verify(match[1], Server.SECRET)) {
            return null
        } else {
            return new Response(new Blob(), {
                status: 403,
            })
        }
    }

    private getGame(id: string): Response {
        const game = this.games[id]

        if (game) {
            return new Response(blobify(game), {
                status: 200,
            })
        } else {
            return new Response(new Blob(), {
                status: 404,
            })
        }
    }

    private newGame(): Response {
        // For now, this always returns `newGame`
        const game = this.games.newGame
        return new Response(new Blob(), {
            status: 201,
            headers: {
                Location: `/api/games/${game.id}`
            }
        })
    }
}