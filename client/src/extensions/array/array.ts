export function chunk<T>(arr: T[], size: number): T[][] {
    if (size <= 0) {
        throw `Cannot chunk an array into subarrays of size 0 or less; size was ${size}`
    }

    return Array(Math.ceil(arr.length / size))
        .fill(null)
        .map((_, index) => index * size)
        .map(begin => arr.slice(begin, begin + size))
}
