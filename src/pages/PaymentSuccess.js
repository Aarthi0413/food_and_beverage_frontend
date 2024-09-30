import React from 'react'
import { Link } from'react-router-dom'
import successImage from '../assest/check.gif'

const PaymentSuccess = () => {
  return (
    <div className=' w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 font-serif m-2 rounded'>
        <img src={successImage} alt='success' width={150} height={150} className='mix-blend-multiply'/>
        <p className='text-green-700 font-bold text-lg'>Payment Successfully</p>
        <Link to={"/order"} className='px-4 py-2 bg-green-700 rounded-full text-white my-2 hover:bg-green-800'>View Order</Link>
    </div>
  )
}

export default PaymentSuccess