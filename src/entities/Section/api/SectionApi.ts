import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SectionEndpoints } from './SectionEndpoints';

export const SectionApi = createApi({
  reducerPath: 'sectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api-kambarka-memory-book.itlabs.top/api' }),
  endpoints: SectionEndpoints,
});

export const { 
    useGetSectionQuery
} = SectionApi;