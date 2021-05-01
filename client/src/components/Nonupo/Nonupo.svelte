<script lang="ts">
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

<div class="grid">
    {#each step.grid as n, i}
        <div title="Square {i}" class="square" on:click={squareSelection(i)}>{n}</div>
    {/each}
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
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(6, 1fr);
        width: 80vmin;
        height: 80vmin;
        gap: 0.5em;
    }

    .square {
        width: 100%;
        height: 100%;
        background: #eeeeee;
    }
</style>