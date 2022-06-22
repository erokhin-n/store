import { ServerQuery, Tags } from "../../enum/enum";
import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const brandSlice = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        saveBrand: build.mutation<IMessage, ITypeAndBrand>({
            query: name => ({
                url: ServerQuery.brand,
                method: 'POST',
                body: name,
                credentials: "include",
            }),
            invalidatesTags:[Tags.CREATE_BRAND]
        }),
        getAllBrands: build.query<ITypeAndBrand[], void>({
            query: ()=> ServerQuery.brand,
            providesTags:[Tags.CREATE_BRAND]
        })
    }),
    overrideExisting: false
})

export const {
    useSaveBrandMutation,
    useGetAllBrandsQuery
} = brandSlice

