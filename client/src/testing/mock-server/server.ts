import type { GameResponse } from '@/api/games/types'

const blobify = (obj: object): Blob => new Blob([new TextEncoder().encode(JSON.stringify(obj))], {
    type: "application/json;charset=utf-8"
})

export class Server {
    private games: Record<string, GameResponse>

    constructor(games: Record<string, GameResponse>) {
        this.games = games
    }

    call(input: RequestInfo, init?: RequestInit): Response {
        const url = typeof input === 'string' ? input : input.url
        let match: RegExpMatchArray = null
        if (match = url.match(/^\/api\/games\/(.*)$/)) {
            const id = match[1]
            return this.get(id)
        }

        return new Response(new Blob(), {
            status: 404,
        })
    }

    private get(id: string): Response {
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
}