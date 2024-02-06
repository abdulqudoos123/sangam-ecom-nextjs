import { useRouter } from "next/navigation"

const ProductTile = ({ item }) => {
    const router= useRouter();
    return (
        <div>
            <div className="overfow-hidden max-w-lg h-80">
                <img
                    src={item?.imageUrl}
                    alt="product image"
                    className="w-full h-full object-fit transition-all duration-300 group-hover:scale-125"
                    onClick={() => router.push(`/product/${item._id}`)}
                />
            </div>
            {
                item.onSale === 'yes' ?
                    <div className="absolute top-0 m-2 rounded-full bg-black">
                        <p className="rouded-full p-1 text-[8px] font-bold uppercase text-white sm:py-1 sm:px-3"
                        >Sale</p>
                    </div>
                    : null
            }
            <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
                <div className="mb-2 flex">
                <p className={`mr-3 text-xm font-semifold ${item.onSale === 'yes' ? 'line-through text-red-400':'' }`}>$ {`${item.price}`}</p>
                    {
                        item.onSale === 'yes' ? <p className={`mr-3 text-xm font-semibold `}>$ {`${(item.price - item.price * (item.priceDrop/100)).toFixed(2)}`}</p> : null
                    }
                    {
                        item.onSale === 'yes' ?  <p className={`mr-3 text-xm font-semifold`}>{`-(${item.priceDrop})%Off`}</p> :null 
                    }
                   
                </div>
                <h3 className="mb-2 text-gray-400 text-sm">{item.name}</h3>
            </div>
        </div>
    )
}

export default ProductTile
