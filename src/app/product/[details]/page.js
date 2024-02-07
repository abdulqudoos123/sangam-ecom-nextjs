import CommonDetails from "@/components/CommonDetails";
import { ProductById } from "@/services/product"

export default async function ProductDetails({ params }) {
    // console.log('parmassss===',params)
    const productDetailsData = await ProductById(params.details)


    // console.log('product details data===', productDetailsData);

    return (
        <div>
            <CommonDetails item={productDetailsData && productDetailsData.data} />
            </div>
    )
}