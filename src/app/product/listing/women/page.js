import CommonListing from '@/components/CommonListing'
import { productsByCategory } from '@/services/product'


const WomenAllProducts =async () => {
    const getWomenProducts= await productsByCategory('women')
  return (
    <div>
     <CommonListing data={getWomenProducts && getWomenProducts.data} /> 
    </div>
  )
}

export default WomenAllProducts
