import { ServerQuery, Tags } from "../../enums/enums";
import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const brandSlice = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        saveBrand: build.mutation<IMessage, ITypeAndBrand>({
            query: name => ({
                url: ServerQuery.BRAND,
                method: 'POST',
                body: name,
                credentials: "include",
            }),
            invalidatesTags:[Tags.CREATE_BRAND]
        }),
        getAllBrands: build.query<ITypeAndBrand[], void>({
            query: ()=> ServerQuery.BRAND,
            providesTags:[Tags.CREATE_BRAND]
        })
    }),
    overrideExisting: false
})

export const {
    useSaveBrandMutation,
    useGetAllBrandsQuery
} = brandSlice

