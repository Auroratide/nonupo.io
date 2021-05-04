<script lang="ts">
    import type * as Nonupo from '@auroratide/nonupo'

    export let step: Nonupo.PlaceStep
    export let currentSelection: string
</script>

<fieldset class="options">
    <legend>Grid Options</legend>
    <label for="option-number">{step.num}</label>
    <input type="radio" id="option-number" name="options" bind:group={currentSelection} value="n" />
    <label for="option-plus">+</label>
    <input type="radio" id="option-plus" name="options" bind:group={currentSelection} value="+" />
    <label for="option-minus">-</label>
    <input type="radio" id="option-minus" name="options" bind:group={currentSelection} value="-" />
</fieldset>