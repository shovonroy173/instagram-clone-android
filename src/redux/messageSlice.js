import {baseApi} from './baseApi';

export const messageSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: message => ({
        url: '/api/sendMessage',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['getMessagesTag'],
    }),

    getMessages: builder.query({
      query: ({userA, userB}) =>
        `/api/getMessages?userA=${userA}&userB=${userB}`,
      providesTags: ['getMessagesTag'],
    }),

        // ✅ Group Chat
    sendGroupMessage: builder.mutation({
      query: message => ({
        url: '/api/sendGroupMessage',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['getGroupMessagesTag'],
    }),

    getGroupMessages: builder.query({
      query: groupId => `/api/group/${groupId}`,
      providesTags: ['getGroupMessagesTag'],
    }),
  }),
  overrideExisting: true,
});

export const {useSendMessageMutation, useGetMessagesQuery,   useSendGroupMessageMutation,
  useGetGroupMessagesQuery,} = messageSlice;
