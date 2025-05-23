import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { ApiResponse } from '../model/types';

export const DateEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, 'dateApi'>
) => ({
    getDate: builder.query<ApiResponse, {page?: number, itemsPerPage?: number} > ({
        query: (params = {}) => {
            let queryPage = 'page=1';
            let queryItemsPersPage = '&itemsPerPage=12';
            
            if (params.page) {
                queryPage = `page=${params.page}`; // Убрано let
            }
    
            if (params.itemsPerPage) {
                queryItemsPersPage = `&itemsPerPage=${params.itemsPerPage}`; // Убрано let
            }
          
            return `/date?&type=date&${queryPage}${queryItemsPersPage}`;
        },
        keepUnusedDataFor: 0,
        extraOptions: { track: false },
    }),
    getDay: builder.query<ApiResponse, {page?: number, itemsPerPage?: number} > ({
        query: (params = {}) => {
            let queryPage = 'page=1';
            let queryItemsPersPage = '&itemsPerPage=12';
            
            if (params.page) {
                queryPage = `page=${params.page}`; // Убрано let
            }
    
            if (params.itemsPerPage) {
                queryItemsPersPage = `&itemsPerPage=${params.itemsPerPage}`; // Убрано let
            }
          
            return `/date?&type=day&${queryPage}${queryItemsPersPage}`;
        },
        extraOptions: { track: false },
        keepUnusedDataFor: 0,
    }),
});