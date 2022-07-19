import { ServerQuery, Tags } from "../../enums/enums";
import { IDevice, IDevicesResponse, IMessage } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const deviceApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDevices: build.query<IDevicesResponse<IDevice>, void>({
            query: () => ServerQuery.DEVICE,
            providesTags: [Tags.CREATE_DEVICE]
        }),
        createDevice: build.mutation<IMessage, FormData>({
            query: (device) => ({
                url: ServerQuery.DEVICE,
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