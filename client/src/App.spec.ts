import App from './App.svelte'
import { screen, render } from '@testing-library/svelte'

describe('App', () => {
    test('rendering', () => {
        render(App, { name: 'World' })

        expect(screen.queryByText('Hello World!')).toBeInTheDocument()
    })
})
