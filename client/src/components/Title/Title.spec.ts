import { Title } from '.'
import { component } from '@/testing/component'
import { screen } from "@testing-library/svelte"

describe('Title', () => {
    test('rendering', () => {
        component(Title)
            .prop('title', 'my title')
            .render()

        expect(screen.queryByText('my title')).toBeInTheDocument()
    })
})
