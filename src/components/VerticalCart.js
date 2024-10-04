import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import scrollTop from '../helpers/scrollTop'
import displayCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'

const VerticalCart = ({loading, data = []}) => {

    const loadingList = new Array(12).fill(null)

    const {fetchUserAddToCart} = useContext(Context);

    const handleAddToCart = async (e, id) => {
      await addToCart(e,id)
      fetchUserAddToCart()
    }
    
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
        {
          loading ? (
            loadingList.map((product,index)=>{
              return(
                  <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                      <div className='bg-purple-100 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                      </div>
                      <div className='p-4 grid w-full gap-2'>
                          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-purple-100 animate-pulse p-1 rounded-full'></h2>
                          <p className='capitalize text-slate-500 p-1 bg-purple-100 animate-pulse rounded-full'></p>
                          <div className='flex gap-3 w-full'>
                              <p className='text-red-600 font-medium p-1 bg-purple-100 w-full animate-pulse rounded-full'></p>
                              <p className='text-slate-500 line-through p-1 bg-purple-100 w-full animate-pulse rounded-full'></p>
                          </div>
                          <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-purple-100 animate-pulse'></button>
                      </div>
                  </div>
              )
          })
          ):(
            data.map((product, index)=>{
              return(
                <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px]  bg-white rounded-sm shadow-md'
                onClick={scrollTop}>
                <div className=' h-44 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                  <img src={product?.productImage[0]} alt='products' className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                </div>
                <div className='p-4 grid gap-1'>
                  <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h1>
                  <p className='capitalize text-green-600'>{product?.category}</p>
                  <div className='flex gap-3 text-sm'>
                    <p className=' '>{displayCurrency(product?.price)}</p>
                  </div>
                  <button className='px-3 py-1 bg-orange-400 rounded-full text-white text-sm hover:bg-orange-500' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to cart</button>
                </div>
                </Link>
              )
            })
          )
          
        }
      </div>
  )
}

export default VerticalCart