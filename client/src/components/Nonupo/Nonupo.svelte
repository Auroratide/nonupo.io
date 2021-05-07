<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'
    import { Grid } from './Grid'
    import { Actions } from './Actions'
    import type { SelectSquareEvent } from './events'

    const game = new Nonupo.NewGame()
    let step: Nonupo.PlaceStep = game.start().roll()

    let currentSelection: string = null
    let currentPlaceable: Nonupo.Grid.Placeable = null
    $: {
        if (currentSelection === step.num.toString())
            currentPlaceable = step.num
        else if (currentSelection === Nonupo.Grid.Operator.Plus.toString())
            currentPlaceable = Nonupo.Grid.Operator.Plus
        else if (currentSelection === Nonupo.Grid.Operator.Minus.toString())
            currentPlaceable = Nonupo.Grid.Operator.Minus
        else
            currentPlaceable = null
    }

    const squareSelection = (e: CustomEvent<SelectSquareEvent>) => {
        if (currentPlaceable instanceof Nonupo.Grid.Number)
            step = step.placeNumber(e.detail.square).roll()
        else if (currentPlaceable instanceof Nonupo.Grid.Operator)
            step = step.placeOperator(e.detail.square, currentPlaceable).roll()
        else
            console.warn('No option was selected!')

        currentSelection = null
    }
</script>

<Grid {step} on:selectsquare={squareSelection} />
<Actions {step} bind:currentSelection />
