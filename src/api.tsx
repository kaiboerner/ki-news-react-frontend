import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Date, NewsEntry } from './types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (build) => ({
        getDates: build.query<Date[], null>({ query: () => '/dates' }),
        getNewsEntries: build.query<NewsEntry[], Date>({ query: (date: Date) => `/${date}` })
    })
});

export const { useGetDatesQuery, useGetNewsEntriesQuery } = api;
