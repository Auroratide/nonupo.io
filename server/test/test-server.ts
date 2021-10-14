import type { Express } from 'express'
import type { Server } from 'http'
import type { SuperTest, Test } from 'supertest'
import * as request from 'supertest'

export class TestServer {
    readonly server: Server
    readonly port: number

    private constructor(server: Server, port: number) {
        this.server = server
        this.port = port
    }

    async newPlayer(): Promise<Player> {
        const response = await request(this.server)
            .post('/tickets')
            .expect(201)
        
        const { body: { ticket } } = response

        return new Player(this, ticket)
    }

    close() {
        this.server.close()
    }

    static start(app: Express): TestServer {
        const port = Math.floor(Math.random() * 50000 + 10000)
        return new TestServer(app.listen(port, () => {}), port)
    }
}

export class Player {
    private server: TestServer
    readonly ticket: string

    constructor(server: TestServer, ticket: string) {
        this.server = server
        this.ticket = ticket
    }

    request(): PlayerRequest {
        return new PlayerRequest(this, request(this.server.server))
    }
}

export class PlayerRequest {
    private player: Player
    private req: SuperTest<Test>

    constructor(player: Player, req: SuperTest<Test>) {
        this.player = player
        this.req = req
    }

    post(url: string): Test {
        return this.req
            .post(url)
            .auth(this.player.ticket, { type: 'bearer' })
    }
}
