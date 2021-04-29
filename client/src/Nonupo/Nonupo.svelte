<script lang="ts">
    const squares = [...Array(36).keys()]
</script>

<div class="grid">
    {#each squares as _}
        <div class="square"></div>
    {/each}
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