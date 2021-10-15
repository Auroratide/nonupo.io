import { Router } from 'express'
import type { Player } from './types'
import { isPlayer } from './types'
import { verifyTicket } from '../tickets'
import { BadRequestError, NotFoundError } from '../errors'
import { GameStore } from './store'

type CreateGameRequest = {
    players: {
        first?: Player,
        second?: Player,
    }
}

// Use an in-memory object for simplicity for now
// obviously, this does not scale
export const db = new GameStore()

export const games = Router()
    .post('/', verifyTicket, (req, res) => {
        const body: CreateGameRequest = req.body

        const badFields = []
        if (body.players?.first && !isPlayer(body.players?.first)) {
            badFields.push('players.first')
        }

        if (body.players?.second && !isPlayer(body.players?.second)) {
            badFields.push('players.second')
        }

        if (badFields.length > 0) {
            throw new BadRequestError(badFields)
        }

        const id = db.create(body.players?.first, body.players?.second)

        res
            .header('Location', `/games/${id}`)
            .status(201)
            .send()
    })
    .get('/:id', (req, res) => {
        const id = req.params.id
        const game = db.get(id)

        if (game) {
            res.status(200).json(game)
        } else {
            throw new NotFoundError(`/games/${id}`)
        }
    })