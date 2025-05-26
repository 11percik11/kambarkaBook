import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HeroEndpoints } from './HeroEndpoints';

export const HeroApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-kambarka-memory-book.itlabs.top/api' }),
  endpoints: HeroEndpoints,
});

export const { 
    useGetPersonalDataAcceptQuery,
    useGetPeopleQuery,
    useLazyGetPeopleQuery,
    useGetMediaQuery,
    useLazyGetMediaQuery,
} = HeroApi;