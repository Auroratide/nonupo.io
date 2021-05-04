export enum NonupoEvent {
    SelectSquare = 'selectsquare'
}

export type SelectSquareEvent = {
    square: number,
}

export const selectSquare = (dispatch: <EventKey extends string>(type: EventKey, detail?: any) => void, square: number) =>
    dispatch(NonupoEvent.SelectSquare, { square })
