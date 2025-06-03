import { jwtDecode } from 'jwt-decode';
import {setToken, setUser} from './authReducer';
import {baseApi} from './baseApi';

export const authSlice = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('Login data:', data);
          dispatch(setToken(data));
          dispatch(setUser(jwtDecode(data)));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/api/register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useRegisterMutation } = authSlice;
