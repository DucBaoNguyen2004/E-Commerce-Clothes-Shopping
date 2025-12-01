import React, { useContext, useState } from 'react'
import './CartItem.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItem = () => {
    const {getTotalCartItem,getTotalCartAmount,all_product,cartItem,removefromCart}=useContext(ShopContext)
    const [orderId, setOrderId] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    const handleCheckout = async () => {
        const totalAmount = getTotalCartAmount();
        if (totalAmount === 0) {
            alert("Your cart is empty!");
            return;
        }

        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
            alert("Please login to checkout!");
            return;
        }

        // Prepare products data
        const products = all_product.filter(e => cartItem[e.id] > 0).map(e => ({
            id: e.id,
            name: e.name,
            price: e.new_price,
            quantity: cartItem[e.id]
        }));

        try {
            const response = await fetch('http://localhost:4000/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken
                },
                body: JSON.stringify({
                    products: products,
                    amount: totalAmount,
                    address: { street: "123 Test St", city: "Hanoi" } // Placeholder address
                })
            });

            const data = await response.json();
            if (data.success) {
                setOrderId(data.orderId);
                setShowPayment(true);
            } else {
                alert("Failed to place order: " + data.error);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred during checkout.");
        }
    };

    // Placeholder Bank Details (Replace with yours)
    const BANK_ACCOUNT = "000000"; 
    const BANK_NAME = "MBBank";
    const ACCOUNT_NAME = "NGUYEN VAN A";
    
    // SePay QR URL
    // Format: https://qr.sepay.vn/img?acc=[ACCOUNT]&bank=[BANK]&amount=[AMOUNT]&des=[CONTENT]
    const qrUrl = orderId ? `https://qr.sepay.vn/img?acc=${BANK_ACCOUNT}&bank=${BANK_NAME}&amount=${getTotalCartAmount()}&des=DH${orderId}` : "";

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
                <button onClick={handleCheckout}>Proceed To CheckOut</button>
            </div>
            
            {showPayment && (
                <div className="payment-modal">
                    <div className="payment-content">
                        <span className="close-btn" onClick={() => setShowPayment(false)}>&times;</span>
                        <h2>Payment Information</h2>
                        <p>Please scan the QR code below to pay:</p>
                        <div className="qr-code-container">
                            <img src={qrUrl} alt="SePay QR Code" style={{maxWidth: '300px'}} />
                        </div>
                        <div className="payment-details">
                            <p><strong>Bank:</strong> {BANK_NAME}</p>
                            <p><strong>Account Number:</strong> {BANK_ACCOUNT}</p>
                            <p><strong>Account Name:</strong> {ACCOUNT_NAME}</p>
                            <p><strong>Amount:</strong> ${getTotalCartAmount()}</p>
                            <p><strong>Content:</strong> DH{orderId}</p>
                        </div>
                        <p className="note">After payment, your order will be automatically processed.</p>
                    </div>
                </div>
            )}
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
