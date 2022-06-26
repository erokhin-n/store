import { ServerQuery, Tags } from "../../enum/enum";
import { IAuthData, IDataUserResponse, IMessage } from "../../interface/interface";
import { indexSlice } from "./indexSlice";


const userApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation<IDataUserResponse, IAuthData>({
            query: regData => ({
                url: ServerQuery.registration,
                method: 'POST',
                body: regData,
                credentials: "include",
            }),
            invalidatesTags: [Tags.USER]
        }),
        registrationAdmin: build.mutation<IMessage, IAuthData>({
            query: regData => ({
                url: ServerQuery.registrationAdmin,
                method: 'POST',
                body: regData,
                credentials: "include",
            }),
            invalidatesTags: [Tags.REG_ADMIN]
        }),
        login: build.mutation<IDataUserResponse, IAuthData>({
            query: loginData => ({
                url: ServerQuery.login,
                method: 'POST',
                body: loginData,
                credentials: "include",
            }),
            invalidatesTags: [Tags.USER]
        }),
        userList: build.query<IDataUserResponse[], void>({
            query: () =>  ServerQuery.getUsers,
            providesTags: [Tags.REG_ADMIN]
        }),
        check: build.query<IDataUserResponse, void>({
            query: () => ({
                url: ServerQuery.check,
                credentials: "include"
            }),
            providesTags: [Tags.USER]
        }),
        removeCookie: build.mutation<IMessage, void>({
            query: () => ({
                url: ServerQuery.removeCookie,
                credentials: "include"
            }),
            invalidatesTags:[Tags.USER]
        }),
    }),
    overrideExisting: false
})

export const {
    useRegistrationMutation,
    useRegistrationAdminMutation,
    useLoginMutation,
    useUserListQuery,
    useCheckQuery,
    useRemoveCookieMutation
} = userApi