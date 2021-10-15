import * as path from 'path'
import * as express from 'express'
import { health } from './health'
import { tickets } from './tickets'
import { games } from './games'
import { errorHandler } from './errors'

export const app = express()

const client = (...p: string[]) => path.resolve(__dirname, '..', '..', 'client', 'public', ...p)

app.use(express.json())

app.use(express.static(client()));

app.use('/health', health)
app.use('/tickets', tickets)
app.use('/games', games)
app.use(errorHandler)
app.get('/', (req, res) => {
    res.sendFile(client('index.html'));
})
