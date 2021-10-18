import { RequiresName } from '.'
import { get } from 'svelte/store'
import { component } from '@/testing/component'
import { playerName } from '@/store/player-name'
import { screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'

describe('RequiresName', () => {
    test('name already exists', () => {
        playerName.set('Aurora')

        component(RequiresName).render()

        expect(screen.queryByLabelText(/name/)).not.toBeInTheDocument()
    })

    test('name does not exist', async () => {
        playerName.set('')

        component(RequiresName).render()

        await userEvent.type(screen.getByLabelText(/name/i), 'Aurora')
        await userEvent.click(screen.getByText(/submit/i))

        expect(screen.queryByLabelText(/name/)).not.toBeInTheDocument()
        expect(get(playerName)).toEqual('Aurora')
    })
})