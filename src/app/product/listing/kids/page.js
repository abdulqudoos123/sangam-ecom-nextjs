import CommonListing from '@/components/CommonListing'
import React from 'react'

import { productsByCategory } from '@/services/product'

const GetKidsProducts = async () => {
    const kidsProducts = await productsByCategory('kids');
    return (
        <div>
            <CommonListing data={kidsProducts && kidsProducts.data} />
        </div>
    )
}

export default GetKidsProducts
