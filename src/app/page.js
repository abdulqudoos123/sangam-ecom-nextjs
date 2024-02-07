'use client'
import { GlobalContext } from "@/context"
import { getAllAdminProducts } from "@/services/product"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"




export default function Home() {
  const { isAuthUser } = useContext(GlobalContext)
  const [products, setProducts] = useState([])

  const router = useRouter();

  const geAllProducts = async () => {
    const res = await getAllAdminProducts();
    // console.log('kakfakfkafkf', res)
    if (res.success) {
      setProducts(res?.data)
    }
  }

  useEffect(() => {
    geAllProducts();
  }, [])
  // console.log('productssss===',products)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Best Fashion Collection
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid excepturi nostrum sed accusamus nulla laborum culpa repellat facilis autem porro.</p>
            <button
              onClick={() => router.push('/product/listing/all-products')}
              className="mt-2 inline-block bg-black text-white px-5 py-2 rounded text-sm font-medium uppercase tracking-wide">
              expolore shop collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://burst.shopifycdn.com/photos/woman-shopping-for-clothes.jpg?width=1000&format=pjpg&exif=0&iptc=0" alt="explore shop collection" className="rounded-sm" />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4  lg:items-stretch">
            <div className="grid p-6 rounded place-content-center sm:p-8 bg-gray-200">
              <div className="max-w-md mx-auto text-center flex flex-col gap-16">
                <div >
                  <h2 className="text-xl font-bold bg-gray-700 rounded text-white sm:text-3xl ">summer sale collection</h2>
                </div>
                <button
                  onClick={() => router.push('/product/listing/all-products')}
                  className="mt-2 inline-block bg-black text-white px-5 py-2 rounded  tracking-widest text-sm font-medium uppercase">
                  shop all
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {
                  products && products.length ? products.filter(item => item.onSale === 'yes').splice(0, 2).map((productItem) => (
                    <div className=""
                      key={productItem.id}
                    // onClick={() => router.push(`/product/${productItem._id}`)}
                    >
                      <div className="p-6">
                        <img src={productItem.imageUrl} alt="product on sale" className="w-md h-80 object-cover aspect-square cursor-pointer" />
                      </div>
                      <div className="mt-4 text-start">
                        <h3>{productItem.name}</h3>
                        <p>${productItem.price}  <span>(-{productItem.priceDrop}%) Off</span> </p>
                      </div>
                    </div>)) : null
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 uppercase sm:text-3xl">
              shop by category
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block">
                <img src="https://hooh.in/cdn/shop/files/Picsart_23-07-20_13-58-02-415-PhotoRoom_2.png?v=1694107201" alt="" className="object-cover w-full aspect-square" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-white text-xl font-medium">kids</h3>
                  <button onClick={() => router.push('/product/listing/kids')} className="text-xl font-medium bg-black text-white rounded px-2">shop now</button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block">
                <img src="https://images.nexusapp.co/assets/f0/65/f1/66655912.jpg" alt="" className="object-cover w-full aspect-square" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="uppercase text-white font-bold">men</h3>
                  <button onClick={() => router.push('/product/listing/men')} className="uppercase bg-black text-white px-2 font-medium rounded">shop now</button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block">
                <img src="https://storage.makerist.de/uploads/pattern/75824/featured_image/carousel_large_featured_image_ed6d670f.jpg" alt="" className="object-cover w-full aspect-square" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="uppercase font-bold text-white">women</h3>
                  <button onClick={() => router.push('/product/listing/women')} className="uppercase bg-black text-white  px-2 rounded font-medium">shop now</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>


    </main>
  )
}
