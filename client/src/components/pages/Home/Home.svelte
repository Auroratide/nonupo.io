<script lang="ts">
    import { playerName } from '@/store/player-name'
    import { FetchGamesApi } from '@/api/games/fetch'
    import { ticket } from '@/store/ticket'

    // This property is needed to test redirection
    export let goTo: (url: string | URL) => void = window.location.assign.bind(window.location)
    
    // The greybox allows tests to watch for asynchronous completion
    export let greybox: {
        createGameRequest?: Promise<any>
    } = {}
        
    $: api = new FetchGamesApi(fetch.bind(window), $ticket)

    const createGame = () => {
        greybox.createGameRequest = api.create($playerName).then(location => goTo(location))
    }
</script>

<h1>Home</h1>
<p>Your name is {$playerName}</p>
{#if $ticket != null}
    <button on:click={createGame}>Create Game</button>
{/if}