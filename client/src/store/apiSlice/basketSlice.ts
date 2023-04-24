import { ServerQuery, Tags } from "../../enums/enums";
import { IBasket, IBasketDevice, IBasketResponse, IDevice, IDeviceFormFields } from "../../interface/interface";
// import { IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const basketSlice = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query<IBasketResponse[], void>({
            query: ()=> ({
                url:ServerQuery.GET_BASKET,
                credentials: "include"
            }),
            providesTags:[Tags.USER, Tags.GET_BASKET_DEVICES]
        }),
        getBasketNumber: build.query<IBasket, void>({
            query: ()=> ({
                url:ServerQuery.GET_BASKET_NUMBER,
                credentials: "include"
            }),
            providesTags:[Tags.USER]
        }),
        addDevice: build.mutation<void, IBasketDevice<IDevice>>({
            query: device => ({ 
                url:ServerQuery.ADD_DEVICE,
                method: 'POST',
                body: device,
                credentials: "include",    
            }),
            invalidatesTags:[Tags.GET_BASKET_DEVICES]
        }),
        getBasketDevice: build.query<IDevice, IBasketResponse>({
            query: (device) => ({
                url: ServerQuery.GET_BASKET_DEVICE + '/' + device.deviceId, 
                method: 'GET',
                credentials: 'include'
            }),
        })
    }),
    overrideExisting: false
})

export const {
    useGetBasketQuery, 
    useAddDeviceMutation, 
    useGetBasketNumberQuery,
    useGetBasketDeviceQuery
} = basketSlice