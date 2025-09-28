import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png' 
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
export const Footer = () => {
  return (
    <div className='footer'> 
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPINK</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About </li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icon-container">
                 <FaFacebookF />                
           </div>
            <div className="footer-icon-container">
                 <FaTwitter />                
           </div> 
            <div className="footer-icon-container">
                 <FaInstagram />                
           </div> 
            <div className="footer-icon-container">
                 <FaLinkedinIn />                
           </div>                  
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright © 2025 - All rights reserved</p> 
           </div>
    </div>
  )
}
 
                
                