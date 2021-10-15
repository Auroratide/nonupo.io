import { Router } from 'express'
import type { Game, Player } from './types'
import { isPlayer } from './types'
import { verifyTicket } from '../tickets'
import { BadRequestError, ForbiddenError, NotFoundError } from '../errors'
import * as Nonupo from '@auroratide/nonupo'
import { GameStore } from './store'

type CreateGameRequest = {
    players: {
        first?: Player,
        second?: Player,
    }
}

type GetGameResponse = {
    id: string,
    players: {
        first?: Player,
        second?: Player,
    },
    history: string[],
}
const createGetGameResponse = (game: Game): GetGameResponse => ({
    id: game.id,
    players: game.players,
    history: game.step.history.asNotation(),
})

// Use an in-memory object for simplicity for now
// obviously, this does not scale
export const db = new GameStore()

export const games = () => {
    return Router()
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
                res.status(200).json(createGetGameResponse(game))
            } else {
                throw new NotFoundError(`/games/${id}`)
            }
        })
        .post('/:id/rolls', verifyTicket, (req, res) => {
            const id = req.params.id
            const game = db.get(id)
            if (!game) {
                throw new NotFoundError(`/games/${id}`)
            }

            if (game.step instanceof Nonupo.RollStep) {
                const nextStep = game.advance(step => (step as Nonupo.RollStep).roll())

                res.status(201).json({
                    roll: nextStep.num.toString()
                })
            } else {
                throw new ForbiddenError('Cannot perform a roll when a placement is expected.')
            }



            // get the game
            // determine if right player's turn
            // determine if right time to play
            // perform roll step
            // return result
            // store into the db

            /*
            const game = db.get(id)
            const step = Nonupo.FromHistory(game.steps).start()
            if (step instanceof RollStep) {
                const nextStep = step.roll()
                res.status(201).json({
                    roll: step.num.value
                })
            }
            */
        })
}
