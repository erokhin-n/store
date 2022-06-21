import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerQuery } from '../../enum/enum'
import { IAuthData, IDataUserResponse, IDevice, IDevicesResponse, IMessage, ITypeAndBrand} from '../../interface/interface'


export const indexSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
    }),
    endpoints: () => ({})
})
