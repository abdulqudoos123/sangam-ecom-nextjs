'use client'
import { useContext, useEffect, useState } from 'react'
import InputComponent from "@/components/formelements/InputComponent"
import SelectComponent from "@/components/formelements/SelectComponent"
import TileComponent from "@/components/formelements/TileComponent"
import { AvailableSizes, adminAddProductFormControl, firbaseStorageURL, firebaseConfig } from "@/utils"
import { initializeApp } from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { addNewProduct, updateProduct } from '@/services/product'
import { GlobalContext } from '@/context'
import { toast } from 'react-toastify'
import Notification from '@/components/Notification'
import ComponentLevelLoader from '@/components/ComponentLevelLoader'
import { useRouter } from 'next/navigation'

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firbaseStorageURL)

const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12)
    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
}
async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file)
    const storageReference = ref(storage, `ecomerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed',
            (snapshot) => { }, (error) => {
                console.log(error);
                reject(error)
            }, () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then(downloadUrl => resolve(downloadUrl))
                    .catch((error) => reject(error))
            })
    })
}

const initialFormData = {
    name: '',
    price: 0,
    description: '',
    category: 'men',
    sizes: [],
    deliveryInfo: '',
    onSale: 'no',
    imageUrl: '',
    priceDrop: 0,
}
const AdminAddProduct = () => {
    const [formData, setFormData] = useState(initialFormData)
    // console.log('formdata',formData);
    const { componentLevelLoader, setComponentLevelLoader, updateCurrentProduct, setUpdateCurrentProduct } = useContext(GlobalContext)
    // console.log('update product===', updateCurrentProduct);
    const router = useRouter()

    const handleImage = async (e) => {
        // console.log(e.target.files);
        const extractImageURL = await helperForUploadingImageToFirebase(e.target.files[0]);
        // console.log(extractImageURL);

        if (extractImageURL !== '') {
            setFormData({
                ...formData,
                imageUrl: extractImageURL
            })
        }

    }

    useEffect(() => {
        if (updateCurrentProduct !== null) {
            setFormData(updateCurrentProduct);
        }
    }, [updateCurrentProduct])


    const handleTileClick = (getCurrentItem) => {
        // console.log('item', getCurrentItem);
        let copySizes = [...formData.sizes]
        const index = copySizes.findIndex((item) => item.id === getCurrentItem.id)

        if (index === -1) {
            copySizes.push(getCurrentItem);
        } else {
            copySizes = copySizes.filter((item) => item.id !== getCurrentItem.id)
        }
        setFormData({
            ...formData,
            sizes: copySizes
        })
    }

    const handleAddProduct = async () => {
        try {
            setComponentLevelLoader({ loading: true, id: '' });
            const res = updateCurrentProduct !== null ?
                await updateProduct(formData) :
                await addNewProduct(formData)
            console.log('rssss==',res);
            if (res?.success) {
                setComponentLevelLoader({ loading: false, id: '' });
                toast.success("product created successfully", {
                    position: "top-right"
                })
                setFormData(initialFormData);
                setUpdateCurrentProduct(null)
                setTimeout(() => {
                    router.push("/admin-view/all-products")
                }, 1000)
            }
        } catch (error) {
            toast.error("not added", {
                position: "top-right"
            })
            setComponentLevelLoader({ loading: false, id: '' });
            setFormData(initialFormData);
        }

    }


    return (
        <div className='w-full mt-5 mb-0 mx-0 relative'>
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mb-0 mx-0 space-y-8">
                    <input
                        type="file"
                        accept='image/*'
                        max='1000000'
                        onChange={handleImage}
                    />
                    <div className="flex gap-2 flex-col">
                        <label>Available sizes</label>
                        <TileComponent data={AvailableSizes} selected={formData.sizes} onClick={handleTileClick} />
                    </div>
                    {
                        adminAddProductFormControl.map((controlItem) => (
                            controlItem.componentType === 'input' ?
                                <InputComponent

                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    value={formData[controlItem.id]}
                                    onchange={(e) => setFormData({
                                        ...formData,
                                        [controlItem.id]: e.target.value
                                    })}
                                /> :
                                controlItem.componentType === 'select' ?
                                    <SelectComponent
                                        label={controlItem.label}
                                        options={controlItem.options}
                                        value={formData[controlItem.id]}
                                        onchange={(e) => setFormData({
                                            ...formData,
                                            [controlItem.id]: e.target.value
                                        })}
                                    /> : null
                        ))
                    }
                    <button className="bg-black text-white w-full text-lg inline-flex justify-center items-center px-6 py-3 font-medium rounded"
                        onClick={handleAddProduct} >
                        {
                            componentLevelLoader && componentLevelLoader.loading ?
                                (<ComponentLevelLoader
                                    text={updateCurrentProduct !== null ? "Update Product" : "Adding Product"}
                                    color={"#ffffff"}
                                    loading={componentLevelLoader && componentLevelLoader.loading} />) : (updateCurrentProduct !== null ? 'Update Product' : 'Add Product')
                        }
                    </button>
                </div>

            </div>
            <Notification />
        </div>
    )
}

export default AdminAddProduct
