import { FormEvent, useEffect, useState } from "react"
import { ValidationResult } from "../../../enums/enums"
import { ITypeAndBrandModal } from "../../../interface/interface"
import { useSaveBrandMutation } from "../../../store/apiSlice/brandSlice"
import { deviceFormValidation } from "../../../validation/DeviceFormValidation"

const BrandModal = () => {

    const [brand, setBrand] = useState<ITypeAndBrandModal>({
        value: '', 
        valid: ValidationResult.FIRST_ADDITION, 
        serverInfo: ''
    })

    useEffect(()=> {
        if(!brand.value.length) {
            setBrand({...brand, valid: ValidationResult.FIRST_ADDITION})
        }
    }, [brand.value])

    const [saveBrand, {isLoading}] = useSaveBrandMutation()

    const saveBrandOnServer = (e:FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(brand.valid === ValidationResult.SUCCESS) {
            saveBrand({name: brand.value})
            .unwrap()
            .then( res =>setBrand({...brand, serverInfo: res.message}))
            .catch(e => setBrand({...brand, serverInfo: e.data.message}))
        } else {   
            setBrand({
                ...brand, 
                valid: ValidationResult.ERROR,
                serverInfo: "Необходимо исправить поле перед отправкой"
            })
        }
    }

    const changeBrand = (e:string) => {
        setBrand({...brand, value: e, valid: deviceFormValidation(e), serverInfo: ''})
    }

    if (isLoading) {
        return <h3>brand save loading ...</h3>
    }


    return (
        <div className="brandAndTypeForm">
            <h4 className="modalTitle">создание бренда</h4>
            <form className="inputButtonModalForm">
                <input 
                    type = "text"
                    placeholder="название бренда"
                    value={brand.value}  
                    onChange={e => changeBrand(e.target.value)}
                    style={{border: brand.valid === ValidationResult.ERROR ?
                        "2px solid red" : "1px solid black"
                    }}
                />
                <button 
                    onClick={e => saveBrandOnServer(e)}
                    className="modalButton"
                >
                    save
                </button>
                <h5 className="modalTitle">{brand.serverInfo}</h5>
                {
                    brand.valid === ValidationResult.ERROR &&
                        <h4>поле содержит недопустимые символы</h4>
                }
            </form>
        </div>
    )
}

export default BrandModal