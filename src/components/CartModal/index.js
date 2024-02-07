'use client'
import React, { Fragment, useContext, useEffect } from 'react'
import CommonModal from '../CommonModal'
import { GlobalContext } from '@/context'
import { DeleteFromCart, allCartItems } from '@/services/cart'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import ComponentLevelLoader from '../ComponentLevelLoader'

const CartModal = () => {
    const { showCartModal, setShowCartModal, user, cartItems, setCartItems, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext)
    const router = useRouter();
    async function allCartItemsData() {
        const res = await allCartItems(user?._id)
        // console.log('allcartitems====', res)
        // console.log('resdata====', res.data)
        if (res.success) {
          const updatedData =  res.data && res.data.length
            ? res.data.map((item) => ({
                ...item,
                productId: {
                  ...item.productId,
                  price:
                    item.productId.onSale === "yes"
                      ? parseInt(
                          (
                            item.productId.price -
                            item.productId.price * (item.productId.priceDrop / 100)
                          ).toFixed(2)
                        )
                      : item.productId.price,
                },
              }))
            : [];
            setCartItems(updatedData);
            localStorage.setItem('cartItems', JSON.stringify(updatedData))
        }
    }
// console.log('usersss===',user)
    useEffect(() => {
        if (user !== null) allCartItemsData();

    }, [user])

    const handleRemoveCartItem = async (cartItemId) => {
        setComponentLevelLoader({ loading: true, id: cartItemId })
        const res = await DeleteFromCart(cartItemId);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.success(res.message, {
                position: "top-right"
            })
            allCartItemsData();
        } else {
            setComponentLevelLoader({ loading: false, id: '' })
            toast.error(res.message, {
                position: "top-right"
            })
        }
    }
    return (
        <>
            <CommonModal
                showButtons={true}
                show={showCartModal}
                setShow={setShowCartModal}
                mainContent={
                    cartItems && cartItems.length ?
                        <ul role='list' className='-my-6 divide-y divide-gray-300'>
                            {
                                cartItems.map((cartItem) => (
                                    <li key={cartItem.id} className='flex py-6'>
                                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img src={cartItem && cartItem.productId.imageUrl} alt="cart image" className='h-full w-full object-cover object-center' />

                                        </div>
                                        <div className='ml-4 flex flex-1 flex-col'>
                                            <div className='flex justify-between flex-col text-base font-medium text-gray-900'>
                                                <h3>{cartItem && cartItem.productId.name}</h3>
                                                <p className='text-gray-600 text-sm'>$&nbsp;{cartItem && cartItem.productId.price}</p>

                                            </div>
                                            <div className='flex flex-1 items-center justify-between text-sm'>
                                                <button type='button'
                                                    className='text-sm underline text-yellow-500'
                                                    onClick={() => handleRemoveCartItem(cartItem._id)}
                                                >
                                                    {
                                                        componentLevelLoader && componentLevelLoader.loading &&
                                                            componentLevelLoader.id === cartItem._id ?
                                                            <ComponentLevelLoader
                                                                text={'removing item'}
                                                                loading={componentLevelLoader && componentLevelLoader.loading}
                                                                color={'#000000'}
                                                            /> : 'Remove'
                                                    }

                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                ))
                            }
                        </ul>
                        : null
                }
                buttoncomponent={
                    <Fragment>
                        <div className='flex flex-col justify-center align-center'>
                            <button className=' bg-black text-white mb-2 py-2 font-bold tracking-wide font-serif'
                                onClick={() => {

                                    router.push('/cart')
                                    setShowCartModal(false)
                                }}>
                                Go To Cart
                            </button>
                            <button

                                className=' bg-black text-white py-2 tracking-wide font-bold disabled:opacity-50'
                                disabled={cartItems && cartItems.length === 0}
                                onClick={() => {
                                    router.push('/checkout')
                                    setShowCartModal(false)
                                }}
                            >
                                Checkout
                            </button>
                            <div className='flex justify-center mt-3 text-sm'>
                                <button type='button'
                                    className='text-gray-700'>
                                    Continue Shoping
                                    <span aria-hidden='true'>&rarr;</span>
                                </button>
                            </div>
                        </div>
                    </Fragment>
                }
            />
        </>
    )
}

export default CartModal
