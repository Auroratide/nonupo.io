<script lang="ts">
    import { NotFoundError } from '@/api/games/errors'
    import { FetchGamesApi } from '@/api/games/fetch'

    export let api = new FetchGamesApi(fetch.bind(window))
    export let id: string

    let game = api.get(id)
</script>

<h1>Game</h1>
{#await game}
    <p>Waiting for game</p>
{:then game}
    <p>{game.players.first.name}</p>
    <p>{game.players.second.name}</p>
{:catch err}
    {#if err instanceof NotFoundError}
        <p>This game doesn't exist.</p>
    {:else}
        <p>Hmm, something horrible happened.</p>
    {/if}
{/await}
