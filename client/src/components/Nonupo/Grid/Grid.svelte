<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { chunk } from '@/extensions/array'
    import type * as Nonupo from '@auroratide/nonupo'
    import PencilGrid from './PencilGrid.svelte'
    import { selectSquare } from '../events'
    import Highlight from '../Highlight.svelte'

    export let step: Nonupo.PlaceStep
    export let currentPlaceable: Nonupo.Grid.Placeable = null
    $: validSquares = currentPlaceable ? step.validPlacementsFor(currentPlaceable) : []

    const dispatch = createEventDispatcher()

    let gridVisible = false
    onMount(() => {
        setTimeout(() => gridVisible = true, 1)
    })
</script>

<div class="grid-container">
    <table class="grid">
        {#each chunk(step.grid.values, 6) as row, i}
            <tr>
                {#each row as n, j}
                    <td
                        title="Square {6 * i + j}"
                        class="square"
                        on:click={() => selectSquare(dispatch, 6 * i + j)}
                    >
                        <Highlight active={validSquares.includes(6 * i + j)} />
                        <span>{n}</span>
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
    {#if gridVisible}
        <div class="pencil-grid">
            <PencilGrid />
        </div>
    {/if}
</div>

<style lang="scss">
    .grid {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        tr {
            flex: 1;
            display: flex;
            flex-direction: row;
        }

        .square {
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10vmin;
            line-height: 1;
        }
    }

    .grid-container {
        position: relative;
        width: 66vmin;
        height: 66vmin;
        margin: auto;
        padding: 1vmin;
    }

    .pencil-grid {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
    }
</style>
