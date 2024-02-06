import CommonListing from '@/components/CommonListing'
import { getAllAdminProducts } from '@/services/product'


const AllProducts = async () => {
    const getAllProducts = await getAllAdminProducts();
    // console.log('allproduct====',getAllProducts);
    return (
        <div>
            <CommonListing data={getAllProducts?.data} />
        </div>
    )
}

export default AllProducts
