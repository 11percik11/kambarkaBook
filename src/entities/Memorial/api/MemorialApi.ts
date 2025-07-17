import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MemorialEndpoints } from "./MemorialEndpoints";

export const MemorialApi = createApi({
  reducerPath: "memorialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-kambarka-memory-book.itlabs.top/api",
  }),
  endpoints: MemorialEndpoints,
});

export const {
  useGetMemorialDataAcceptQuery,
  useAllMemorialQuery,
  useLazyAllMemorialQuery,
  useGetFreeDataAcceptQuery,
  useAllFreeQuery,
  useLazyAllFreeQuery
} = MemorialApi;
