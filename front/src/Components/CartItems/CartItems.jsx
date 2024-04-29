import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
  const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Produtos</p>
        <p>Nome</p>
        <p>Preço</p>
        <p>Quantidade</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      {all_product.map((e) =>{
        if(cartItems[e.id]>0)
        {
          return <div>
          <div className="cartitems-format cartitems-format-main">
            <img src={e.image} alt="" className='carticon-product-icon' />
            <p>{e.name}</p>
            <p>R${e.new_price.toFixed(2).replace('.', ',')}</p>
            <button className ='cartitems-quantity'>{cartItems[e.id]}</button>
            <p>R${(e.new_price * cartItems[e.id]).toFixed(2).replace('.', ',')}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
          </div>
          <hr />
        </div>
        }
      })}
      <div className="cartitems-down">
      <div className="cartitems-total">
        <h1>Carrinho</h1>
        <div>
        <div className="cartitems-total-item">
          <p>Valor Parcial</p>
          <p>R${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
          <p>Taxa de Frete</p>
          <p>Grátis</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
          <h3>Total</h3>
          <h3>R${getTotalCartAmount()}</h3>
        </div>
        </div>
        <button>PROSSIGA PARA COMPRA</button>
      </div>
      <div className="cartitems-promocode">
        <p>Se você tem o código de promoção, insira-o aqui</p>
        <div className="cartitems-promobox">
          <input type="text" placeholder='codigo de promoção' />
          <button>Enviar</button>
        </div>
      </div>
      </div>
    </div>
  )
  
}
export default CartItems