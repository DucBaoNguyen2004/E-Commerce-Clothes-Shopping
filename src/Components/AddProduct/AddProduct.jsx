import React, { useState } from 'react'
import './AddProduct.css'
import upload from'../../assets/upload_area.svg'
const AddProduct = () => {
    const [image,setimage]=useState(false)
    const[productDetails,setProductDetails]=useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""

    })
    const imageHandler =(e)=>{
        setimage(e.target.files[0])
    }
    const changeHandler =(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Tittle</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="product-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selection'>
            <option value="women">Women</option>
             <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload} className='addproduct-thumbnail-img' />
            </label>
            <input onChange={imageHandler} type="file" name='image'id='file-input'hidden/>
        </div>
        <button className='addproduct-button'>Add</button>
    </div>
  )
}

export default AddProduct