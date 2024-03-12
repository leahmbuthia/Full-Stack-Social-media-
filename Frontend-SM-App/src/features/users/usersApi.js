import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi=createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8100/api/v1/'}),
    tagTypes: ['users'],

    endpoints:(builder)=>({

        getUsers:builder.query({
            query:()=>'users',
            providesTags: ['user']
        }),

        addUsers:builder.mutation({
            query: (users)=>({
                url: 'users',
                method: 'POST',
                body: users
            }),
            invalidatesTags: ['users']
        })

    })
})


export const {useGetUsersQuery, useAddUsersMutation}=userApi