import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
    reducerPath: 'product',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://api.training.div3.pgtest.co/api/v1', prepareHeaders: (headers, { }) => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ";

            if (token) {
                headers.set('Authorization', token);
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: `/product`,
                // This is the same as passing 'text'
                responseHandler: (response) => {
                    console.log(response.text());

                    return  response.text()
                },
            }),

        }),
        getProductById: builder.query({
            query: (id) => `/product/${id}`
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: '/product',
                method: 'POST',
                body: product
            })
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `/product/${product.id}`,
                method: 'PUT',
                body: product
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE'
            })
        })
    })
})
export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;
export default productApi