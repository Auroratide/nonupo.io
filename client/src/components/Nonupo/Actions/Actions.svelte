<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'
    import PencilOption from './PencilOption.svelte'

    export let step: Nonupo.Step
    export let currentSelection: string

    $: num = step instanceof Nonupo.PlaceStep ? step.num : null

    const roll = () => {
        if (step instanceof Nonupo.RollStep) {
            step = step.roll()
        } else {
            console.warn('WARNING: Attempted to roll when not in roll step')
        }
    }
</script>

<div class="actions">
    <button on:click={roll} disabled={!(step instanceof Nonupo.RollStep)}>Roll</button>
    <fieldset class="options" disabled={!(step instanceof Nonupo.PlaceStep)}>
        <legend>Grid Options</legend>
        <PencilOption id="option-number" value={num} bind:currentSelection />
        <PencilOption id="option-plus" value={Nonupo.Grid.Operator.Plus} bind:currentSelection />
        <PencilOption id="option-minus" value={Nonupo.Grid.Operator.Minus} bind:currentSelection />
    </fieldset>
</div>

<style lang="scss">
    .options {
        border: none;
        text-align: center;
        font-size: 3em;

        legend {
            display: none;
        }
    }
</style>