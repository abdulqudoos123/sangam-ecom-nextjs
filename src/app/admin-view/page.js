'use client'
import ComponentLevelLoader from "@/components/ComponentLevelLoader"
import { GlobalContext } from "@/context"
import { getAllOrdersOfAllUsers, updateOrderStatus } from "@/services/order"
import { useContext, useEffect } from "react"
import { PulseLoader } from 'react-spinners'

const AdminView = () => {
  const { allOrdersOfAllUsers, setAllOrdersOfAllUsers, pageLevelLoader, componentLevelLoader, setPageLevelLoader, user, setComponentLevelLoader } = useContext(GlobalContext)

  async function fetchAllOrdersOfAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersOfAllUsers();
    // console.log('allorderssss===', res.data)
    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersOfAllUsers(res.data && res.data.length ? res.data.filter((item) => item.user._id !== user._id) : [])

    } else {
      setPageLevelLoader(false)
    }
  }

  const handleUpdateStatus = async (getItem) => {
    setComponentLevelLoader({ loading: true, id: getItem._id })
    const res = await updateOrderStatus({
      ...getItem,
      isProcessing: false,
    });
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: '' })
      fetchAllOrdersOfAllUsers();
    } else {
      setComponentLevelLoader({ loading: false, id: '' })
    }
  }

  useEffect(() => {
    if (user !== null) {
      fetchAllOrdersOfAllUsers();
    }

  }, [user])
  console.log('f0afaopfkpoafk', allOrdersOfAllUsers)
  if (pageLevelLoader) {
    return <div className='w-full min-h-screen flex justify-center items-center'>
      <PulseLoader
        color='black'
        loading={pageLevelLoader}
        size='25px' />
    </div>
  }


  return (
    <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-8 sm:py-10">
        <div className="flow-root">
          {
            allOrdersOfAllUsers && allOrdersOfAllUsers.length ? (
              <ul className='flex flex-col gap-4'>
                {
                  allOrdersOfAllUsers.map((item) => (
                    <li key={item._id} className='bg-gray-200 rounded shadow p-5 flex flex-col space-y-3 py-6 text-left'>
                      <div className="flex">
                        <h1 className='font-bold text-lg mb-3 flex-1'>
                          #order: {item._id}
                        </h1>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">User Name :</p>
                            <p className="mr-3 text-sm font-semibold text-gray-900">{item?.user.name}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">User Email :</p>
                            <p className="mr-3 text-sm font-semibold text-gray-900">{item?.user.email}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">Total Paid Amount :</p>
                            <p className="mr-3 text-sm font-semibold text-gray-900">{item?.totalPrice}</p>
                          </div>
                        </div>

                      </div>
                      <div className="flex gap-2">
                        {
                          item.orderItems.map((orderItem, index) => (
                            <div className='shrink-0' key={index}>
                              <img src={orderItem && orderItem.product && orderItem.product.imageUrl} alt="order item image"
                                className='w-24 h-24 max-w-full object-cover rounded-lg' />
                            </div>
                          ))
                        }
                      </div>
                      <div className="flex">
                        <button className=' mt-5 mr-5 inline-block capitalize font-bold tracking-wide rounded-lg bg-black text-white px-5 py-2'>
                          {item.isProcessing ? 'order is processing' : 'order is delivered'}
                        </button>
                        <button
                         disabled={!item.isProcessing}
                          onClick={() => handleUpdateStatus(item)}
                          className='disabled:opacity-50 mt-5 mr-5 inline-block capitalize font-bold tracking-wide rounded-lg bg-black text-white px-5 py-2'>
                          {componentLevelLoader && componentLevelLoader.loading ?
                            <ComponentLevelLoader
                              text={'updating order status'}
                              color={'#ffffff'}
                              loading={componentLevelLoader && componentLevelLoader.loading}
                            /> : 'update order Status'}
                        </button>
                      </div>
                    </li>
                  ))
                }
              </ul>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default AdminView
