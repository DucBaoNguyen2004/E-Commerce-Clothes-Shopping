import React, { useEffect, useState } from "react";
export var ShopContext = React.createContext(null);
var getDefaultCart =()=>{
    var cart={}
    for(var i=0;i<300+1;i++){
        cart[i] = 0;
    }
    return cart;
}
var ShopContextProvider = (props) => {
  const [all_product,setAll_Product]=useState([])
    var [cartItem,setCartItems]=useState(getDefaultCart())
   
  useEffect(()=>{
    fetch('http://localhost:4000/getallproducts')
    .then((resp)=>resp.json())
    .then((data)=>setAll_Product(data))
    
    if(localStorage.getItem('auth-token')){
    fetch('http://localhost:4000/getcart',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      },
      body:""
    }).then((resp)=>resp.json())
    .then((data)=>setCartItems(data))
  }
  },[])
   var addToCart = (itemId) => {
    setCartItems((prev) => ({
    ...prev, [itemId]: prev[itemId] + 1
  }))
  if(localStorage.getItem('auth-token')){
    fetch('http://localhost:4000/addtocart',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'itemId':itemId})
    })
    .then((resp)=>resp.json())
    .then((data)=>console.log(data))
  }
};

    var removefromCart =(itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
    fetch('http://localhost:4000/removefromcart',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json'
      },
      body:JSON.stringify({'itemId':itemId})
    })
    .then((resp)=>resp.json())
    .then((data)=>console.log(data))
  }
    }

   var getTotalCartAmount = () => {
  var totalAmount = 0
  for (var item in cartItem) {
    if (cartItem[item] > 0) {
      var itemInfo = all_product.find(product => product.id === Number(item))
      if (itemInfo) {
        totalAmount += itemInfo.new_price * cartItem[item]
      }
    }
  }
  return totalAmount
}

    var getTotalCartItem=()=>{
        var totalitem=0
        for(var item in cartItem){
            if(cartItem[item]>0){
                totalitem+=cartItem[item]
            }
        }
        return totalitem
    }

     var contextValue = { all_product,cartItem,addToCart,removefromCart,getTotalCartAmount,getTotalCartItem}; 
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;