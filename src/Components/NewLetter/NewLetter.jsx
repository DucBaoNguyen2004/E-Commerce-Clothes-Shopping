import React from 'react'
import './NewLetter.css'
export const NewLetter = () => {
  return (
    <div className='new-letter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subcribe to our newletter and stay updated </p>
        <div>
            <input type="email" placeholder='Your Email Id' />
            <button>Subcribe</button>
        </div>
    </div>
  )
}
