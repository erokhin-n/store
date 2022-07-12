import { ServerQuery, Tags } from "../../enum/enum";
// import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const basketApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query<any, void>({
            query: ()=> ({
                url:ServerQuery.getBasket,
                credentials: "include"
            }),
            // invalidatesTags:[Tags.CREATE_BRAND]
        }),
    }),
    overrideExisting: false
})

export const {useGetBasketQuery} = basketApi