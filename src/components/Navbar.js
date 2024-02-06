'use client'
import { GlobalContext } from '@/context';
import { adminNavOptions, navOptions } from '../utils';
import { Fragment, useContext, useEffect } from 'react'
import CommonModal from './CommonModal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import CartModal from './CartModal';

// const isAdminView = false;
// const isAuthUser = true;
// const user = {
//     role: 'admin'
// }
function NavItem({ isModalView = false, isAdminView, router }) {

    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : 'hidden'}`} id='nav-items'>
            <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium sm:mt-20  rounded-lg md:flex md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? '' : 'border border-gray-100'}`}>
                {isAdminView ?
                    (adminNavOptions.map((item) => (
                        <li key={item.id}
                            className='block cursor-pointer pl-3 pr-4 text-gray-900 rounded p-0'
                            onClick={() => router.push(item.path)}>
                            {item.label}
                        </li>
                    ))) : navOptions.map((item) => (
                        <li key={item.id} className='cursor-pointer text-gray-900 rounded p-0 block'
                            onClick={() => router.push(item.path)}>{item.label}</li>
                    ))}
            </ul>
        </div>
    )
}
const Navbar = () => {
    const { showNavModal, setShowNavModal, setShowCartModal } = useContext(GlobalContext)
    const { user, isAuthUser, setIsAuthUser, setUser, updateCurrentProduct, setUpdateCurrentProduct, showCartModal } = useContext(GlobalContext)
    // console.log('navbr===', user, isAuthUser);

    const router = useRouter();
    const pathName = usePathname()
    const isAdminView = pathName.includes('admin-view');

    const handleLogOut = () => {
        setIsAuthUser(false)
        setUser(null)
        Cookies.remove('token')
        localStorage.clear()
        router.push('/login')
    }

    const buttonStyle = 'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white';

    useEffect(() => {
        if (pathName !== '/admin-view/add-product' && updateCurrentProduct !== null) {
            setUpdateCurrentProduct(null)
        }
    }, [pathName])
    return (
        <>
            <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <div className='flex items-center cursor-pointer'>
                        <span className='self-center text-2xl font-semibold whitespace-nowrap' onClick={() => router.push('/')}>
                            Ecommercery
                        </span>
                    </div>

                    <div className="flex md:order-2 gap-2">
                        {!isAdminView && isAuthUser ? (
                            <Fragment>
                                <button className={`${buttonStyle}`} onClick={() => router.push('/account')}>Account</button>
                                <button className={`${buttonStyle}`} onClick={() => setShowCartModal(true)}>Cart</button>
                            </Fragment>
                        ) : null}
                        {user?.role === 'admin' ? (isAdminView ?
                            <button className={`${buttonStyle}`} onClick={() => router.push('/')}>client view</button> :
                            <button className={`${buttonStyle}`} onClick={() => router.push('/admin-view')}>admin view</button>) : null}
                        {isAuthUser ?
                            <button className={`${buttonStyle}`} onClick={handleLogOut}>logout</button> :
                            <button className={`${buttonStyle}`} onClick={() => router.push('/login')}>login</button>}
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded="false"
                            onClick={() => setShowNavModal(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-Rule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <NavItem isAdminView={isAdminView} router={router} />
                </div>

            </nav>
            <CommonModal
                mainContent={<NavItem isModalView={true} isAdminView={isAdminView} router={router} />}
                isModalView={true}
                showModalTitle={false}
                show={showNavModal}
                setShow={setShowNavModal} />
            {
                showCartModal && <CartModal />
            }
        </>
    )
}

export default Navbar
