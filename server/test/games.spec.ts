import { app } from '../src/server'
import { Player, TestServer } from './test-server'
import * as request from 'supertest'

describe('games', () => {
    let server: TestServer

    beforeEach(() => {
        server = TestServer.start(app)
    })

    afterEach(() => server.close())

    const createDefaultGame = (player: Player) => player.request()
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

    describe('creating a game', () => {
        it('with a human player', async () => {
            const player = await server.newPlayer()

            await createDefaultGame(player)
                .expect('Location', /^\/games\/[a-zA-Z]+$/)
        })
    })

    describe('getting a game', () => {
        it('does not exist', async () => {
            const player = await server.newPlayer()

            await player.request()
                .get('/games/doesnotexist')
                .set('Accept', 'application/json')
                .expect(404)
        })

        it('recently created', async () => {
            const player = await server.newPlayer()

            const response = await createDefaultGame(player)
            const location = response.headers.location
            
            await player.request()
                .get(location)
                .set('Accept', 'application/json')
                .expect(200)
        })
    })
})