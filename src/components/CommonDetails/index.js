'use client'
import { GlobalContext } from "@/context"
import { addToCart } from "@/services/cart"
import Link from "next/link"
import { useContext } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import ComponentLevelLoader from "../ComponentLevelLoader"
import Notification from "../Notification"


const CommonDetails = ({ item }) => {
    console.log('item====', item)
    const { user, setComponentLevelLoader, componentLevelLoader ,setShowCartModal} = useContext(GlobalContext)
    const router = useRouter()
    const handleAddToCart = async (getItem) => {
        // console.log('getItem=====', getItem)
        // console.log('uer.id====', user)
        setComponentLevelLoader({ loading: true, id:'' })
        const res = await addToCart({ productId: getItem._id, userId: user._id })
       
        if (res.success) {
            toast.success(res.message, {
                position: 'top-right'
            })
            setComponentLevelLoader({ loading: false, id: '' })
            setShowCartModal(true)
        } else {
            toast.error(res.message, {
                position: "top-right"
            })
            setComponentLevelLoader({ loading: false, id: '' })
            setShowCartModal(true)
        }
    }

    return (
        <section className="mx-auto max-w-screen-xl px-4 mt-[130px] lg:px-8">
            <div className="flex justify-end relative top-0">
                <button type="button" class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => router.push('/')}>
                    <span class="sr-only">Close menu</span>

                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="container mx-auto px-4">

                <div className="mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">

                    <div className="lg:col-span-3 lg:row-end-1">
                        <div className="lg:flex lg:items-start">
                            <div className="lg:order-2 lg:ml-5">
                                <div className="overflow-hidden rounded-lg">
                                    <img src={item?.imageUrl}
                                        alt="proudct details"
                                        className="h-full w-[450px]  object-cover"
                                    />
                                </div>

                            </div>
                            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                <div className="flex flex-row items-start lg:flex-col">
                                    <button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center">
                                        <img src={item.imageUrl}
                                            alt="proudct details"
                                            className="w-full h-full object-cover"
                                        />
                                    </button>

                                    <button type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center">
                                        <img src={item.imageUrl}
                                            alt="proudct details"
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">

                        <h1 className="sm:text-2xl font-bold text-gray-900">
                            {item.name}
                        </h1>
                        <div
                            className="mt-10 flex flex-col items-center justify-between space-y-4 border-y py-4 sm:flex-row sm:space-y-0">
                            <div className="flex items-end">
                                <h1 className="text-3xl font-bold">
                                    $ {item.price}
                                </h1>
                            </div>
                            <button className="mt-1.5 inline-block bg-black px-5 py-3 text-center text-xs font-medium tracking-wide uppercase text-white"
                                onClick={() => handleAddToCart(item)}>
                                {
                                    componentLevelLoader && componentLevelLoader.loading ?
                                        <ComponentLevelLoader 
                                            text={'adding to cart'}
                                            loading={componentLevelLoader && componentLevelLoader.loading}
                                            color={'#ffffff'}
                                        /> : '  Add to Cart'
                                }

                            </button>
                        </div>
                        <ul className="mt-8 space-y-2">
                            <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                {item.deliveryInfo}
                            </li>
                            <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                cancel anytime
                            </li>
                        </ul>
                        <div className="lg:col-span-3">
                            <div className="border-b border-gray-400">
                                <nav className="flex gap-4">
                                    <Link href='#' className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                                    >Description
                                    </Link>
                                </nav>
                            </div>
                            <div className="mt-8 flow-root sm:mt-12">
                                {item.description}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
<Notification/>
        </section>

    )
}

export default CommonDetails
