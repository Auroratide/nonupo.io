import '@testing-library/jest-dom'
import { Server } from './mock-server/server'
import { games } from './mock-server/data'

beforeEach(() => {
    const server = new Server(games())
    window.fetch = async (input: RequestInfo, init?: RequestInit) => {
        return server.call(input, init)
    }
})
