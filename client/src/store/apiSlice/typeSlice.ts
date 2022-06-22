import { ServerQuery, Tags } from "../../enum/enum";
import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const typeSlice = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        saveType: build.mutation<IMessage, ITypeAndBrand>({
            query: name => ({
                url: ServerQuery.type,
                method: 'POST',
                body: name,
                credentials: "include",
            }),
            invalidatesTags:[Tags.CREATE_TYPE]
        }),
        getAllTypes: build.query<ITypeAndBrand[], void>({
            query: ()=> ServerQuery.type,
            providesTags: [Tags.CREATE_TYPE]
        }),
    }),
    overrideExisting: false
})

export const {
    useSaveTypeMutation,
    useGetAllTypesQuery
} = typeSlice