'use client'
import CommonCart from '@/components/CommonCart'
import { PulseLoader } from 'react-spinners';
import { GlobalContext } from '@/context';
import { allCartItems } from '@/services/cart';
import { useContext, useEffect } from 'react';


const Cart = () => {
    const { cartItems, setCartItems, user, pageLevelLoader,setComponentLevelLoader, setPageLevelLoader } = useContext(GlobalContext)
    async function allCartItemsData() {
        try {
            setPageLevelLoader(true)
            const res = await allCartItems(user?._id)
            // console.log('================',res)
            if (res.success) {
                setCartItems(res?.data);
                setPageLevelLoader(false)
                localStorage.setItem('cartItems', JSON.stringify(res.data))
            }
        } catch (error) {
            console.log(error);
        }

    }
    // console.log('cartite===',cartItems)
    useEffect(() => {
        if (user !== null) allCartItemsData();

    }, [user])
    // console.log('cartitems cartpate===',cartItems)

    if (pageLevelLoader) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <PulseLoader
                color={'#000000'}
                loading={pageLevelLoader}
                size={30}
                data-testid="loader"
            />

        </div>
    }
    return (
        <>
            <CommonCart cartItems={cartItems} />
        </>
    )
}

export default Cart;
