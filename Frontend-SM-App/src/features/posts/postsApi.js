import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8100/api/v1/'}),
    tagTypes: ['Posts'],
    endpoints: (builder)=>({

        getPosts:builder.query({
            query:()=>'posts',
            providesTags: ['Posts']
        }),

        addPosts:builder.mutation({
            query:(posts)=>({
                url: 'posts',
                method: 'POST',
                body: posts
            }),
            invalidatesTags: ['Posts']
        })
    })
})

export const {useGetPostsQuery, useAddPostsMutation} = postApi;


