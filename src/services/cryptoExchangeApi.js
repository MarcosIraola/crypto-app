import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoExchangeApiHeaders = {
    'X-CoinAPI-Key': '9045F74E-8CBB-4DF6-A0D4-97B89EF4434F'
}

const baseUrl = 'https://rest.coinapi.io/v1';

const createRequest = (url) => ({ url, headers: cryptoExchangeApiHeaders})

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getExchanges: builder.query({
            query: () => createRequest(`/exchanges`),
        }),
        getExchangesAssets: builder.query({
            query: () => createRequest(`/exchanges/icons/small`),
        }),
    })
});

export const {
    useGetExchangesQuery,
    useGetExchangesAssetsQuery
} = cryptoExchangeApi;
