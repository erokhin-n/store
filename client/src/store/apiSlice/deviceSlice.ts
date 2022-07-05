import { ServerQuery, Tags } from "../../enum/enum";
import { IDevice, IDevicesResponse, IMessage } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const deviceApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDevices: build.query<IDevicesResponse<IDevice>, void>({
            query: () => ServerQuery.devices,
            providesTags: [Tags.CREATE_DEVICE]
        }),
        createDevice: build.mutation<IMessage, FormData>({
            query: (device) => ({
                url: ServerQuery.devices,
                method: 'POST',
                body: device,
                credentials: "include",
            }),
            invalidatesTags: [Tags.CREATE_DEVICE]
        })
    }),
    overrideExisting: false
})

export const {
    useGetAllDevicesQuery,
    useCreateDeviceMutation
} = deviceApi