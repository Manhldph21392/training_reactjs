import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const locationApi = createApi({
    reducerPath: 'location',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://api.training.div3.pgtest.co/api/v1' }),
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => '/location',
        }),
        getCitiesByCountry: builder.query({
            query: (countryId) => `/location?pid=${countryId}`,
        }),
    })
});

export const { useGetCountriesQuery, useGetCitiesByCountryQuery } = locationApi;
export default locationApi;
