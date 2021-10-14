export class NotFoundError extends Error {
    get name() { return 'NotFoundError' }
    constructor(resource: string) {
        super(`Could not find resource: ${resource}`)
    }
}