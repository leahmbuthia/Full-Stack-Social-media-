// const API = import.meta.env.VITE_API_DOMAIN;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8100/api/v1/'}),
  tagTypes: ['Photos'],
  endpoints: (builder) => ({
    
    getPhotos: builder.query({
      query: () => 'photos',
      provideTags: ['Photos'],
    }),

    addPhotos: builder.mutation({
      query:(Photos) =>({
        url: 'photos',
        method: 'POST',
        body: Photos,
      }),
      invalidatesTags: ['Photos']
    }),
  }),
});

export const { useGetPhotosQuery, useAddPhotosMutation } = photosApi;
