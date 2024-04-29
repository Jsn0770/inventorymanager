import React, { useContext, useState} from 'react'
import { ShopContext} from '../Context/ShopContext'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'

export const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productId} = useParams(); 
  const product = all_product.find((e)=> e.id === Number(productId));
  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </div>
  )
  
}
export default Product
