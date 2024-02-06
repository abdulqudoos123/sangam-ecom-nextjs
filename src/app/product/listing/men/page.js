import CommonListing from '@/components/CommonListing'
import { productsByCategory } from '@/services/product'


const GetMenProducts =async () => {
    const menProducts= await productsByCategory('men');
    // console.log('menProducts====',menProducts);
  return (
    <div>
      <CommonListing data={menProducts &&  menProducts.data} />
    </div>
  )
}

export default GetMenProducts
