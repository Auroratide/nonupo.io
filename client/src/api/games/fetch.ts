import { NotFoundError } from './errors'
import type { GameResponse } from './types';

export class FetchGamesApi {
    private fetch: (input: RequestInfo) => Promise<Response>

    constructor(fetch: (input: RequestInfo) => Promise<Response>) {
        this.fetch = fetch
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
}