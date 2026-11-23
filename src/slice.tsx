import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type State, createState, type Date } from './types';

const slice = createSlice({
    name: 'pagination',
    initialState: createState([], null),
    reducers: {
        first: (state) => createState(state.dates, 0),
        previous: (state) => createState(state.dates, (state.index ?? 0) - 1),
        next: (state) => createState(state.dates, (state.index ?? 0) + 1),
        last: (state) => createState(state.dates, state.dates.length - 1),
        setDates: (_, action: PayloadAction<Date[]>) => createState(action.payload, 0)
    }
});

export default slice.reducer;
export const { first, previous, next, last, setDates } = slice.actions;
export const selector = (state: { pagination: State }) => state.pagination;
