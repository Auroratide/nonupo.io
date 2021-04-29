import { component } from '.'
import { screen } from '@testing-library/svelte'
import TestComponent from './TestComponent.svelte'

describe('component builder', () => {
    test('no props', () => {
        component(TestComponent).render()

        expect(screen.getByText('Hello, Aurora')).toBeInTheDocument()
    })

    test('has props', () => {
        component(TestComponent)
            .prop('name', 'Eventide')
            .render()

        expect(screen.getByText('Hello, Eventide')).toBeInTheDocument()
    })

    describe('slots', () => {
        test('for some text', () => {
            component(TestComponent)
                .slot('Some text')
                .render()
    
            expect(screen.getByText('Some text')).toBeInTheDocument()
        })

        test('for an element', () => {
            const paragraph = document.createElement('p')
            paragraph.innerHTML = 'Some text'
    
            component(TestComponent)
                .slot(paragraph)
                .render()
    
            expect(screen.getByText('Some text')).toBeInTheDocument()
        })
    })
})