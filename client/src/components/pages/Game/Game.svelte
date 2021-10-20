<script lang="ts">
    import { NotFoundError } from '@/api/games/errors'
    import { FetchGamesApi } from '@/api/games/fetch'
    import { ticket } from '@/store/ticket'

    export let id: string
    let api = new FetchGamesApi(fetch.bind(window), $ticket)
    $: api = new FetchGamesApi(fetch.bind(window), $ticket)

    let game = api.get(id)
</script>

<h1>Game</h1>
{#await game}
    <p>Waiting for game</p>
{:then game}
    {#if game.players.first && game.players.second}
        <p>{game.players.first?.name}</p>
        <p>{game.players.second?.name}</p>
    {:else}
        <p>Room name</p>
        <p>{game.id}</p>
        <p>Waiting for other player...</p>
    {/if}
{:catch err}
    {#if err instanceof NotFoundError}
        <p>This game doesn't exist.</p>
    {:else}
        <p>Hmm, something horrible happened.</p>
    {/if}
{/await}
