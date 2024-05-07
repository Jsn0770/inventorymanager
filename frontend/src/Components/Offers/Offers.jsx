import React from 'react'
import './Offers.css'
// import exclusive_image from '../Assets/whey_100 _max.png'

export const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Ofertas</h1>
        <h1>Exclusivas para você</h1>
        <p>UM DE NOSSOS MELHORES PRODUTOS</p>
        <button>Veja Agora</button>
      </div>
      {/* <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div> */}
    </div>
  )
  
}
export default Offers
