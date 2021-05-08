<script lang="ts">
    import { draw } from 'svelte/transition'
    import { linear } from 'svelte/easing'
    export let active: boolean

    const p = 20   // padding
    const w = 1200 // width
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="-{w / 2 + p} -{w / 2 + p} {w + 2 * p} {w + 2 * p}">
    {#if active}
        <path transition:draw={{ easing: linear, duration: 200 }} class="highlight" d="
            M 350 -300
            C -200 -275, -400 -25, -425 275
            C -200 25, 0 -125, 450 75
            C 100 175, -150 450, -200 475
        " />
    {/if}
</svg>

<style lang="scss">
    svg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: -1;
    }

    .highlight {
        fill: none;
        stroke: var(--skin-color-highlight);
        stroke-width: 500;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
</style>