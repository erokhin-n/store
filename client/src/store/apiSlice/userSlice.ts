import { ServerQuery, Tags } from "../../enums/enums";
import { IAuthData, IDataUserResponse, IMessage } from "../../interface/interface";
import { indexSlice } from "./indexSlice";


const userApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        registration: build.mutation<IDataUserResponse, IAuthData>({
            query: regData => ({
                url: ServerQuery.AUTH_REGISTRATION,
                method: 'POST',
                body: regData,
                credentials: "include",
            }),
            invalidatesTags: [Tags.USER]
        }),
        registrationAdmin: build.mutation<IMessage, IAuthData>({
            query: regData => ({
                url: ServerQuery.AUTH_REGISTRATION_ADMIN,
                method: 'POST',
                body: regData,
                credentials: "include",
            }),
            invalidatesTags: [Tags.REG_ADMIN]
        }),
        login: build.mutation<IDataUserResponse, IAuthData>({
            query: loginData => ({
                url: ServerQuery.AUTH_LOGIN,
                method: 'POST',
                body: loginData,
                credentials: "include",
            }),
            invalidatesTags: [Tags.USER]
        }),
        userList: build.query<IDataUserResponse[], void>({
            query: () =>  ServerQuery.GET_USERS,
            providesTags: [Tags.REG_ADMIN]
        }),
        check: build.query<IDataUserResponse, void>({
            query: () => ({
                url: ServerQuery.CHECK,
                credentials: "include"
            }),
            providesTags: [Tags.USER]
        }),
        removeCookie: build.mutation<IMessage, void>({
            query: () => ({
                url: ServerQuery.REMOVE_COOKIE,
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