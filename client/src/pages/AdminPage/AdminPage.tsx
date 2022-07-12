// import BrandModal from "../../components/modals/BrandModal/BrandModal"
import { createContext, useReducer } from "react"
import DeviceModal from "../../components/modals/DeviceModal/DeviceModal"
// import TypeModal from "../../components/modals/TypeModal/TypeModal"
import { ITypeAndBrand } from "../../interface/interface"
import { useGetAllBrandsQuery } from "../../store/apiSlice/brandSlice"
import { useGetAllTypesQuery } from "../../store/apiSlice/typeSlice"
import styles from './AdminPage.module.css'

export const TestDispatch:any = createContext(null)
export const TestState:any = createContext(null)

const initialState:any = {
    testState: ''
}

function reducer(state:any, action:any) {
    switch(action.type) {
        case 'plus':
            return {...state, testState: action.payload};
        case 'minus':
            return {testState: state.testState - 1};
        default:
            throw new Error()
    }
}

const AdminPage = () => {

    const [test, dispatch] = useReducer(reducer, initialState)

    const {data:types,isSuccess:successTypesLoad} = useGetAllTypesQuery()
    const {data:brands,isSuccess:successBrandsLoad} = useGetAllBrandsQuery()

    return (
        <section className={styles.page}>
            <div className={styles.deviceForm}>
                {/* <h4>создание бренда</h4>
                <BrandModal />
                <h4>создание типа устройства</h4>
                <TypeModal /> */}
                <h4>создание устройства</h4>
                <TestDispatch.Provider value={dispatch}>
                    <TestState.Provider value={test}>
                    <DeviceModal />
                    </TestState.Provider>
                </TestDispatch.Provider>
            </div>
            <div>
            <h3>типы устройств:</h3>
            {successTypesLoad ? 
                types.map((type:ITypeAndBrand) => 
                    <div key={type.name}>
                        <h3>{type.name}</h3>  
                    </div>  
                ) :
                <h3>типы не найдены</h3>
            }
            </div>
            <div>
            <h3>бренды:</h3>
            {successBrandsLoad? 
                brands.map((brand:ITypeAndBrand) => 
                    <h3 key={brand.name}>{brand.name}</h3>    
                ) :
                <h3>типы не найдены</h3>
            }
            </div>
        </section>
        
    )
}

export default AdminPage