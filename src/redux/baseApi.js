// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';

// export const baseUrl = createApi({
//   reducerPath: 'baseApi',
//   baseQuery: fetchBaseQuery({baseUrl: 'https://rahma-test-api.onrender.com'}),
//   endpoints: builder => ({
//     register: builder.mutation({
//       query: credentials => ({
//         url: '/api/register',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const {useRegisterMutation} = baseUrl;

// baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rahma-test-api.onrender.com' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
   tagTypes: [
    'getMessagesTag',
    'getGroupMessagesTag',
    'groups'
  ],
  endpoints: () => ({}), 
});

