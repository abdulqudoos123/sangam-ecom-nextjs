'use client'
import { GlobalContext } from '@/context'
import { getOrderDetails } from '@/services/order'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const OrderDetails = () => {
    const { orderDetails, setOrderDetails, user, setPageLevelLoader, pageLevelLoader } = useContext(GlobalContext)

    const params = useParams();
    // console.log(params)
    const router = useRouter();

    const extractOrderDetail = async () => {
        try {
            setPageLevelLoader(true)
            const res = await getOrderDetails(params['order-details'])
            // console.log('order details====', res.data)
            if (res.success) {
                setPageLevelLoader(false)
                setOrderDetails(res.data);
                toast.success(res.message, {
                    position: 'top-right'
                })
            } else {
                setPageLevelLoader(false)
                toast.error(res.message, {
                    position: 'top-right'
                })
            }
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        extractOrderDetail();
    }, [])

    // console.log('orderdetails=====', orderDetails)

    if (pageLevelLoader) {
        <div className='w-full h-screen flex items-center justify-center'>
            <PulseLoader
                color={'#000000'}
                loading={pageLevelLoader}
                size={30}
                data-testid='loader'
            />
        </div>
    }

    return (
        <div className='py-14 md:px-6'>
            <div className="flex justify-start items-start space-y-2 flex-col">
                <h1 className='text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-900'>
                    Order #{orderDetails && orderDetails?._id}
                </h1>
                <p className='text-base font-medium leading-6 text-gray-600'>
                    {orderDetails && orderDetails.createdAt.split('T')[0]}{' '} {'   '}
                    {orderDetails && orderDetails.createdAt.split('T')[1].split('.')[0]}
                </p>
            </div>
            <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full">
                        <p className='font-bold text-lg'>Your order summary</p>
                        {
                            orderDetails && orderDetails.orderItems
                                && orderDetails.orderItems.length ? (
                                <div>
                                    {orderDetails.orderItems.map((item) => (
                                        <div key={item._id} className='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'>
                                            <div className="pb-4 md:pb-8 w-full md:w-40">
                                                <img src={item && item.product && item.product.imageUrl} alt="" className='w-full hidden md:block rounded-lg' />
                                            </div>
                                            <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                <div className="w-full flex flex-col justify-start space-y-8">
                                                    <h3 className='text-xl font-semibold leading-6 text-gray-900'>
                                                        {item && item.product && item.product.name}
                                                    </h3>
                                                </div>
                                                <div className="w-full flex justify-between space-x-8">
                                                    <h3 className='text-xl font-semibold leading-6 text-gray-900'>
                                                        ${item && item.product && item.product.price}
                                                    </h3>
                                                </div>
                                            </div>

                                        </div>))}
                                </div>
                            ) : null
                        }
                    </div>
                    <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-0 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                            <h3 className='text-xl font-semibold leading-6 text-gray-900'>Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className='text-base leading-5 text-gray-800'>Subtotal</p>
                                    <p className='text-base leading-5 text-gray-50'>{orderDetails && orderDetails.totalPrice}</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className='text-base leading-5 text-gray-800'>Shipping</p>
                                    <p className='text-base leading-5 text-gray-500'>Free</p>
                                </div>
                                <div className="flex justify-between w-full">
                                    <p className='text-base leading-5 text-gray-800'>Total</p>
                                    <p className='text-base leading-5 text-gray-50'>{orderDetails && orderDetails.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col gap-5">
                    <div className="bg-gray-50 w-full xl:w-96 flex items-center md:items-start px-4 py-6 flex-col">
                        <h3 className='text-xl font-semibold leading-6 text-gray-900'>Customer Details</h3>
                        <div className="flex flex-col justify-start items-start flex-shrink-0">
                            <div className="flex justify-start flex-col w-full md:justify-start items-start py-8 border-b border-gray-200">
                                <p className='font-semibold text-base leading-4 text-gray-900 text-left mb-6'>Name :{user?.name}</p>
                                <p className='font-semibold text-base leading-4 text-gray-900 text-left'>Email :{user?.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center xl:w-full items-stretch w-full flex-col mt-6 md:mt-0">
                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-center md:items-start">
                            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                <p className='font-bold text-lg leading-6'>Shipping Address</p>
                                <p>Address :{orderDetails && orderDetails.shippingAddress.address}</p>
                                <p>City :{orderDetails && orderDetails.shippingAddress.city}</p>
                                <p>Country :{orderDetails && orderDetails.shippingAddress.country}</p>
                                <p>PostalCode :{orderDetails && orderDetails.shippingAddress.postalCode}</p>
                            </div>

                        </div>

                    </div>
                    <button className='w-full bg-black text-white py-2 font-bold rounded-lg'
                        onClick={() => router.push('/')}
                    >Shop Again</button>
                </div>

            </div>
        </div>
    )
}

export default OrderDetails
