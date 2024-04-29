import React from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

export const NewCollections = () => {
  return (
    <div className='new-collections'>
       <h1>NOVOS PRODUTOS</h1>
       <hr />
       <div className="collections">
        {new_collection.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price.toFixed(2).replace('.', ',')}/>;
        })}
        </div>   
    </div>
  )
  
}
export default NewCollections
