import { Router } from 'express'
import * as jwt from 'jsonwebtoken'
import * as verifyJwt from 'express-jwt'
import { nanoid } from 'nanoid'

const secret = 'secret'

export const tickets = Router()
    .post('/', (req, res) => {
        res.status(201).json({
            ticket: jwt.sign({
                id: nanoid()
            }, secret)
        })
    })
    .post('/verifications', verifyJwt({ secret: secret, algorithms: ['HS256'] }), (req, res) => {
        res.status(204).send()
    })