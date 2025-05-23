import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Section } from '../model/types';

export const SectionEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, 'sectionApi'>
) => ({
    getSection: builder.query<Section[], void > ({
      query: () => `/section`,
    })
});