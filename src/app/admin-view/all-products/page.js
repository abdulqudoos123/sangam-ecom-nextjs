import CommonListing from '@/components/CommonListing'
import { getAllAdminProducts } from '@/services/product'


const AdminAllProducts = async () => {
  const allAdminProducts = await getAllAdminProducts();
  // console.log('allprodutsssssadmin====', allAdminProducts);
  return (
    <CommonListing data={allAdminProducts?.data} />
  )
}

export default AdminAllProducts
