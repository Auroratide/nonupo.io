import { app } from '../src/server'
import { TestServer } from './test-server'
import * as request from 'supertest'

describe('tickets', () => {
    let server: TestServer

    beforeEach(() => {
        server = TestServer.start(app())
    })

    afterEach(() => server.close())

    it('issuing a ticket', async () => {
        const first = await request(server.server)
            .post('/tickets')
            .expect(201)
        const second = await request(server.server)
            .post('/tickets')
            .expect(201)

        const { body: { ticket: firstTicket } } = first
        const { body: { ticket: secondTicket } } = second

        expect(firstTicket).not.toEqual(secondTicket)
    })

    it('authorized', async () => {
        const response = await request(server.server)
            .post('/tickets')
            .expect(201)
        
        const { body: { ticket } } = response

        await request(server.server)
            .post('/tickets/verifications')
            .auth(ticket, { type: 'bearer' })
            .expect(204)
    })

    it('not authorized', async () => {
        await request(server.server)
            .post('/tickets/verifications')
            .expect(401)

        await request(server.server)
            .post('/tickets/verifications')
            .auth('some.invalid.jwt', { type: 'bearer' })
            .expect(401)
    })
})