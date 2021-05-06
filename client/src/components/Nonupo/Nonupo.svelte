<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'
    import { Grid } from './Grid'
    import { Actions } from './Actions'
    import type { SelectSquareEvent } from './events'

    const game = new Nonupo.NewGame()
    let step: Nonupo.PlaceStep = game.start().roll()

    let currentSelection: Nonupo.Grid.Placement = null

    const squareSelection = (e: CustomEvent<SelectSquareEvent>) => {
        if (currentSelection instanceof Nonupo.Grid.Number)
            step = step.placeNumber(e.detail.square).roll()
        else if (currentSelection instanceof Nonupo.Grid.Operator)
            step = step.placeOperator(e.detail.square, currentSelection).roll()
        else
            console.warn('No option was selected!')

        currentSelection = null
    }
</script>

<Grid {step} on:selectsquare={squareSelection} />
<Actions {step} bind:currentSelection />
