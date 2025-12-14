import React, { useState } from 'react'
import { BACKEND_URL } from '../../config'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'
import { data } from 'react-router-dom'
const AddProduct = () => {
    const [image, setimage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""

    })
    const imageHandler = (e) => {
        setimage(e.target.files[0])
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
    const Add_Product = async () => {
        let resData
        let product = productDetails
        let formData = new FormData()
        formData.append('product', image)
        await fetch(`${BACKEND_URL}/upload`, {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        }).then((resp) => resp.json().then((data) => { resData = data }))
        if (resData.success) {
            product.image = resData.image_url
            console.log(product)
            await fetch(`${BACKEND_URL}/addproduct`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }).then((resp) => resp.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed")
            })
        }
    }
    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Tittle</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="product-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
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
                    <img src={image ? URL.createObjectURL(image) : upload} className='addproduct-thumbnail-img' />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => { Add_Product() }} className='addproduct-button'>Add</button>
        </div>
    )
}

export default AddProduct