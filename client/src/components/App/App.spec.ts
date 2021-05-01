import App from './App.svelte'
import { component } from '@/testing/component'

describe('App', () => {
    test('rendering', () => {
        expect(() => component(App)
            .render()
        ).not.toThrow()
    })
})