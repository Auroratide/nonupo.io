import { render as svelteRender, RenderResult } from '@testing-library/svelte'
import { createSlot } from './slots'
import type { SvelteComponent } from 'svelte'

export class SvelteRenderBuilder {
    private _component: typeof SvelteComponent
    private _props: Record<string, any>
    private _slot?: Node[]

    constructor(component: typeof SvelteComponent) {
        this._component = component
        this._props = {}
        this._slot = null
    }

    prop(name: string, value: any): SvelteRenderBuilder {
        this._props = Object.assign({}, this._props, { [name]: value })
        return this
    }

    slot(element: Element)
    slot(elements: Element[])
    slot(text: string)

    slot(value: any): SvelteRenderBuilder {
        if (typeof value === typeof '') {
            this._slot = [ document.createTextNode(value) ]
        } else if (Array.isArray(value)) {
            this._slot = value
        } else if (value instanceof Element) {
            this._slot = [ value ]
        }

        return this
    }

    render(): RenderResult {
        return svelteRender(this._component, {
            props: this._slot !== null ? Object.assign({}, this._props, {
                $$scope: {},
                $$slots: createSlot({
                    default: this._slot
                })
            }) : this._props
        })
    }
}

export default (Component: typeof SvelteComponent) => new SvelteRenderBuilder(Component)