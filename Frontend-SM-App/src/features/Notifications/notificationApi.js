// const API = import.meta.env.VITE_API_DOMAIN;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8100/api/v1/'}),
  tagTypes: ['message'],
  endpoints: (builder) => ({
    
    createMessage: builder.mutation({
      query: (messageS) => ({
        url: 'messages',
        method: 'POST',
        body: messageS
      }),
      invalidatesTags: ['message']
    }),
    
  }),
});

export const { useCreateMessageMutation} = notificationApi;
