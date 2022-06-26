import { useAppSelector } from "../../../hooks/hooks"

const DeviceModal = () => {

    const types = useAppSelector(state => state.device.types)

    return (
        <div>
            <form>
                <select>
                    {types && types.map(type => 
                        <option
                            key={type.name} 
                            value={type.name}
                        >
                            {type.name}
                        </option>    
                    )}
                </select>
            </form>
        </div>
    )
}

export default DeviceModal