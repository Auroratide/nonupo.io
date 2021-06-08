<script lang="ts">
    import * as Nonupo from '@auroratide/nonupo'
    import { Grid } from './Grid'
    import { Actions } from './Actions'
    import type { SelectSquareEvent } from './events'

    const game = new Nonupo.NewGame()
    let step: Nonupo.Step = game.start()

    let currentSelection: string = null
    let currentPlaceable: Nonupo.Grid.Placeable = null
    $: {
        if (step instanceof Nonupo.PlaceStep) {
            if (currentSelection === step.num.toString())
                currentPlaceable = step.num
            else if (currentSelection === Nonupo.Grid.Operator.Plus.toString())
                currentPlaceable = Nonupo.Grid.Operator.Plus
            else if (currentSelection === Nonupo.Grid.Operator.Minus.toString())
                currentPlaceable = Nonupo.Grid.Operator.Minus
            else
                currentPlaceable = null
        } else {
            currentPlaceable = null
        }
    }

    const squareSelection = (e: CustomEvent<SelectSquareEvent>) => {
        if (step instanceof Nonupo.PlaceStep) {
            if (currentPlaceable instanceof Nonupo.Grid.Number)
                step = step.placeNumber(e.detail.square)
            else if (currentPlaceable instanceof Nonupo.Grid.Operator)
                step = step.placeOperator(e.detail.square, currentPlaceable)
            else
                console.warn('No option was selected!')

            currentSelection = null
        } else {
            console.warn('WARNING: Attempted to place when not in place step')
        }
    }

    const roll = () => {
        if (step instanceof Nonupo.RollStep) {
            step = step.roll()
        } else {
            console.warn('WARNING: Attempted to roll when not in roll step')
        }
    }
</script>

<Grid {step} on:selectsquare={squareSelection} {currentPlaceable} />
{#if step instanceof Nonupo.PlaceStep}
    <Actions {step} bind:currentSelection />
{:else if step instanceof Nonupo.RollStep}
    <button on:click={roll}>Roll</button>
{/if}
