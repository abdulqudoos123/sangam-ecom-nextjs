'use client'
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: '',
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true
}


const protectedAdminRoutes = [
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products'
]
const protectedRoutes = [
    'cart',
    'checkout',
    'account',
    'orders',
    'admin-view',
  
]
export const GlobalState = ({ children }) => {
    const [showNavModal, setShowNavModal] = useState(false)
    const [pageLevelLoader, setPageLevelLoader] = useState(false)
    const [componentLevelLoader, setComponentLevelLoader] = useState({ loading: false, id: "" })
    const [isAuthUser, setIsAuthUser] = useState(null)
    const [user, setUser] = useState(null)
    const [updateCurrentProduct, setUpdateCurrentProduct] = useState(null)
    const [showCartModal, setShowCartModal] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [address, setAddress] = useState([])
    const [addressFormData, setAddressFormData] = useState({
        fullName: '',
        city: '',
        country: '',
        address: '',
        postalCode: ''
    })
    const [checkoutFormData, setCheckoutFormData] = useState(initialCheckoutFormData)
    const [allOrdersForUser, setAllOrdersForUser] = useState([])
    const [orderDetails, setOrderDetails] = useState(null)
    const [allOrdersOfAllUsers, setAllOrdersOfAllUsers] = useState([])
    
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        // console.log('context===', Cookies.get('token'));
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const getCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            // console.log('context===', userData)
            setUser(userData);
            setCartItems(getCartItems)
        } else {
            setIsAuthUser(false)
            setUser({})
        }
    }, [Cookies])

    useEffect(() => {
        if (
            pathName !== '/register' &&
            user && Object.keys(user).length === 0
            && protectedRoutes.includes(pathName) > -1
        )
            router.push('/login');
    }, [user, pathName])

    useEffect(() => {
        if (
            user !== null && user && Object.keys(user).length > 0
            && user?.role !== 'admin' &&
            protectedAdminRoutes.indexOf(pathName) > -1
        ) router.push('/unauthorized-page')
    }, [user, pathName])

    return <GlobalContext.Provider
        value={{
            showNavModal,
            setShowNavModal,
            pageLevelLoader,
            setPageLevelLoader,
            componentLevelLoader,
            setComponentLevelLoader,
            isAuthUser,
            setIsAuthUser,
            user,
            setUser,
            updateCurrentProduct,
            setUpdateCurrentProduct,
            showCartModal,
            setShowCartModal,
            cartItems,
            setCartItems,
            address,
            setAddress,
            addressFormData,
            setAddressFormData,
            checkoutFormData,
            setCheckoutFormData,
            allOrdersForUser,
            setAllOrdersForUser,
            orderDetails,
            setOrderDetails,
            allOrdersOfAllUsers,
            setAllOrdersOfAllUsers
        }}>
        {children}
    </GlobalContext.Provider >
}