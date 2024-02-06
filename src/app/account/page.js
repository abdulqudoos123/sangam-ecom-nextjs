'use client'
import ComponentLevelLoader from '@/components/ComponentLevelLoader'
import Notification from '@/components/Notification'
import InputComponent from '@/components/formelements/InputComponent'
import { GlobalContext } from '@/context'
import { addNewAddress, deleteAddress, getAllAddress, updateAddress } from '@/services/address'
import { addNewFormControls } from '@/utils'
import { useRouter } from 'next/navigation'

import React, { useContext, useEffect, useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { toast } from 'react-toastify'


const Account = () => {
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [currentAddressEditId, setCurrentAddressEditId] = useState(null)
  const { user, address, setAddress, addressFormData, setAddressFormData, pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext)
  // console.log('user========', user)
  const router = useRouter();

  const handleAddOrUpdateAddress = async () => {
    setComponentLevelLoader({ loading: true, id: '' })
    const res = currentAddressEditId !== null ?

      await updateAddress({ ...addressFormData, _id: currentAddressEditId })
      : await addNewAddress({ ...addressFormData, userId: user?._id });
    // console.log('==============',res)

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.success(res.message, {
        position: 'top-right'
      })
      setAddressFormData({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
      })
      allAddressData();
      setCurrentAddressEditId(null)
    } else {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.error(res.message, {
        position: 'top-right'
      })
      setAddressFormData({
        fullName: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
      })
    }
  }
  const allAddressData = async () => {
    // console.log('user========', user)
    setPageLevelLoader(true);
    const res = await getAllAddress(user?._id);
    // console.log('all addressesss', res.data)
    if (res.success) {
      setPageLevelLoader(false);
      setAddress(res.data);
    }
  }
  useEffect(() => {
    if (user !== null) allAddressData();

  }, [user])
  const handleUpdateAddress = (currentAddress) => {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: currentAddress.fullName,
      address: currentAddress.address,
      city: currentAddress.city,
      country: currentAddress.country,
      postalCode: currentAddress.postalCode
    });
    setCurrentAddressEditId(currentAddress._id)
  }

  const handleDeleteAddress = async (itemId) => {
    setComponentLevelLoader({ loading: true, id: itemId })
    // console.log('itemid====', itemId)
    const res = await deleteAddress(itemId)
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.success(res.message, {
        position: 'top-right'
      })
      allAddressData();
    } else {
      setComponentLevelLoader({ loading: false, id: '' })
      toast.error(res.message, {
        position: 'top-right'
      })
    }
  }
  return (
    <section className='mx-auto bg-gray-200 px-4 sm:px-6 lg:px-8'>
      <div className="bg-white shadow">
        <div className="p-6 sm:p-12">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            images
          </div>
          <div className="flex flex-col flex-1">
            <h4 className='text-lg font-semibold text-center md:text-left'>
              {user?.name}
            </h4>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
          </div>
          <button
            onClick={() => router.push('/orders')}
            className='bg-black text-white px-2 py-1 text-bold tex-lg tracking-wide font-semibold rounded mt-4'>View Your Orders</button>
          <h1 className='mt-3 text-lg font-semibold capitalize'>Your addresses :</h1>
          {
            pageLevelLoader ? (
              <PulseLoader
                color='black'
                loading={pageLevelLoader}
                size='25px' />
            ) :
              (
                <div className='mt-4 flex flex-col'>
                  {
                    address && address.length ? address.map((item) => (
                      <div key={item.id} className='mt-4 border gap-2 p-3'>
                        <p>FullName : {item.fullName}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country :{item.country}</p>
                        <p>PostalCode :{item.postalCode}</p>
                        <button className='bg-black mr-4 text-white px-2 py-1 text-bold tex-lg tracking-wide font-semibold rounded mt-4'
                          onClick={() => handleUpdateAddress(item)}
                        >
                          Update
                        </button>
                        <button className='bg-black text-white px-2 py-1 text-bold tex-lg tracking-wide font-semibold rounded mt-4'
                          onClick={() => handleDeleteAddress(item._id)}
                        >
                          {
                            componentLevelLoader && componentLevelLoader.loading &&
                              componentLevelLoader.id === item._id ?
                              <ComponentLevelLoader
                                loading={componentLevelLoader && componentLevelLoader.loading}
                                text={'Deleting'}
                                color={'#ffffff'}
                              /> : 'Delete'
                          }
                        </button>
                      </div>))
                      : <p>no address found! please add a new address below</p>
                  }



                </div>
              )
          }
          <button className='bg-black text-white px-2 capitalize py-1 text-bold tex-lg tracking-wide font-semibold rounded mt-4'
            onClick={() => setShowAddressForm(!showAddressForm)}
          >
            {showAddressForm ? 'Hide Address Form' : 'Add New Address'}
          </button>
          {
            showAddressForm ? (<div className='flex flex-col mt-5 justify-center items-center pt-4'>
              <div className="w-full mt-6 mx-0 mb-0 space-y-8">
                {
                  addNewFormControls.map((controlItem) => (

                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onchange={(e) => setAddressFormData({
                        ...addressFormData,
                        [controlItem.id]: e.target.value
                      })}
                    />))
                }
              </div>
              <button className='bg-black text-white px-6 mt-6 capitalize py-1 text-bold tex-lg tracking-wide font-semibold rounded'
                onClick={handleAddOrUpdateAddress}
              >
                {
                  componentLevelLoader && componentLevelLoader.loading ?
                    <ComponentLevelLoader
                      loading={componentLevelLoader && componentLevelLoader.loading}
                      text={'Saving'}
                      color={'#ffffff'}
                    /> : 'Save'
                }

              </button>
            </div>) : null
          }
        </div>
      </div>
      <Notification />
    </section>

  )
}

export default Account
