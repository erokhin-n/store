import { ServerQuery, Tags } from "../../enums/enums";
import { IBasket } from "../../interface/interface";
// import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const basketApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query<IBasket, void>({
            query: ()=> ({
                url:ServerQuery.GET_BASKET,
                credentials: "include"
            }),
            // invalidatesTags:[Tags.CREATE_BRAND]
        }),
    }),
    overrideExisting: false
})

export const {useGetBasketQuery} = basketApi