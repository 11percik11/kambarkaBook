import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DateEndpoints } from './DateEndpoints';
// import { HeroEndpoints } from './HeroEndpoints';

export const DateApi = createApi({
  reducerPath: 'dateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-kambarka-memory-book.itlabs.top/api' }),
  endpoints: DateEndpoints,
});

export const { 
    useGetDateQuery,
    useLazyGetDateQuery,
    useGetDayQuery,
    useLazyGetDayQuery,
} = DateApi;