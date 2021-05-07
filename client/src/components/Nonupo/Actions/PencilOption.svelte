<script lang="ts">
    import type * as Nonupo from '@auroratide/nonupo'
    import { draw } from 'svelte/transition'
    import { linear } from 'svelte/easing'

    export let currentSelection: string
    export let value: Nonupo.Grid.Placeable
    export let id: string


    const p = 20   // padding
    const w = 1200 // width

    let highlight = false

    const onHover = () => highlight = true
    const offHover = () => highlight = false
</script>

<div class="container" on:mouseover={onHover} on:mouseout={offHover}>
    <input type="radio" {id} name="options" bind:group={currentSelection} value={value.toString()} />
    <label for={id}>{value}</label>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-{w / 2 + p} -{w / 2 + p} {w + 2 * p} {w + 2 * p}">
        {#if highlight}
            <path transition:draw={{ easing: linear, duration: 200 }} class="highlight" d="
                M 350 -300
                C -200 -275, -400 -25, -425 275
                C -200 25, 0 -125, 450 75
                C 100 175, -150 450, -200 475
            " />
        {/if}
        <path class="line" d="
            M -282 -400
            Q 153 -750 449 -398
            A 600 600 0 1 1 -566 -199
            Q -350 -650 100 -500
        " />
    </svg>
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
    }

    .line {
        fill: none;
        stroke: var(--skin-color-fg);
        stroke-width: 60;
        stroke-linecap: round;
    }

    .highlight {
        fill: none;
        stroke: rgba(240, 0, 0, 0.25);
        stroke-width: 500;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>