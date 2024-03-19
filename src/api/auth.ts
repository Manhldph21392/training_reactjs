import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body
            }),
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: '/signin',
                method: 'POST',
                body
            }),
        })
    })
})
export const { useSignupMutation, useSigninMutation } = authApi;
export default authApi;