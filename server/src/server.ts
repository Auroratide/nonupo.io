import * as path from 'path'
import * as express from 'express'
import { health } from './health'
import { tickets } from './tickets'
import { games } from './games'

export const app = express()

const client = (...p: string[]) => path.resolve(__dirname, '..', '..', 'client', 'public', ...p)

app.use(express.json())

app.use(express.static(client()));

app.use('/health', health)
app.use('/tickets', tickets)
app.use('/games', games)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send()
    } else if (err.name === 'NotFoundError') {
        res.status(404).send()
    } else {
        console.error(err)
        res.status(500).send()
    }
})
app.get('/', (req, res) => {
    res.sendFile(client('index.html'));
})
