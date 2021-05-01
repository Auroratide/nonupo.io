<script lang="ts">
    import { chunk } from '@/extensions/array'
    import * as Nonupo from '@auroratide/nonupo'

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

<table class="grid">
    {#each chunk(step.grid, 6) as row, i}
        <tr>
            {#each row as n, j}
                <td title="Square {6 * i + j}" class="square" on:click={squareSelection(6 * i + j)}>{n}</td>
            {/each}
        </tr>
    {/each}
</table>
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
        width: 66vmin;
        height: 66vmin;
        margin: auto;

        tr {
            flex: 1;
            margin-bottom: 0.5em;
            display: flex;
            flex-direction: row;
        }

        .square {
            flex: 1;
            margin-right: 0.5em;
            background: #eeeeee;
        }
    }
</style>