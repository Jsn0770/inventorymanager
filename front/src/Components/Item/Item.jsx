import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                R${props.new_price}
            </div>
            <div className="item-price-old">
                {/* R${props.old_price} */}
            </div>
        </div>
    </div>
  )
  
}
export default item