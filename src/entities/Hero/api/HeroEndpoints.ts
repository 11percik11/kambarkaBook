import { EndpointBuilder, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ApiResponse, Hero } from "../model/types";

export const HeroEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, "heroApi">
) => ({
  getPersonalDataAccept: builder.query<Hero, number>({
    query: (id) => `/people/${id}`,
  }),
  getPeople: builder.query<
    ApiResponse,
    { sectionId?: number; page?: number; name?: string }
  >({
    query: (params = {}) => {
      let query = `page=${params.page || 1}&itemsPerPage=24`;

      if (params.sectionId) {
        query += `&sectionId=${params.sectionId}`;
      }

      if (params.name) {
        query += `&name=${encodeURIComponent(params.name)}`;
      }

      return `/people?${query}`;
    },
  }),
  // getMedia: builder.query<Hero, string > ({
  //   query: (file_name) => `/people_media/${file_name}`,
  // }),
  getMedia: builder.query<Blob, string>({
    query: (file_name) => ({
      url: `/people_media/${file_name}`,
      responseHandler: (response) => response.blob(), // explicitly handle as Blob
    }),
  }),
});
