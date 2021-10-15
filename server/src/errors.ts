import * as express from 'express'

abstract class StatusError extends Error {
    abstract status: number
}

export class BadRequestError extends StatusError {
    get name() { return 'BadRequestError' }
    get status() { return 400 }
    constructor(fields: string[]) {
        super(`Bad request. Errors at: ${fields.join()}`)
    }
}

export class NotFoundError extends StatusError {
    get name() { return 'NotFoundError' }
    get status() { return 404 }
    constructor(resource: string) {
        super(`Could not find resource: ${resource}`)
    }
}

export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof StatusError) {
        res.status(err.status).send()
    } else if (err.name === 'UnauthorizedError') { // thrown by express-jwt
        res.status(401).send()
    } else {
        console.error(err)
        res.status(500).send()
    }
}