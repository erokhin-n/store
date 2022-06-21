import { ServerQuery } from "../../enum/enum";
import { IDevice, IDevicesResponse, IMessage, ITypeAndBrand } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const deviceApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDevices: build.query<IDevicesResponse<IDevice>, void>({
        query: () => ServerQuery.devices
        }),
        saveBrand: build.mutation<IMessage, ITypeAndBrand>({
            query: name => ({
                url: ServerQuery.brand,
                method: 'POST',
                body: name,
                credentials: "include",
            })
        }),
    }),
    overrideExisting: false
})

export const {
    useGetAllDevicesQuery,
    useSaveBrandMutation
} = deviceApi