<script lang="ts">
    export let title: string
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<h1 class="title">{title}</h1>

<style lang="scss">
    .title {
        text-align: center;
    }
</style>