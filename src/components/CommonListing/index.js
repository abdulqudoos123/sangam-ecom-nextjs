'use client'
import React, { useEffect } from 'react'
import ProductTile from './ProductTile'
import ProductButton from './ProductButton'
import { useRouter } from 'next/navigation'
import Notification from '../Notification'

const CommonListing = ({ data }) => {
    const router = useRouter()

    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <section className='bg-white py-2 sm:py-8'>
            <div className="mx-auto max-w-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-4 space-x-4  sm:grid-cols-4 sm:gap-4 lg:mt-16">
                    {
                        data && data.length ?
                            data?.map((item) => (
                                <article className='relative felx max-w-lg mb-6 flex-col overflow-hidden border cursor-pointer'
                                    key={item.id}
                                 
                                >
                                    <ProductTile item={item} />
                                    <ProductButton item={item} />
                                </article>
                            )) : null
                    }
                </div>
            </div>
            <Notification />
        </section>
    )
}

export default CommonListing


// console.log('datata===',data);
// const dummyData = [
//     {
//         _id: "65acdabc1c747d834e83d4e8",
//         name: "t shirt",
//         description: "When it comes to effortless style, nothing beats a classic t-shirt. At…",
//         price: "557",
//         category: "men",
//         sizes: [{
//             id: 's',
//             lable: 'S'
//         },
//         {
//             id: 'm',
//             label: 'M'
//         }
//         ],
//         deliveryInfo: "free delivery",
//         onSale: "yes",
//         priceDrop: 0,
//         imageUrl: "https://www.collinsdictionary.com/images/full/tshirt_204029461_1000.jpg",
//     }
// ]