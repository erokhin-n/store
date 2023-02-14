import { ServerQuery, Tags } from "../../enums/enums";
import { IBasket, IBasketDevice, IDevice } from "../../interface/interface";
// import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const basketSlice = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query<IBasket, void>({
            query: ()=> ({
                url:ServerQuery.GET_BASKET,
                credentials: "include"
            }),
            providesTags:[Tags.GET_BASKET_NUMBER] 
        }),
        addDevice: build.mutation<void, IBasketDevice<IDevice>>({
            query: device => ({ 
                url:ServerQuery.ADD_DEVICE,
                method: 'POST',
                body: device,
                credentials: "include",    
            }),
            // invalidatesTags:[Tags.GET_BASKET_NUMBER] 
        }),
        getBasketDevices: build.query<IDevice[], IBasket>({
            query: (basketId) => ({
                url: ServerQuery.GET_BASKET_DEVICES, 
                method: 'GET',
                credentials: 'include'
            })
        })
    }),
    overrideExisting: false
})

export const {
    useGetBasketQuery, 
    useAddDeviceMutation, 
    useGetBasketDevicesQuery
} = basketSlice