import type { GameResponse } from './types'

export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}
