import React, { useContext, useState, useEffect } from 'react'
import { ShopContext} from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/products/products.service'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
const axios = require('axios').default;

export const Product = () => {
  const [product, setProduct] = useState([]);
  // const {all_product} = useContext(ShopContext)
  // const product = all_product.find((e)=> e.id === Number (productId));
  const { productId } = useParams();

  async function getProduct() {
    await fetch('http://localhost:4000/products/1' ,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then((resp) => resp.json()).then((data) => {setProduct(data)});
  }

  useEffect(() => {
    getProduct()
  }, [])

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
