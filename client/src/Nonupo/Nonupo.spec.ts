import { Nonupo } from '.'
import { component } from '@/testing/component'

describe('Nonupo', () => {
    test('rendering', () => {
        expect(() => component(Nonupo)
            .render()
        ).not.toThrow()
    })
})
