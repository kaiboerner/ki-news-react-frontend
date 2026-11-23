import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { api } from './api'
import paginationReducer from './slice'

export const store = configureStore({
    reducer: {
        [ api.reducerPath ]: api.reducer,
        pagination: paginationReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function getState(): RootState {
    return store.getState();
}
