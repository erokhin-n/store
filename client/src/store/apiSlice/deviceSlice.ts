import { ServerQuery } from "../../enum/enum";
import { IDevice, IDevicesResponse } from "../../interface/interface";
import { indexSlice } from "./indexSlice";

const deviceApi = indexSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllDevices: build.query<IDevicesResponse<IDevice>, void>({
            query: () => ServerQuery.devices
        }),
    }),
    overrideExisting: false
})

export const {
    useGetAllDevicesQuery
} = deviceApi