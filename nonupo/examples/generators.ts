export const cyclic: (values: number[]) => () => number = (values: number[]) => {
    let current = -1
    return () => values[current = (current + 1) % values.length] / 10
}

export const single: (value: number) => () => number = (value: number) => {
    return cyclic([value])
}
