<script lang="ts">
    import { onMount } from 'svelte'
    import * as Nonupo from '@auroratide/nonupo'
    import { Grid } from './Grid'
    import { Actions } from './Actions'
    import type { SelectSquareEvent } from './events'

    let gridVisible = false

    onMount(() => {
        setTimeout(() => gridVisible = true, 1)
    })

    const game = new Nonupo.NewGame()
    let step: Nonupo.PlaceStep = game.start().roll()

    let currentSelection: Nonupo.GridPlacement = null

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
