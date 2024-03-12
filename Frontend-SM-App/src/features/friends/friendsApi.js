import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const friendApi=createApi({
    reducerPath: 'friendApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8100/api/v1/'}),
    tagTypes: ['friendship'],
    endpoints:(builder)=>({

        getFriends:builder.query({
            query:()=>'friendships',
            providesTags: ['friendship']
        }),
        
        addFriends:builder.mutation({
            query:(friends)=>({
                url: 'friendships',
                method: 'POST',
                body: friends
            }),
            invalidatesTags: ['friendship']
        }),
        deleteFriends:builder.mutation({
            query:(friendsID)=>({
                url:`friendships${friendsID}`,
                method: 'DELETE',
            })
        })

    })
})

export const {useGetFriendsQuery,useAddFriendsMutation,useDeleteFriendsMutation}=friendApi

