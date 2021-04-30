<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'

    const game = new Nonupo.NewGame(Array(36).fill(''), new Nonupo.D10())
    let step: Nonupo.PlaceStep = game.start().roll()

    const squareSelection = (position: number) => (e: MouseEvent) => {
        step = step.placeNumber(position).roll()
    }
</script>

<div class="grid">
    {#each step.grid as n, i}
        <div title="Square {i}" class="square" on:click={squareSelection(i)}>{n}</div>
    {/each}
</div>
<div class="options">
    <button title="Number">{step.num}</button>
</div>

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