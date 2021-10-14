import * as path from 'path'
import * as express from 'express'
import { health } from './health'
import { tickets } from './tickets'

export const app = express()

const client = (...p: string[]) => path.resolve(__dirname, '..', '..', 'client', 'public', ...p)

app.use(express.static(client()));

app.use('/health', health)
app.use('/tickets', tickets)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send()
    }
})
app.get('/', (req, res) => {
    res.sendFile(client('index.html'));
})
