import BrandModal from "../../components/modals/BrandModal/BrandModal"
import TypeModal from "../../components/modals/TypeModal/TypeModal"
import { useGetAllBrandsQuery } from "../../store/apiSlice/brandSlice"
import { useGetAllTypesQuery } from "../../store/apiSlice/typeSlice"
import styles from './AdminPage.module.css'

const AdminPage = () => {

    const {data:types,isSuccess:successTypesLoad} = useGetAllTypesQuery()
    const {data:brands,isSuccess:successBrandsLoad} = useGetAllBrandsQuery()

    const invalidateError = () => {
        console.log('invalidate error')
    }

    return (
        <section className={styles.page}>
            <div className={styles.deviceForm} onClick={()=> invalidateError()}>
                <h4>создание бренда</h4>
                <BrandModal />
                <h4>создание типа устройства</h4>
                <TypeModal />
            </div>
            <div>
            <h3>типы устройств:</h3>
            {successTypesLoad ? 
                types.map(type => 
                    <h3 key={type.name}>{type.name}</h3>    
                ) :
                <h3>типы не найдены</h3>
            }
            </div>
            <div>
            <h3>бренды:</h3>
            {successBrandsLoad? 
                brands.map(brand => 
                    <h3 key={brand.name}>{brand.name}</h3>    
                ) :
                <h3>типы не найдены</h3>
            }
            </div>
        </section>
        
    )
}

export default AdminPage