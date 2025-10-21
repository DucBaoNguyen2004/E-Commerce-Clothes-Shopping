import React, { useContext } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItem = () => {
    var {getTotalCartItem,getTotalCartAmount,all_product,cartItem,removefromCart}=useContext(ShopContext)
  return (
    <div className='cartitem'>
        <div className="cartitem-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItem[e.id]>0){
                return  <div>
            <div className="caritem-format cartitem-format-main">
                <img className="carticon-product-icon"src={e.image} alt="" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className='cartitem-quantity'>{cartItem[e.id]}</button>
                <p>${e.new_price*cartItem[e.id]}</p>
                <img className='cartitem-remove' src={remove_icon} onClick={()=>{removefromCart(e.id)}} alt="" />
            </div>
            <hr />
        </div>               
            }
            return null
        })}
        <div className="cartitem-down">
            <div className="cartitem-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitem-total-item">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitem-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                   <div className="cartitem-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                   </div>
                </div>
                <button>Proceed To CheckOut</button>
            </div>
            <div className="cartitem-promocode">
                <p>If you have a promocode, Enter it here</p>
                <div className="cartitem-promobox">
                    <input type="text" placeholder='Promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
