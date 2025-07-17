import { EndpointBuilder, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Free, FreeResponseApi, Memorial, MemorialResponseApi } from "../model/types";

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

  getFreeDataAccept: builder.query<Free, number>({
    query: (id) => `/free/${id}`,
  }),
  allFree: builder.query<
    FreeResponseApi,
    { sectionId?: number; page?: number, title?: string}
  >({
    query: (params = {}) => {
      let query = `page=${params.page || 1}&itemsPerPage=24`;

      if (params.sectionId) {
        query += `&sectionId=${params.sectionId}`;
      }

      if (params.title) {
        query += `&title=${encodeURIComponent(params.title)}`;
      }

      return `/free?${query}`;
    },
  }),

});
