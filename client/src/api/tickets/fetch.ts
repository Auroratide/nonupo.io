import type { RefreshTicketResponse } from './types'

export class FetchTicketApi {
    private fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>

    constructor(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
        this.fetch = fetch
    }

    refresh = (): Promise<RefreshTicketResponse> => this.fetch('/api/tickets', {
        method: 'POST'
    })
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error('Error when getting a new ticket')
        }
    })
}
