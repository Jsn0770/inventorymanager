import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import list_users_icon from '../../assets/profile.png'



const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Adicionar Produtos</p>
        </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Listar Produtos</p>
        </div>
        </Link>
        <Link to={'/listusers'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list_users_icon} alt="" />
            <p>Listar Usuários</p>
        </div>
        </Link>
    </div>
  )
}

export default Sidebar