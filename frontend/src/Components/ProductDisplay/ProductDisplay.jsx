import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
 

export const ProductDisplay = (props) => {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" /> */}
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
          <div className="productdisplay-right-price-new">R${product.new_price}
            </div>
            <div className="productdisplay-right-description">
            AVISO: TESTE TESTE TESTE TESTE TESTE TESTE TESTE
            </div>
            <div className="productdisplay-right-flavor">
              <h1>Selecione o Tamanho</h1>
              <div className="productdisplay-right-flavors">
                <div>P</div>
                <div>M</div>
                <div>G</div>
                <div>GG</div>
              </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADICIONE AO CARRINHO</button>
            <p className='productdisplay-right-category'><span>Categoria:</span>Camisa, Futebol, Esporte, Real Madrid</p>
            <p className='productdisplay-right-category'><span>Tags:</span>Modern, Latest</p>
          </div>
        </div>
      </div>
    </div>
  )
  
}
export default ProductDisplay