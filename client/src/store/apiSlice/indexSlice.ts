import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Tags } from '../../enums/enums'

export const indexSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
    }),
    tagTypes: [Tags.USER,Tags.REG_ADMIN,Tags.CREATE_TYPE, Tags.CREATE_BRAND,Tags.CREATE_DEVICE],
    endpoints: () => ({})
})
