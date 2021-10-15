import { app } from './server'
import { GameStore } from './games/store'

// Use an in-memory object for simplicity for now
// obviously, this does not scale
export const db = new GameStore()

const port = 3000

app(db).listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})