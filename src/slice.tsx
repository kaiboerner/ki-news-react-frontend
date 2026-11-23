import { createSlice } from '@reduxjs/toolkit';
import { type State, createState } from './types';

const slice = createSlice({
    name: 'pagination',
    initialState: createState([], null),
    reducers: {
        first: (state) => state,
        previous: (state) => state,
        next: (state) => state,
        last: (state) => state,
    }
});

export default slice.reducer;
export const { first, previous, next, last } = slice.actions;
export const selector = (state: { pagination: State }) => state.pagination;
