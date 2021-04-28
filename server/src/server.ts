import * as path from 'path'
import * as express from 'express'
import { health } from './health'

const app = express()
const port = 3000
const client = (...p: string[]) => path.resolve(__dirname, '..', '..', 'client', 'public', ...p)

app.use(express.static(client()));

app.use('/health', health)
app.get('/', (req, res) => {
    res.sendFile(client('index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
