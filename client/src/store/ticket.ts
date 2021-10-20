import { readable } from 'svelte/store'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { FetchTicketApi } from '@/api/tickets/fetch'

type JwtTicket = JwtPayload & {
    id: string,
}

export type Ticket = {
    token: string,
    id: string,
}

export const key = 'ticket'

const ticketFromToken = (token: string): Ticket => ({
    token,
    id: (jwtDecode(token) as JwtTicket).id,
})

export const ticket = readable<Ticket>(null, (set) => {
    const fromStorage = localStorage.getItem(key)
    if (fromStorage) {
        set(ticketFromToken(fromStorage))
    } else {
        new FetchTicketApi(fetch.bind(window))
            .refresh()
            .then(res => {
                localStorage.setItem(key, res.ticket)
                set(ticketFromToken(res.ticket))
            })
    }

    return () => {}
})
