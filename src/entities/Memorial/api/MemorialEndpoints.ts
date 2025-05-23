import { EndpointBuilder, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Memorial, MemorialResponseApi } from "../model/types";

export const MemorialEndpoints = (
  builder: EndpointBuilder<
    ReturnType<typeof fetchBaseQuery>,
    never,
    "memorialApi"
  >
) => ({
  getMemorialDataAccept: builder.query<Memorial, number>({
    query: (id) => `/memorial/${id}`,
  }),
  allMemorial: builder.query<
    MemorialResponseApi,
    { sectionId?: number; page?: number}
  >({
    query: (params = {}) => {
      let query = `page=${params.page || 1}&itemsPerPage=24`;

      if (params.sectionId) {
        query += `&sectionId=${params.sectionId}`;
      }

      return `/memorial?${query}`;
    },
  }),
});
