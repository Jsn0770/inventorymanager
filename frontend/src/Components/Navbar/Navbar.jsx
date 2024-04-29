import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext (ShopContext);
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>PRIME<span>STORE</span></p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Loja</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("timesnacionais")}}><Link style={{ textDecoration: 'none'}} to='/timesnacionais'>Times Nacionais</Link>{menu==="timesnacionais"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("timesestrangeiros")}}><Link style={{ textDecoration: 'none'}} to ='/timesestrangeiros'>Times Estrangeiros</Link>{menu==="timesestrangeiros"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("selecao")}}><Link style={{ textDecoration: 'none'}} to ='/selecao'>Seleções</Link>{menu==="selecao"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("chuteira")}}><Link style={{ textDecoration: 'none'}} to ='/chuteira'>Chuteiras</Link>{menu==="chuteira"?<hr/>:<></>}</li>
        </ul> 
        <div className="nav-login-cart">
            <Link to ='/login'><button>Login</button></Link>
            <Link to ='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
    </div>
  </div>
  )
}

export default Navbar