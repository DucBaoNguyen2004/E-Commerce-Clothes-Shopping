import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
export const Navbar = () => {
    var [menu, setMenu] = React.useState("shop");
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPINK</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}>Shop <hr/></li>
            <li onClick={()=>{setMenu("mens")}}>Men</li>
            <li onClick={()=>{setMenu("womens")}}>Women</li>
            <li onClick={()=>{setMenu("kids")}}>Kid</li>
        </ul>
        <div className="nav-login-cart">
            <button>Login</button>
            <img src={cart_icon} alt="" />
            <div className="nav-cart-count">
                0
            </div>
        </div>
    </div>
  )
}
