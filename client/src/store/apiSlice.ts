import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerQuery } from '../enum/enum'
import { IDevice, IDevicesResponse, ILogin, IToken} from '../interface/interface'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000"}),
    endpoints: builder => ({
        getAllDevices: builder.query<IDevicesResponse<IDevice>, void>({
            query: () => ServerQuery.devices
        }),
        registration: builder.mutation({
            query: regData => ({
                url: ServerQuery.registration,
                method: 'POST',
                body: regData
            })
        }),
        getLogin: builder.query<IToken, ILogin>({
            query: loginData => ({
                url: ServerQuery.login,
                method: 'POST',
                body: loginData
            })
        })
    })
})

export const { 
    useGetAllDevicesQuery,
    useRegistrationMutation,
    useGetLoginQuery,
} = apiSlice 