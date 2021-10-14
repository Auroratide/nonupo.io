import { app } from '../src/server'
import { TestServer } from './test-server'
import * as request from 'supertest'

describe('games', () => {
    let server: TestServer

    beforeEach(() => {
        server = TestServer.start(app)
    })

    afterEach(() => server.close())

    describe('creating a game', () => {
        it('with a human player', async () => {
            const player = await server.newPlayer()

            await player.request()
                .post('/games')
                .send({
                    players: {
                        first: {
                            type: 'human',
                            name: 'Aurora',
                        },
                    },
                })
                .expect(201)
                .expect('Location', /^\/games\/[a-zA-Z]+$/)
        })
    })
})