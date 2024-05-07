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
            AVISO: Todos os servidores multijogador para NBA 2K22 serão desligados em 31/12/2023. Após esta data, todas as funções do jogo que necessitam dos servidores online não funcionarão mais.
            </div>
            <div className="productdisplay-right-flavor">
              <h1>Selecione o Sabor</h1>
              <div className="productdisplay-right-flavors">
                <div>Morango</div>
                <div>Chocolate</div>
                <div>Baunilha</div>
                <div>Cookies</div>
                <div>Doce de Leite</div>
              </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>ADICIONE AO CARRINHO</button>
            <p className='productdisplay-right-category'><span>Categoria:</span>Whey, Whey 100%, Integral Medica</p>
            <p className='productdisplay-right-category'><span>Tags:</span>Fitness, Latest</p>
          </div>
        </div>
      </div>
    </div>
  )
  
}
export default ProductDisplay