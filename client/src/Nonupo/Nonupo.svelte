<script lang="ts">
    const squares = [...Array(36).keys()]

    let currentValue: string = ''

    const squareSelection = (e: MouseEvent) => {
        (e.target as HTMLElement).innerHTML = currentValue
    }
</script>

<div class="grid">
    {#each squares as i}
        <div title="Square {i}" class="square" on:click={squareSelection}></div>
    {/each}
</div>
<div class="options">
    <button on:click={() => currentValue = '5'}>5</button>
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