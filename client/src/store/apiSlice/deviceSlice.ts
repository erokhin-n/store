import { ServerQuery, Tags } from "../../enums/enums";
import { IDevice, IDevicesResponse, IMessage } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const deviceApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDevices: build.query<IDevicesResponse<IDevice>, void>({
            query: () => ServerQuery.DEVICE,
            providesTags: [Tags.CREATE_DEVICE]
        }),
        getProductCard: build.query<IDevice, string>({
            query: (deviceId) => ({
                url: ServerQuery.PRODUCT_CARD + "/" + deviceId,
                method: 'GET',
                credentials: "include"
            })
        }),
        createDevice: build.mutation<IMessage, FormData>({
            query: (device) => ({
                url: ServerQuery.DEVICE,
                method: 'POST',
                body: device,
                credentials: "include",
            }),
            invalidatesTags: [Tags.CREATE_DEVICE]
        }),
        deletePicture: build.mutation<void, {id:number}> ({
            query: (id) => ({
                url:ServerQuery.DELETE_PICTURE,
                method: 'POST',
                body: id,
                credentials: "include",
            }),
            invalidatesTags: [Tags.DELETE_DEVICE],
        })
    }),
    overrideExisting: false
})

export const {
    useGetAllDevicesQuery,
    useCreateDeviceMutation,
    useGetProductCardQuery,
    useDeletePictureMutation,
} = deviceApi