'use client'
import ComponentLevelLoader from "@/components/ComponentLevelLoader"
import { GlobalContext } from "@/context"
import { addToCart } from "@/services/cart"
import { deleteProduct } from "@/services/product"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "react-toastify"


const ProductButton = ({ item }) => {
    const { setUpdateCurrentProduct, componentLevelLoader, setComponentLevelLoader, user, setShowCartModal } = useContext(GlobalContext)
    const pathName = usePathname()
    const isAdminView = pathName.includes('admin-view')
    // console.log('buttoncomponet', isAdminView);
    const router = useRouter()

    const handleDelete = async (item) => {
        setComponentLevelLoader({ loading: true, id: item._id });
        const res = await deleteProduct(item._id)
        if (res.message) {
            toast.success(res.message, {
                position: "top-right"
            })
            router.refresh()
            setComponentLevelLoader({ loading: false, id: "" })
        }
    }

    const handleAddToCart = async (getItem) => {
        setComponentLevelLoader({ loading: true, id: getItem._id })
        // console.log('user====', user._id, getItem._id)
        const res = await addToCart({ productId: getItem._id, userId: user._id });
        // console.log('addtocart res===', res);
        if (res.success) {
            toast.success(res.message, {
                position: "top-right"
            })
            setShowCartModal(true)
            setComponentLevelLoader({ loading: false, id: '' })
        } else {
            toast.error(res.message, {
                position: "top-right"
            })
            setComponentLevelLoader({ loading: false, id: '' })
            setShowCartModal(true)
        }
    }
    return (
        isAdminView ? <>
            <button className="mt-1.5 w-full justify-center bg-black px-5 py-3 text-xs font-medium text-white uppercase tracking-wide"
                onClick={() => {
                    setUpdateCurrentProduct(item);
                    router.push('/admin-view/add-product')
                }}
            >Update</button>
            <button className="mt-1.5 w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                onClick={() => { handleDelete(item) }}
            >
                {
                    componentLevelLoader &&
                        componentLevelLoader.loading &&
                        componentLevelLoader.id === item._id ?
                        <ComponentLevelLoader
                            text={"Deleting Product"}
                            loading={componentLevelLoader && componentLevelLoader.loading}
                            color={'#ffffff'}

                        /> :
                        'Delete'
                }
            </button></> : (<>

                <button onClick={() => handleAddToCart(item)}
                    className="mt-1.5 w-full justify-center text-white text-center bg-red-700 px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >
                    {
                        componentLevelLoader && componentLevelLoader.loading &&
                            componentLevelLoader.id === item._id ? <ComponentLevelLoader
                            text={'Adding to cart'}
                            color={'#ffffff'}
                            loading={componentLevelLoader && componentLevelLoader.loading}
                        />
                            : 'Add To Cart'
                    }

                </button>
            </>)
    )
}

export default ProductButton
