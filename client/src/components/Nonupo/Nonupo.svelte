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

    let currentSelection = ''

    const squareSelection = (e: CustomEvent<SelectSquareEvent>) => {
        if (currentSelection === 'n') {
            step = step.placeNumber(e.detail.square).roll()
        } else if (currentSelection !== '') {
            step = step.placeOperator(e.detail.square, currentSelection as Nonupo.Operator).roll()
        } else {
            console.warn('No option was selected!')
        }

        currentSelection = ''
    }
</script>

<Grid {step} on:selectsquare={squareSelection} />
<Actions {step} bind:currentSelection />
