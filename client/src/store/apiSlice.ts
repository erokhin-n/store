import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerQuery } from '../enum/enum'
import { IDevice, IDevicesResponse, ILogin, IToken} from '../interface/interface'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000",
    }),
    endpoints: builder => ({
        getAllDevices: builder.query<IDevicesResponse<IDevice>, void>({
            query: () => ServerQuery.devices
        }),
        registration: builder.mutation({
            query: regData => ({
                url: ServerQuery.registration,
                method: 'POST',
                body: regData,
                credentials: "include",
            })
        }),
        login: builder.mutation({
            query: loginData => ({
                url: ServerQuery.login,
                method: 'POST',
                body: loginData,
                credentials: "include",
            })
        }),
        saveBrand: builder.mutation({
            query: name => ({
                url: ServerQuery.brand,
                method: 'POST',
                body: name,
                credentials: "include",
            })
        }),
        check: builder.query<any, void>({
            query: () => ({
                url: ServerQuery.check,
                credentials: "include"
            })
           
        })
    })
})

export const { 
    useGetAllDevicesQuery,
    useRegistrationMutation,
    useLoginMutation,
    useSaveBrandMutation,
    useCheckQuery,
} = apiSlice 