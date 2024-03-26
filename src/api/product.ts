import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../interfaces/Product";

const productApi = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.training.div3.pgtest.co/api/v1',
        prepareHeaders: (headers, { }) => {
            const token = localStorage.getItem('token') || '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => ({
                url: `/product`,
            }),
            transformResponse: (response: { data: IProduct[] }) => {
                return response.data
            },
        }),
        getProductById: builder.query<IProduct, string>({
            query: (id) => `/product/${id}`,
            transformResponse: (response: { data: IProduct }) => {
                console.log(response);

                return response.data
            },
        }),
        addProduct: builder.mutation<IProduct, Partial<IProduct>>({
            query: (product) => ({
                url: '/product',
                method: 'POST',
                body: product,
            }),
        }),
        updateProduct: builder.mutation<IProduct, Partial<IProduct> & Pick<IProduct, 'id'>>({
            query: (product) => ({
                url: `/product`,
                method: 'PUT',
                body: product,
            }),
            transformResponse: (response: { data: IProduct }) => {
                return response.data
            },
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;
export default productApi