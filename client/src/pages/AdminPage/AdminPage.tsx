import BrandModal from "../../components/modals/BrandModal/BrandModal"
import DeviceModal from "../../components/modals/DeviceModal/DeviceModal"
import TypeModal from "../../components/modals/TypeModal/TypeModal"
import { ITypeAndBrand } from "../../interface/interface"
import { useGetAllBrandsQuery } from "../../store/apiSlice/brandSlice"
import { useGetAllTypesQuery } from "../../store/apiSlice/typeSlice"

const AdminPage = () => {

    const {data:types,isSuccess:successTypesLoad} = useGetAllTypesQuery()
    const {data:brands,isSuccess:successBrandsLoad} = useGetAllBrandsQuery()

    return (
        <section className="adminPage">
            <div className="adminDeviceForm">
                <BrandModal />
                <TypeModal />
                <DeviceModal />
            </div>
            <div className="typeListContainer">
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
            <div className="typeListContainer">
            <h3>бренды:</h3>
            {successBrandsLoad ? 
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