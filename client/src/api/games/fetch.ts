import { NotFoundError } from './errors'
import type { Ticket } from '@/store/ticket'
import type { GameResponse } from './types'

export class FetchGamesApi {
    private fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
    private ticket: Ticket | null

    constructor(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>, ticket: Ticket | null) {
        this.fetch = fetch
        this.ticket = ticket
    }

    private get auth(): string {
        return `Bearer ${this.ticket.token}`
    }

    get(id: string): Promise<GameResponse> {
        return this.fetch(`/api/games/${id}`)
            .catch(() => {
                throw new Error(`Error getting game with id ${id}`)
            })
            .then((res: Response) => {
                if (res.ok) {
                    return res.json()
                }

                if (res.status === 404) {
                    throw new NotFoundError(`Could not find game with id ${id}`)
                } else {
                    throw new Error(`Error getting game with id ${id}`)
                }
            })
    }

    create(name: string): Promise<string> {
        if (this.ticket == null) {
            return Promise.reject(new Error('Cannot create game without a ticket'))
        }

        return this.fetch('/api/games', {
            method: 'POST',
            headers: {
                Authorization: this.auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                players: {
                    first: {
                        id: this.ticket.id,
                        type: 'human',
                        name: name,
                    },
                },
            })
        }).catch(() => {
            throw new Error('Error creating game')
        }).then((res: Response) => {
            if (res.ok) {
                return res.headers.get('Location').match(/\/api(.*)/)[1]
            } else {
                throw new Error('Error creating game')
            }
        })
    }
}