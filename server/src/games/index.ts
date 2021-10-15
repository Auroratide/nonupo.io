import { Router } from 'express'
import type { Ticket } from '../tickets'
import type { Player } from './types'
import { verifyTicket } from '../tickets'
import { NotFoundError } from '../errors'
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
        const ticket = req.user as Ticket
        const body: CreateGameRequest = req.body
        body.players.first!.id = ticket.id
        const id = db.create(body.players.first)

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