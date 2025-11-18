import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'
export const Popular = () => {
  const [popularProduct,setPopular]=useState([])
  useEffect(()=>{
    fetch('http://localhost:4000/popular')
    .then((resp)=>resp.json())
    .then((data)=>{setPopular(data)})
  },[])
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN </h1>
        <hr />
        <div className="popular_item">
            {popularProduct.map((item)=>{
                return <Item key={item} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}
