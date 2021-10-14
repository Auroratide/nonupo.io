import type { Express } from 'express'
import type { Server } from 'http'

export class TestServer {
    readonly server: Server
    readonly port: number

    private constructor(server: Server, port: number) {
        this.server = server
        this.port = port
    }

    close() {
        this.server.close()
    }

    static start(app: Express): TestServer {
        const port = Math.floor(Math.random() * 50000 + 10000)
        return new TestServer(app.listen(port, () => {}), port)
    }
}