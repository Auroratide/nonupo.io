import { Router } from 'express'
import { customAlphabet } from 'nanoid'
import type { Ticket } from './tickets'
import { verifyTicket } from './tickets'
import { NotFoundError } from './errors'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 16)

type Player = {
    type: 'human' | 'ai',
    id: string,
    name: string,
}

type Step = string

type Game = {
    id: string,
    players: {
        first?: Player,
        second?: Player,
    },
    steps: Step[],
}

type CreateGameRequest = {
    players: {
        first?: Player,
        second?: Player,
    }
}

// Use an in-memory object for simplicity for now
// obviously, this does not scale
export const db: Record<string, Game> = {}

export const games = Router()
    .post('/', verifyTicket, (req, res) => {
        const id = nanoid()
        const ticket = req.user as Ticket
        const body: CreateGameRequest = req.body
        body.players.first!.id = ticket.id

        db[id] = {
            id,
            players: body.players,
            steps: [],
        }

        res
            .header('Location', `/games/${id}`)
            .status(201)
            .send()
    })
    .get('/:id', (req, res) => {
        const id = req.params.id
        const game = db[id]

        if (game) {
            res.status(200).json(game)
        } else {
            throw new NotFoundError(`/games/${id}`)
        }
    })