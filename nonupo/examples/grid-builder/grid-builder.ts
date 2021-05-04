import { GridValue } from "../../src";

export const buildGrid: (values?: { [index: number]: GridValue }) => GridValue[] = (values = {}) => {
    const grid = Array(36).fill('')

    Object.entries(values).forEach(([position, value]) => {
        grid[parseInt(position)] = value
    })

    return grid
}
