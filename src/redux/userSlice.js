import {baseApi} from './baseApi';

export const userSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    searchProfilesByName: builder.query({
      query: name => {
        console.debug('[DEBUG] Sending search request for name:', name);
        return `/api/search?name=${name}`;
      },
    }),

    createGroup: builder.mutation({
      query: credentials => ({
        url: '/api/creategroup',
        method: 'POST',
        body: credentials,
      }),
    }),
    getGroups: builder.query({
      query: userId => `/api/getgroups/?userId=${userId}`,
      providesTags: ['groups'],
    }),
     getChats: builder.query({
      query: userId => `/api/chats/${userId}`,
    }),
  }),

  overrideExisting: true,
});

export const {
  useSearchProfilesByNameQuery,
  useCreateGroupMutation,
  useGetGroupsQuery,
  useGetChatsQuery
} = userSlice;
