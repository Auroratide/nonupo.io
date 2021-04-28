import * as path from 'path'
import * as express from 'express'
import { health } from './health'

const app = express()
const port = 3000

app.use('/health', health)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'public', 'index.html'));
})

app.use(express.static(path.join(__dirname, '..', 'client', 'public')));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
