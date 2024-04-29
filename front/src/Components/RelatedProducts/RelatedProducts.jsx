import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

export const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Produtos Semalhantes</h1>
        <hr />
        <div className="relatedproducts-item">
            {data_product.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price.toFixed(2).replace('.', ',')}/>
            })}
        </div>
    </div>
  )
  
}
export default RelatedProducts