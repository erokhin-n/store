import { FC, useEffect } from "react"
import { ValidationResult } from "../../../enum/enum"
import { IDeviceInfoComponent } from "../../../interface/interface"

const DeviceInfo:FC<IDeviceInfoComponent> = ({
    info, addInfo, changeInfo, removeInfo}) => {
    
    return (
        <div>
            <button
                onClick={addInfo}
            >
                добавить информацию
            </button>
            {info && info.map( i => 
                <div key={i.id}>
                    <input 
                        value={i.title}
                        onChange={e => changeInfo('title', 'titleValid',e.target.value, i.id)}
                        placeholder="введите название"
                        style={{'background': ((i.titleValid===ValidationResult.success) || 
                            (i.titleValid===ValidationResult.firstAddition)) ? "white" : "red"}}
                    />
                    <input 
                        value={i.description}
                        onChange={e => changeInfo('description', 'descriptionValid',e.target.value, i.id)}
                        placeholder="введите описание"
                        style={{'background':(( i.descriptionValid===ValidationResult.success ) || 
                            (i.descriptionValid===ValidationResult.firstAddition ))? "white" : "red"}}
                    />
                    
                    <button onClick={()=> removeInfo(i.id)}>del</button>
                </div>   
            )}
        </div>
    )
}

export default DeviceInfo