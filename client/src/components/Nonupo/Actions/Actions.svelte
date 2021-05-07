<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'
    import PencilOption from './PencilOption.svelte'

    export let step: Nonupo.PlaceStep
    export let currentSelection: string
</script>

<fieldset class="options">
    <legend>Grid Options</legend>
    <PencilOption id="option-number" value={step.num} bind:currentSelection />
    <PencilOption id="option-plus" value={Nonupo.Grid.Operator.Plus} bind:currentSelection />
    <PencilOption id="option-minus" value={Nonupo.Grid.Operator.Minus} bind:currentSelection />
</fieldset>

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