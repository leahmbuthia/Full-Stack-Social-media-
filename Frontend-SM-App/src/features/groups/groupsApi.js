// const API = import.meta.env.VITE_API_DOMAIN;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8100/api/v1/'}),
  tagTypes: ['Groups'],
  endpoints: (builder) => ({
    
    createGroupController: builder.mutation({
      query:(group) =>({
        url: 'groups',
        method: 'POST',
        body: group
      }),
      invalidatesTags: ['Groups']
    }),
  }),
});

export const { useCreateGroupControllerMutation} = groupsApi;
