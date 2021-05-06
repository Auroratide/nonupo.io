import { Grid } from "../../src";

export const buildGrid: (values?: { [index: number]: Grid.Placeable }) => Grid = (values = {}) => {
    const grid = new Grid()

    Object.entries(values).forEach(([position, value]) => {
        grid.place(parseInt(position), value)
    })

    return grid
}
