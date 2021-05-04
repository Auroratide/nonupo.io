<script lang="ts">
    import { onMount } from 'svelte'
    import { chunk } from '@/extensions/array'
    import * as Nonupo from '@auroratide/nonupo'
    import PencilGrid from './PencilGrid.svelte'

    let gridVisible = false

    onMount(() => {
        setTimeout(() => gridVisible = true, 1)
    })

    const game = new Nonupo.NewGame(Array(36).fill(''), new Nonupo.D10())
    let step: Nonupo.PlaceStep = game.start().roll()

    let currentSelection = ''

    const squareSelection = (position: number) => () => {
        if (currentSelection === 'n') {
            step = step.placeNumber(position).roll()
        } else if (currentSelection !== '') {
            step = step.placeOperator(position, currentSelection as Nonupo.Operator).roll()
        } else {
            console.warn('No option was selected!')
        }

        currentSelection = ''
    }
</script>

<div class="grid-container">
    <table class="grid">
        {#each chunk(step.grid, 6) as row, i}
            <tr>
                {#each row as n, j}
                    <td title="Square {6 * i + j}" class="square" on:click={squareSelection(6 * i + j)}>{n}</td>
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
<fieldset class="options">
    <legend>Grid Options</legend>
    <label for="option-number">{step.num}</label>
    <input type="radio" id="option-number" name="options" bind:group={currentSelection} value="n" />
    <label for="option-plus">+</label>
    <input type="radio" id="option-plus" name="options" bind:group={currentSelection} value="+" />
    <label for="option-minus">-</label>
    <input type="radio" id="option-minus" name="options" bind:group={currentSelection} value="-" />
</fieldset>

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
            flex: 1;
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
        pointer-events: none;
    }
</style>