import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WaitEndpoints } from './Wait_modEndpoints';
// import { HeroEndpoints } from './HeroEndpoints';

export const WaitApi = createApi({
  reducerPath: 'waitApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-kambarka-memory-book.itlabs.top/api' }),
  endpoints: WaitEndpoints,
});

export const { 
    useGetWaitQuery,
} = WaitApi;