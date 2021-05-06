<script lang="ts">
    const p = 20   // padding
    const w = 1200 // width
</script>

<div class="container">
    <slot></slot>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-{w / 2 + p} -{w / 2 + p} {w + 2 * p} {w + 2 * p}">
        <circle cx="0" cy="0" r="{w / 2}" />
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

    svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
    }

    circle {
        fill: none;
        stroke: var(--skin-color-fg);
        stroke-width: 60;
    }
</style>