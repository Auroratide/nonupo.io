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
class CreateGameRequestValidator {
    validate(o: any): CreateGameRequest {
        const badFields: string[] = []

        if (o?.players == null)
            badFields.push('players')

        if (o?.players?.first && !isPlayer(o?.players?.first))
            badFields.push('players.first')

        if (o?.players?.second && !isPlayer(o?.players?.second))
            badFields.push('players.second')

        if (badFields.length === 0) {
            return o
        } else {
            throw new BadRequestError(badFields)
        }
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
const createGetGameResponse = (game: Game<Nonupo.Step>): GetGameResponse => ({
    id: game.id,
    players: game.players,
    history: game.step.history.asNotation(),
})

type CreatePlacementRequest = {
    option: '#' | '+' | '-',
    position: number,
}
class CreatePlacementRequestValidator {
    validate(o: any): CreatePlacementRequest {
        const badFields: string[] = []

        if (o?.option == null || !(o?.option === '#' || o?.option === '+' || o?.option === '-'))
            badFields.push('option')

        if (o?.position == null || typeof o?.position !== 'number')
            badFields.push('position')

        if (badFields.length === 0) {
            return o
        } else {
            throw new BadRequestError(badFields)
        }
    }
}

export const games = (db: GameStore) => {
    return Router()
        .post('/', verifyTicket, (req, res) => {
            const body = new CreateGameRequestValidator().validate(req.body)
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

            if (game.isRollStep()) {
                const advanced = game.advance(step => step.roll())

                db.save(advanced)

                res.status(201).json({
                    roll: advanced.step.num.toString()
                })
            } else {
                throw new ForbiddenError('Cannot perform a roll when a placement is expected.')
            }
        })
        .post('/:id/placements', verifyTicket, (req, res) => {
            const id = req.params.id
            const game = db.get(id)
            if (!game) {
                throw new NotFoundError(`/games/${id}`)
            }

            const body = new CreatePlacementRequestValidator().validate(req.body)

            if (game.isPlaceStep()) {
                const placeable = {
                    '#': game.step.num,
                    '+': Nonupo.Grid.Operator.Plus,
                    '-': Nonupo.Grid.Operator.Minus,
                }[body.option]
                if (!game.step.validPlacementsFor(placeable).includes(body.position)) {
                    throw new BadRequestError(['position'])
                }

                const advanced = game.advance(step => {
                    if (body.option === '#') {
                        return step.placeNumber(body.position)
                    } else {
                        return step.placeOperator(body.position, {
                            '+': Nonupo.Grid.Operator.Plus,
                            '-': Nonupo.Grid.Operator.Minus,
                        }[body.option])
                    }
                })

                db.save(advanced)

                res.status(201).send()
            } else {
                throw new ForbiddenError('Cannot perform a placement when a roll is expected.')
            }
        })
}
