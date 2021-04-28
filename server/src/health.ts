import { Router } from 'express'

export const health = Router()
    .get('/', (_req, res) => {
        res.status(200).json({})
    })