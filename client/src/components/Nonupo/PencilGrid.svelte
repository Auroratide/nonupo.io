<script lang="ts">
    import { draw } from 'svelte/transition'

    const p = 20   // padding
    const w = 1200 // width

    const l0 = p
    const l1 = w / 6 + p
    const l2 = w / 3 + p
    const l3 = w / 2 + p
    const l4 = 2 * w / 3 + p
    const l5 = 5 * w / 6 + p
    const l6 = w + p
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w + 2 * p} {w + 2 * p}" height="auto">
    <filter x="0" y="0" width="100%" height="100%" id="pencil-line">
        <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 0 0
            0 0 0 -1.5 1.5
        " />
        <feComposite operator="in" in="SourceGraphic" result="composite" />
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" />
        <feDisplacementMap in="composite" xChannelSelector="R" yChannelSelector="G" scale="2.5" />
    </filter>
    <g style="--stroke-width: {0.6 * p}">
        <rect width="{w + 2 * p}" height="{w + 2 * p}" />
        <line x1="{l0}" y1="{p}" x2="{l0}" y2="{w + p}" in:draw />
        <line x1="{l1}" y1="{p}" x2="{l1}" y2="{w + p}" in:draw />
        <line x1="{l2}" y1="{p}" x2="{l2}" y2="{w + p}" in:draw />
        <line x1="{l3}" y1="{p}" x2="{l3}" y2="{w + p}" in:draw />
        <line x1="{l4}" y1="{p}" x2="{l4}" y2="{w + p}" in:draw />
        <line x1="{l5}" y1="{p}" x2="{l5}" y2="{w + p}" in:draw />
        <line x1="{l6}" y1="{p}" x2="{l6}" y2="{w + p}" in:draw />

        <line x1="{p}" y1="{l0}" x2="{w + p}" y2="{l0}" in:draw />
        <line x1="{p}" y1="{l1}" x2="{w + p}" y2="{l1}" in:draw />
        <line x1="{p}" y1="{l2}" x2="{w + p}" y2="{l2}" in:draw />
        <line x1="{p}" y1="{l3}" x2="{w + p}" y2="{l3}" in:draw />
        <line x1="{p}" y1="{l4}" x2="{w + p}" y2="{l4}" in:draw />
        <line x1="{p}" y1="{l5}" x2="{w + p}" y2="{l5}" in:draw />
        <line x1="{p}" y1="{l6}" x2="{w + p}" y2="{l6}" in:draw />
    </g>
</svg>

<style>
    g {
        filter: url(#pencil-line);
    }

    rect {
        fill: none;
        stroke: none;
    }

    line {
        stroke: #333333;
        stroke-width: var(--stroke-width);
        stroke-linecap: round;
    }
</style>
