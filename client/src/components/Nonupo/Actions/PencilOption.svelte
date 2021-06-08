<script lang="ts">
    import type * as Nonupo from '@auroratide/nonupo'
    import Highlight from '../Highlight.svelte'

    export let currentSelection: string
    export let value: Nonupo.Grid.Placeable
    export let id: string

    const p = 20   // padding
    const w = 1200 // width

    let hovering = false
    let checked = false
    $: valueStr = (value ?? '').toString()
    $: checked = currentSelection === valueStr

    const onHover = () => hovering = true
    const offHover = () => hovering = false
</script>

<div class="container" on:mouseover={onHover} on:mouseout={offHover}>
    <input type="radio" {id} name="options" bind:group={currentSelection} value={valueStr} />
    <label for={id}>{valueStr}</label>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-{w / 2 + p} -{w / 2 + p} {w + 2 * p} {w + 2 * p}">
        <path class="line" d="
            M -282 -400
            Q 153 -750 449 -398
            A 600 600 0 1 1 -566 -199
            Q -350 -650 100 -500
        " />
    </svg>
    <Highlight active={hovering || checked} />
</div>

<style lang="scss">
    .container {
        display: inline-block;
        position: relative;
        width: 1em;
        height: 1em;
        line-height: 1;
    }

    input:checked + label {
        color: red;
    }

    input {
        display: none;
    }

    label {
        display: inline-block;
        width: 1em;
        height: 1em;
        border-radius: 1em;
        cursor: pointer;
    }

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
        z-index: -1;
    }

    .line {
        fill: none;
        stroke: var(--skin-color-fg);
        stroke-width: 60;
        stroke-linecap: round;
    }
</style>