import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { BreadCrum } from '../Components/BreadCrum/BreadCrum'
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay'
import all_product from '../Components/Assets/all_product'
export const Product = () => {
  const { all_product } = useContext(ShopContext)
  const { productId } = useParams()
  const product = all_product.find((e) => e.id === Number(productId))
  console.log('context:', all_product);
console.log('params:', productId);

  return (
    <div>
      <BreadCrum product={product} />
      <ProductDisplay product={product} />
    </div>
  )
}
