<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'
    import { Grid } from './Grid'
    import { Actions } from './Actions'
    import type { SelectSquareEvent } from './events'

    const game = new Nonupo.NewGame()
    let step: Nonupo.PlaceStep = game.start().roll()

    let currentSelection: string = null

    const squareSelection = (e: CustomEvent<SelectSquareEvent>) => {
        if (currentSelection === step.num.toString())
            step = step.placeNumber(e.detail.square).roll()
        else if (currentSelection === Nonupo.Grid.Operator.Plus.toString())
            step = step.placeOperator(e.detail.square, Nonupo.Grid.Operator.Plus).roll()
        else if (currentSelection === Nonupo.Grid.Operator.Minus.toString())
            step = step.placeOperator(e.detail.square, Nonupo.Grid.Operator.Minus).roll()
        else
            console.warn('No option was selected!')

        currentSelection = null
    }
</script>

<Grid {step} on:selectsquare={squareSelection} />
<Actions {step} bind:currentSelection />
