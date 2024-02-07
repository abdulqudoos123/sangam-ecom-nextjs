'use client'
import { GlobalContext } from "@/context";
import { DeleteFromCart, allCartItems } from "@/services/cart"

import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../ComponentLevelLoader";
import { useRouter } from "next/navigation";



const CommonCart = ({ cartItems = [] }) => {
    const { setComponentLevelLoader, user, setCartItems, componentLevelLoader, setShowCartModal } = useContext(GlobalContext)
    const router = useRouter();

    async function allCartItemsData() {
        const res = await allCartItems(user?._id)
        // console.log('allcartitems====', res)
        // console.log('resdata====', res.data)
        if (res.success) {
            setCartItems(res.data) 
        }
    }
    // console.log('cartitems====', cartItems)
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
        <section className="h-screen bg-gray-100">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                {
                                    cartItems && cartItems.length ?
                                        <ul>
                                            {cartItems.map((cartItem) => (
                                                <li key={cartItem.id}
                                                    className="flex flex-col space-y-3 py-6  text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                                                    <div className="shrink-0">
                                                        <img src={cartItem && cartItem.productId && cartItem.productId.imageUrl} alt="cart image"
                                                            className="w-24 h-24 max-w-full object-cover rounded-lgded-lg"
                                                        />
                                                    </div>
                                                    <div className="flex flex-1 flex-col justify-between">
                                                        <div className="sm:grid sm:grid-cols-2 sm:col-gap-5">
                                                            <div className="sm:pr-8 pr-4 ">
                                                                <p className="text-gray-900 font-semibold max-sm:ml-6 mt-4 max-sm:mt-0">{cartItem && cartItem.productId && cartItem.productId.name}</p>
                                                            </div>
                                                            <div className="mt-4 flex gap-3  items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                                                <p className="shrink-0 text-base w-20 sm:order-1 max-sm:ml-6 text-gray-950 sm:ml-8 sm:text-right">
                                                                    ${
                                                                        cartItem && cartItem.productId && cartItem.productId.price
                                                                    }
                                                                </p>
                                                                <button type="button"
                                                                    className="text-yellow-500 hover:underline font-semibold"
                                                                    onClick={() => handleRemoveCartItem(cartItem._id)}
                                                                >
                                                                    {
                                                                        componentLevelLoader && componentLevelLoader.loading &&
                                                                            componentLevelLoader.id === cartItem._id ?
                                                                            <ComponentLevelLoader
                                                                                loading={componentLevelLoader && componentLevelLoader.loading}
                                                                                text={'removing'}
                                                                                color={'#000000'}
                                                                            /> : 'remove'
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        : <h1 className="text-center text-red-500 text-bold text-xl">Your cart is empty!</h1>
                                }
                            </div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">Subtotal</p>
                                    <p className="text-gray-900 text-lg">
                                        ${
                                            cartItems && cartItems.length ?
                                                cartItems.reduce((total, item) => total + parseInt(item.productId.price), 0) : '0'
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">Shiping</p>
                                    <p className="text-gray-900 text-lg">
                                        $ 0
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 border-t border-b py-2">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">Total</p>
                                    <p className="text-gray-900 text-lg">
                                        ${
                                            cartItems && cartItems.length ?
                                                cartItems.reduce((total, item) => total + parseInt(item.productId.price), 0) : '0'
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="mt-5 text-center text-lg font-bold">
                                <button type="button"
                                    disabled={cartItems && cartItems.length === 0}
                                    className="flex justify-center items-center w-full bg-black text-white tracking-wider disabled:opacity-50 uppercase"
                                    onClick={() => { router.push('/checkout') }} >
                                    Checkout &rarr; </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default CommonCart
