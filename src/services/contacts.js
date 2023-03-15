import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/items",
      providesTags: ["Contact"],
    }),
    addNewContact: builder.mutation({
      query: (payload) => ({
        url: "/items",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});
export const { useGetContactsQuery, useAddNewContactMutation } = contactsApi;
