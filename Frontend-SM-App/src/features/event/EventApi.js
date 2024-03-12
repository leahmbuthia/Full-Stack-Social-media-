import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const EventsApi=createApi({
    reducerPath: 'EventsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8100/api/v1/'}),
    tagTypes: ['Events'],


    endpoints: (builder) =>({
        getEvents: builder.query({
            query:()=> 'events',
            providesTags:['events']
        }),
        getEventByID: builder.query({
            query: () => "events/:EventID",
            providesTags: ["Events"],
          }),
          getEventAttendedByUserID: builder.query({
            query: (UserID) => `attendees/${UserID}`,
            providesTags: ["Events"],
          }),

        addEvents:builder.mutation({
            query:(events) =>({
                url: 'events',
                method: 'POST',
                body: events
            }),
            invalidatesTags:['Events']
        }),
        registerForEvent: builder.mutation({
            query: (eventAttendee) => ({
              url: `attendees`,
              method: "POST",
              body: eventAttendee,
            }),
            invalidatesTags: ["Events"],
          }),
          updateEvent: builder.mutation({
            query: (event) => ({
              url: `/events/:${event.EventID}`,
              method: "PUT",
              body: event,
            }),
            invalidatesTags: ["Events"],
          }),
          optOutOfEvent: builder.mutation({
            query: (EventID, UserID) => ({
              url: `/${EventID}/${UserID}`,
              method: "DELETE",
            }),
            invalidatesTags: ["Events"],
          }),
          deleteEvent: builder.mutation({
            query: (EventID) => ({
              url: `/events/${EventID}`,
              method: "DELETE",
            }),
          }),
        }),
      });
 export const { useGetEventsQuery,useGetEventByIDQuery, useGetEventAttendedByUserIDQuery,
    useAddEventsMutation,useRegisterForEventMutation,useUpdateEventMutation,useOptOutOfEventMutation,
    useDeleteEventMutation}= EventsApi;