import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.training.div3.pgtest.co/api/v1' }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: '/auth/register',
                method: 'POST',
                body: user
            }),
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body
            }),
        }),
    
    })
})

export const { useSignupMutation, useSigninMutation} = authApi;
export default authApi;