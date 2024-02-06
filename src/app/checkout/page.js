'use client'
import { GlobalContext } from '@/context'
import { getAllAddress } from '@/services/address'
import { callStripeSession } from '@/services/stripe'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify'
import Notification from '@/components/Notification'
import { createNewOrder } from '@/services/order'


const Checkout = () => {
    const { cartItems, address, setAddress, user, checkoutFormData, setCheckoutFormData } = useContext(GlobalContext)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [isOrderProcessing, setIsOrderProcessing] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const router = useRouter()
    const params = useSearchParams()

    const publishablekey = 'pk_test_51OeuBDJdQiWXZG8sjyJYZksh84zQC3agCEvlmxBmiHqWlN2aRmUYXrKqOmhvrOqJzFk6Ug6Ep2cJrVw0PCftRtes00L4r4TKUf';
    const stripePromise = loadStripe(publishablekey);

    // console.log('address===', address);
    // console.log('cartitems======', cartItems)

    const fetchAllAddress = async () => {
        const res = await getAllAddress(user?._id)
        // console.log('ressss====', res.data);
        if (res.success) {
            setAddress(res.data);
        }
    }

    useEffect(() => {
        if (user !== null) fetchAllAddress();
    }, [user])

    useEffect(() => {
        async function createFinalOrder() {
            const isStripe = JSON.parse(localStorage.getItem('stripe'));
            // console.log('isstripfinalorder===',isStripe)
            if (isStripe && params.get('status') === 'success' && cartItems && cartItems.length > 0) {
                setIsOrderProcessing(true);
                const getCheckoutFormData = JSON.parse(localStorage.getItem('checkoutFormData'));

                const finalCheckoutFormData = {
                    user: user?._id,
                    shippingAddress: getCheckoutFormData.shippingAddress,
                    orderItems: cartItems.map((item) => ({
                        qty: 1,
                        product: item.productId,
                    })),
                    paymentMethod: 'stripe',
                    totalPrice: cartItems.reduce((total, item) => (item.productId.price + total, 0)),
                    isPaid: true,
                    isProcessing: true,
                    paidAt: new Date()
                }
                const res = await createNewOrder(finalCheckoutFormData);
                // console.log('new order====', res)
                if (res.success) {
                    setIsOrderProcessing(false);
                    setOrderSuccess(true)
                    toast.success(res.message, {
                        position: 'top-right '
                    })
                } else {
                    setIsOrderProcessing(false);
                    setOrderSuccess(false);
                    toast.error(res.message, {
                        position: 'top-right'
                    })
                }
            }
        }
        createFinalOrder();
    }, [params.get('status'), cartItems])

    const handleSelectAddress = (getAddress) => {
        // console.log('getAddress====', getAddress)
        if (getAddress._id === selectedAddress) {
            setSelectedAddress(null);
            setCheckoutFormData({
                ...checkoutFormData,
                shippingAddress: {}
            })
            return;
        }
        setSelectedAddress(getAddress._id);
        setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {
                ...checkoutFormData.shippingAddress,
                fullName: getAddress.fullName,
                city: getAddress.city,
                country: getAddress.country,
                postalCode: getAddress.postalCode,
                address: getAddress.address
            }

        })
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const createLineItems = cartItems.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    images: [item?.productId.imageUrl],
                    name: item?.productId.name
                },
                unit_amount: item?.productId.price * 100
            },
            quantity: 1
        }))
        const res = await callStripeSession(createLineItems);
        setIsOrderProcessing(true);
        localStorage.setItem('stripe', true);
        localStorage.setItem('checkoutFormData', JSON.stringify(checkoutFormData))
        const { error } = await stripe.redirectToCheckout({
            sessionId: res.id,
        })
        console.log(error);
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         // setOrderSuccess(false);
    //         router.push('/orders')
    //     },6000)
    // }, [orderSuccess])


    if (orderSuccess) {
        return <section className='h-screen bg-gray-200'>
            <div className="mx-auto px-4 sm:px-0 lg:px-8 bg-yellow-400">
                <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                            <h1 className='font-bold text-lg'>Your payment is successfull and you will be redirected to orders page in 3 seconds</h1>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    }

    if (isOrderProcessing) {
        return <div className='w-full min-h-screen flex justify-center items-center'>
            <PulseLoader
                color={'000000'}
                loading={isOrderProcessing}
                size={30}
                date-testid='loader'
            />
        </div>
    }

    return (
        <div>

            <div className='grid lg:grid-cols-2 sm:px-10 lg:px-20 xl:px-32'>

                <div className='flex flex-col justify-start items-start'>
                    <p className='font-semibold underline capitalize text-xl  py-6'>cart summary</p>
                    <div className='space-y-3 rounded-lg border bg-white px-2 sm:px-5'>


                        {
                            cartItems && cartItems.length ? cartItems.map((cartItem) => (
                                <div key={cartItem.id} className='fex flex-col sm:flex-row rounded-lg'>
                                    <img src={cartItem && cartItem.productId && cartItem.productId.imageUrl}
                                        alt="cart image"
                                        className='m-2 border rounded-md w-28 h-24 object-cover object-center' />
                                    <div className='flex flex-col w-full p-4 text-black' >
                                        <span className='font-bold'>
                                            {cartItem && cartItem.productId && cartItem.productId.name}
                                        </span>
                                        <span className='font-bold'>
                                            {cartItem && cartItem.productId && cartItem.productId.price}
                                        </span>
                                    </div>
                                </div>
                            )) : <div> your cart is empty</div>
                        }
                    </div>
                </div>

                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p>shipping address details</p>
                    <p className="text-gray-400 font-bold">
                        complete your order by selecting address below
                    </p>
                    <div className="w-full mt-6 mx-0 mb-0 space-y-6">
                        {
                            address && address.length ?
                                address.map((item) => (
                                    <div key={item.id} className={`mt-4 border gap-2 p-3 ${item._id === selectedAddress ? 'border-red-900' : ''}`}>
                                        <p>FullName : {item.fullName}</p>
                                        <p>Address : {item.address}</p>
                                        <p>City : {item.city}</p>
                                        <p>Country :{item.country}</p>
                                        <p>PostalCode :{item.postalCode}</p>
                                        <button
                                            onClick={() => handleSelectAddress(item)}
                                            className='bg-black mr-4 text-white px-2 py-1 text-bold 
                                    tex-lg tracking-wide font-semibold rounded mt-4'>
                                            {item._id === selectedAddress ? 'selected address' : 'select address'} </button>
                                    </div>
                                )) : <p>no address found below</p>
                        }
                    </div>
                    <button
                        onClick={() => router.push('/account')}
                        className='bg-black mr-4 text-white px-2 py-1 text-bold tex-lg tracking-wide font-semibold rounded mt-4'>
                        add new address </button>
                </div>
            </div>


            <div className='mt-6 border-t border-b p-6 mb-20'>
                <div className="flex items-center justify-between">
                    <p className="text-sm mt-4 font-medium text-gray-900">
                        SubTotal
                    </p>
                    <p>
                        ${
                            cartItems && cartItems.length ? cartItems.reduce((total, item) => (parseInt(item.productId.price) + total)
                                , 0) : '0'
                        }
                    </p>
                </div>
                <div className='flex justify-between items-center border-t'>
                    <p className='font-bold text-sm'>shipping</p>
                    <p className='font-semibold text-md'>free</p>
                </div>
                <div className="flex items-center justify-between border-t">
                    <p className="text-sm mt-4 font-medium text-gray-900">
                        Total
                    </p>
                    <p>
                        ${
                            cartItems && cartItems.length ? cartItems.reduce((total, item) => (parseInt(item.productId.price) + total)
                                , 0) : '0'
                        }
                    </p>
                </div>
                <button
                    onClick={handleCheckout}
                    disabled={cartItems && cartItems.length === 0 || Object.keys(checkoutFormData.shippingAddress).length === 0}
                    className='disabled:opacity-40  bg-black mr-4 w-full py-2 text-white px-2 text-bold tex-lg tracking-wide font-semibold rounded mt-4'>
                    Checkout </button>
            </div>
            <Notification />
        </div>
    )
}

export default Checkout
