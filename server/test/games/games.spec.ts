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

    const createDefaultGame = (player: Player, second?: Player) => player.request()
        .post('/games')
        .send({
            players: {
                first: createPlayer(player.id, 'Aurora'),
                second: second ? createPlayer(second.id, 'Second') : undefined
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

    describe('rolling the die', () => {
        it('authorized player', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const response = await createDefaultGame(aurora, eventide)
            const location = response.headers.location

            // Make a roll
            const rollResponse = await aurora.request()
                .post(`${location}/rolls`)
                .expect(201)
            const { body: { roll } } = rollResponse

            expect(Number(roll)).toBeGreaterThanOrEqual(0)
            expect(Number(roll)).toBeLessThanOrEqual(9)

            // Verify the game's state is updated
            const gameResponse = await aurora.request()
                .get(location)
                .expect(200)
            const { body: game } = gameResponse

            expect(game.history).toEqual([roll])
        })

        it.skip('wrong player', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const response = await createDefaultGame(aurora, eventide)
            const location = response.headers.location

            // not Eventide's turn
            await eventide.request()
                .post(`${location}/rolls`)
                .expect(403) // we recognize Eventide, but he is forbidden from rolling
        })

        it('not time to roll', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const response = await createDefaultGame(aurora, eventide)
            const location = response.headers.location

            // Make a roll
            await aurora.request()
                .post(`${location}/rolls`)
                .expect(201)

            // A placement is expected, not another roll
            await aurora.request()
                .post(`${location}/rolls`)
                .expect(403)
        })
    })
})