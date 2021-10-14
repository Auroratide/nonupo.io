import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import * as verifyJwt from 'express-jwt'
import { nanoid } from 'nanoid'

const secret = 'secret'

export type Ticket = {
    id: string
}

export const verifyTicket = verifyJwt({ secret: secret, algorithms: ['HS256'] })

export const tickets = Router()
    .post('/', (req, res) => {
        res.status(201).json({
            ticket: jwt.sign({
                id: nanoid()
            }, secret)
        })
    })
    .post('/verifications', verifyTicket, (req, res) => {
        res.status(204).send()
    })