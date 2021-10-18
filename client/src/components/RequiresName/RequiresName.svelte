<script lang="ts">
    import { playerName } from '@/store/player-name'

    export let id: string = 'player-name-input'
    
    let value: string = ''

    const submit = () => $playerName = value
</script>

{#if $playerName.length === 0}
    <label for={id}>What's your name?</label>
    <input {id} type="text" bind:value />
    <button on:click={submit}>Submit</button>
{/if}
<slot></slot>