import * as Nonupo from '@auroratide/nonupo'
import { app } from '../../src/server'
import { Player, TestServer } from '../test-server'
import { GameStore } from '../../src/games/store'
import { Game } from '../../src/games/types'
import { Player as DataPlayer } from '../../src/games/types'

describe('games', () => {
    let db: GameStore
    let server: TestServer

    beforeEach(() => {
        db = new GameStore()
        server = TestServer.start(app(db))
    })

    afterEach(() => server.close())

    const createPlayer = (id: string | null, name: string | null, type: 'human' | 'ai' | null = 'human') => ({
        id, name, type,
    })

    const playerFromTestServer = (p: Player): DataPlayer => ({
        id: p.id,
        name: p.id,
        type: 'human',
    })

    const createDefaultGame = (player: Player, second?: Player) => player.request()
        .post('/games')
        .send({
            players: {
                first: playerFromTestServer(player),
                second: second ? playerFromTestServer(second) : undefined
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

    describe('adding a player', () => {
        it('game missing a player', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const response = await createDefaultGame(aurora)
            const location = response.headers.location

            await aurora.request()
                .post(`${location}/players`)
                .send({
                    second: playerFromTestServer(eventide),
                })
                .expect(201)

            // Verify the game's state is updated
            const gameResponse = await aurora.request()
                .get(location)
                .set('Accept', 'application/json')
                .expect(200)
            const { body: game } = gameResponse

            expect(game.players.first).toEqual(playerFromTestServer(aurora))
            expect(game.players.second).toEqual(playerFromTestServer(eventide))
        })

        it('adding a player to a position that is already filled', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const response = await createDefaultGame(aurora)
            const location = response.headers.location

            await aurora.request()
                .post(`${location}/players`)
                .send({
                    first: playerFromTestServer(eventide), // already filled
                })
                .expect(400)
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

        it('wrong player', async () => {
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

        it('not all players are added yet', async () => {
            const aurora = await server.newPlayer()

            const response = await createDefaultGame(aurora)
            const location = response.headers.location

            await aurora.request()
                .post(`${location}/rolls`)
                .expect(403)
        })
    })

    describe('placement', () => {
        const gameOnPlaceStep = (p1: Player, p2: Player) => new Game('someid', Nonupo.History.fromNotation(['5']).replay(), {
            first: playerFromTestServer(p1),
            second: playerFromTestServer(p2),
        })

        it('authorized player', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const game = gameOnPlaceStep(aurora, eventide)
            db.save(game)

            // Place a number
            await aurora.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: '#',
                    position: 3,
                })
                .expect(201)

            // Ensure history has updated
            const response = await aurora.request()
                .get(`/games/${game.id}`)
                .set('Accept', 'application/json')
                .expect(200)
            const { body: { history } } = response

            expect(history).toEqual(['5', '#@3'])
        })

        it('missing option', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const game = gameOnPlaceStep(aurora, eventide)
            db.save(game)

            await aurora.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    position: 3,
                })
                .expect(400)
        })

        it('missing position', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const game = gameOnPlaceStep(aurora, eventide)
            db.save(game)

            await aurora.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: '#',
                })
                .expect(400)
        })

        it('invalid option', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const game = gameOnPlaceStep(aurora, eventide)
            db.save(game)

            await aurora.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: 'g',
                    position: 3,
                })
                .expect(400)
        })

        it('nonnumeric position', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const game = gameOnPlaceStep(aurora, eventide)
            db.save(game)

            await aurora.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: '+',
                    position: '3',
                })
                .expect(400)
        })

        it('occupied position', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            // The 0th position has a 5
            const game = new Game('someid', Nonupo.History.fromNotation(['5', '#@0', '3']).replay(), {
                first: playerFromTestServer(aurora),
                second: playerFromTestServer(eventide),
            })
            db.save(game)

            await eventide.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: '+',
                    position: 0,
                })
                .expect(400)
        })

        it('not time to place', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            // Eventide should roll first
            const game = new Game('someid', Nonupo.History.fromNotation(['5', '#@0']).replay(), {
                first: playerFromTestServer(aurora),
                second: playerFromTestServer(eventide),
            })
            db.save(game)

            await eventide.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: '+',
                    position: 0,
                })
                .expect(403)
        })

        it('wrong player', async () => {
            const aurora = await server.newPlayer()
            const eventide = await server.newPlayer()

            const game = gameOnPlaceStep(aurora, eventide)
            db.save(game)

            // not Eventide's turn
            await eventide.request()
                .post(`/games/${game.id}/placements`)
                .send({
                    option: '+',
                    position: 0,
                })
                .expect(403)
        })

        it('not all players are added yet', async () => {
            const aurora = await server.newPlayer()

            const response = await createDefaultGame(aurora)
            const location = response.headers.location

            await aurora.request()
                .post(`${location}/placements`)
                .expect(403)
        })
    })
})