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
            <li onClick={()=>{setMenu("hipercalorico")}}><Link style={{ textDecoration: 'none'}} to='/hipercalorico'>Hipercalorico</Link>{menu==="hipercalorico"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("pretreino")}}><Link style={{ textDecoration: 'none'}} to ='/pretreino'>Pré-Treino</Link>{menu==="pretreino"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("creatina")}}><Link style={{ textDecoration: 'none'}} to ='/creatina'>Creatina</Link>{menu==="creatina"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("pastadeamendoim")}}><Link style={{ textDecoration: 'none'}} to ='/pastadeamendoim'>Pasta de Amendoim</Link>{menu==="whey"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("barrinha")}}><Link style={{ textDecoration: 'none'}} to ='/barrinha'>Barra de Proteina</Link>{menu==="barrinha"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("multivitaminico")}}><Link style={{ textDecoration: 'none'}} to ='/multivitaminico'>Multivitaminico</Link>{menu==="multivitaminico"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("coqueteleira")}}><Link style={{ textDecoration: 'none'}} to ='/coqueteleira'>Coqueteleira e Garrafas</Link>{menu==="coqueteleira"?<hr/>:<></>}</li>
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