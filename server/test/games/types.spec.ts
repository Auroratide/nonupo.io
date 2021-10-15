import { isPlayer } from '../../src/games/types'

describe('game types', () => {
    describe('isPlayer', () => {
        it('valid', () => {
            expect(isPlayer({
                id: 'id',
                type: 'human',
                name: 'Aurora',
            })).toBe(true)
        })

        it('null', () => {
            expect(isPlayer(null)).toBe(false)
        })

        it('missing id', () => {
            expect(isPlayer({
                type: 'human',
                name: 'Aurora',
            })).toBe(false)
        })

        it('missing type', () => {
            expect(isPlayer({
                id: 'id',
                name: 'Aurora',
            })).toBe(false)
        })

        it('missing name', () => {
            expect(isPlayer({
                id: 'id',
                type: 'human',
            })).toBe(false)
        })

        it('invalid type', () => {
            expect(isPlayer({
                id: 'id',
                type: 'monster',
                name: 'Aurora',
            })).toBe(false)
        })
    })
})