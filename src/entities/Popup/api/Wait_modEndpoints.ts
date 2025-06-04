import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Wait } from '../model/types';

export const WaitEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, 'waitApi'>
) => ({
    getWait: builder.query<Wait, void > ({
      query: () => `/wait_mode`,
    })
});