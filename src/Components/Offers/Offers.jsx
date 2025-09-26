import React from 'react'
import './Offers.css'
import exclsive from '../Assets/exclusive_image.png' 
export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLERs PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclsive} alt="" />
        </div>
    </div>
  )
}
