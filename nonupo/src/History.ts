import Grid from './Grid'
import type { Action } from './Action'
import type { Step } from './Step'
import { D10 } from './D10'
import { RollAction } from './RollStep'
import { PlaceAction } from './PlaceStep'
import { Exception } from './Exception'
import { NewGame } from './NewGame'

export class History {
    private actions: Action[]
    constructor(actions: Action[] = []) {
        this.actions = actions
    }

    add = <T extends Action>(action: T): T => {
        this.actions.push(action)
        return action
    }

    asNotation = () => this.actions.map(a => a.notation)

    replay = (): Step => {
        const d10 = new D10()

        return this.actions.reduce((step: Step, action: Action) => {
            return action.play(step.grid, step.history, d10)
        }, new NewGame(undefined, undefined, d10).start())
    }

    static fromNotation(values: string[]): History {
        let previousRoll: Grid.Number | null = null
        const actions = values.map(value => {
            if (/^[0-9]$/.test(value)) {
                previousRoll = Grid.Number.values[Number(value)]
                return new RollAction(previousRoll)
            }

            let match = value.match(/^([#\-\+])@([0-9]+)$/)
            if (match && previousRoll) {
                let option: Grid.Placeable | null = null
                switch(match[1]) {
                    case '#': option = previousRoll; break;
                    case '+': option = Grid.Operator.Plus; break;
                    case '-': option = Grid.Operator.Minus; break;
                }
                const position = Number(match[2])
                previousRoll = null
                if (option === null) {
                    throw new Exception('ERROR PARSING HISTORY: Cannot place a number when there is no known previously rolled number')
                } else {
                    return new PlaceAction(option, position)
                }
            }

            throw new Exception(`ERROR PARSING HISTORY: Could not recognize token ${value}`)
        })

        return new History(actions)
    }
}