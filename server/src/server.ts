import * as path from 'path'
import * as express from 'express'
import { health } from './health'
import { tickets } from './tickets'
import { games } from './games'
import { errorHandler } from './errors'
import type { GameStore } from './games/store'

export const app = (db: GameStore) => {
    const app = express()

    const client = (...p: string[]) => path.resolve(__dirname, '..', '..', 'client', 'public', ...p)

    app.use(express.json())

    app.use(express.static(client()));

    app.use('/api', express.Router()
        .use('/health', health)
        .use('/tickets', tickets)
        .use('/games', games(db))
    )

    app.use(errorHandler)
    app.get('*', (req, res) => {
        res.sendFile(client('index.html'));
    })

    return app
}
