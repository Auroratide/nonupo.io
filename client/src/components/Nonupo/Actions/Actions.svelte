<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'

    export let step: Nonupo.PlaceStep
    export let currentSelection: string
</script>

<fieldset class="options">
    <legend>Grid Options</legend>
    <input type="radio" id="option-number" name="options" bind:group={currentSelection} value={step.num} />
    <label for="option-number">{step.num}</label>
    <input type="radio" id="option-plus" name="options" bind:group={currentSelection} value={Nonupo.Grid.Operator.Plus} />
    <label for="option-plus">+</label>
    <input type="radio" id="option-minus" name="options" bind:group={currentSelection} value={Nonupo.Grid.Operator.Minus} />
    <label for="option-minus">-</label>
</fieldset>

<style lang="scss">
    .options {
        border: none;
        text-align: center;
        font-size: 3em;

        legend {
            display: none;
        }

        input:checked + label {
            color: red;
        }

        input {
            display: none;
        }
    }
</style>