import React, { useContext, useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import drop_icon from '../Assets/nav_dropdown.png'
export const Navbar = () => {
    var [menu, setMenu] = React.useState("shop");
    var {getTotalCartItem}=useContext(ShopContext)
    var menuRef=useRef()
    var dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SHOPPINK</p>
        </div>
        <img className='drop-down' onClick={dropdown_toggle} src={drop_icon} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link> {menu==="shop"?<hr/>:<>  </>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>  {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'> Women</Link> {menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kid</Link>  {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
           <Link to='/login'><button>Login</button></Link> 
           <Link to='/cart'><img src={cart_icon} alt="" /></Link> 
            <div className="nav-cart-count">
                {getTotalCartItem()}
            </div>
        </div>
    </div>
  )
}
