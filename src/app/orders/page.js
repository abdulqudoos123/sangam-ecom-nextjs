'use client'
import { GlobalContext } from '@/context'
import { getAllOrdersForUser } from '@/services/order';
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { PulseLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

const Orders = () => {
  const { user, pageLevelLoader, setPageLevelLoader, allOrdersForUser, setAllOrdersForUser } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    try {
      setPageLevelLoader(true);
      const res = await getAllOrdersForUser(user?._id);
      // console.log('allordersss===', res.data)
      if (res.success) {
        setPageLevelLoader(false)
        setAllOrdersForUser(res.data)
        toast.success(res.message, {
          position: 'top-right'
        })
      } else {
        setPageLevelLoader(false)
        toast.error(res.message, {
          position: 'top-right'
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user])


  if (pageLevelLoader) {
    return <div className='w-full min-h-screen flex justify-center items-center'>
      <PulseLoader
        color='black'
        loading={pageLevelLoader}
        size='25px' />
    </div>
  }
  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {
                allOrdersForUser && allOrdersForUser.length ? (
                  <ul className='flex flex-col gap-4'>
                    {
                      allOrdersForUser.map((item) => (
                        <li key={item._id} className='bg-gray-200 rounded shadow p-5 flex flex-col space-y-3 py-6 text-left'>
                          <div className="flex">
                            <h1 className='font-bold text-lg mb-3 flex-1'>
                              #order: {item._id}
                            </h1>
                            <div className="flex items-center">
                              <p className="mr-3 text-sm font-medium text-gray-900">Total Paid Amount</p>
                              <p className="mr-3 text-2xl font-semibold text-gray-900">${item.totalPrice}</p>
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
                            <button className='mt-5 mr-5 inline-block capitalize font-bold tracking-wide rounded-lg bg-black text-white px-5 py-2'>
                              {item.isProcessing ? 'order is processing' : 'order is delivered'}
                            </button>
                            <button
                              onClick={() => router.push(`/orders/${item._id}`)}
                              className='mt-5 mr-5 inline-block capitalize font-bold tracking-wide rounded-lg bg-black text-white px-5 py-2'>
                              view order details
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
      </div>
    </section>
  )
}

export default Orders
