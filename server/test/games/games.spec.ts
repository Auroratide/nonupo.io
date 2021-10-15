import { app } from '../../src/server'
import { Player, TestServer } from '../test-server'

describe('games', () => {
    let server: TestServer

    beforeEach(() => {
        server = TestServer.start(app)
    })

    afterEach(() => server.close())

    const createPlayer = (id: string | null, name: string | null, type: 'human' | 'ai' | null = 'human') => ({
        id, name, type,
    })

    const createDefaultGame = (player: Player) => player.request()
        .post('/games')
        .send({
            players: {
                first: createPlayer(player.id, 'Aurora'),
            },
        })
        .expect(201)

    describe('creating a game', () => {
        it('with a human player', async () => {
            const player = await server.newPlayer()

            await createDefaultGame(player)
                .expect('Location', /^\/games\/[a-zA-Z]+$/)
        })

        it('with player as going second', async () => {
            const player = await server.newPlayer()

            await player.request()
                .post('/games')
                .send({
                    players: {
                        second: createPlayer(player.id, 'Aurora'),
                    },
                })
                .expect(201)
        })

        it('with both players', async () => {
            const player1 = await server.newPlayer()
            const player2 = await server.newPlayer()

            await player1.request()
                .post('/games')
                .send({
                    players: {
                        first: createPlayer(player1.id, 'Aurora'),
                        second: createPlayer(player2.id, 'Eventide'),
                    },
                })
                .expect(201)
        })

        describe('invalid requests', () => {
            it('missing id', async () => {
                const player = await server.newPlayer()

                await player.request()
                    .post('/games')
                    .send({
                        players: {
                            second: createPlayer(null, 'Aurora'),
                        },
                    })
                    .expect(400)
            })

            it('missing name', async () => {
                const player = await server.newPlayer()

                await player.request()
                    .post('/games')
                    .send({
                        players: {
                            second: createPlayer(player.id, null),
                        },
                    })
                    .expect(400)
            })

            it('missing type', async () => {
                const player = await server.newPlayer()

                await player.request()
                    .post('/games')
                    .send({
                        players: {
                            second: createPlayer(player.id, 'Aurora', null),
                        },
                    })
                    .expect(400)
            })
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