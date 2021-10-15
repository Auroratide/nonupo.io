export class BadRequestError extends Error {
    get name() { return 'BadRequestError' }
    constructor(fields: string[]) {
        super(`Bad request. Errors at: ${fields.join()}`)
    }
}

export class NotFoundError extends Error {
    get name() { return 'NotFoundError' }
    constructor(resource: string) {
        super(`Could not find resource: ${resource}`)
    }
}