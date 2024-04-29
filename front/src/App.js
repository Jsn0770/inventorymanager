import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Product from './Pages/Product.jsx'; // Importe o componente Product
import Cart from './Pages/Cart.jsx'; // Importe o componente Cart
import Footer from './Components/Footer/Footer.jsx';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_kids.png'
import kid_banner from './Components/Assets/banner_women.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/hipercalorico' element={<ShopCategory banner={men_banner} category="hipercalorico" />} />
          <Route path='/pretreino' element={<ShopCategory banner={women_banner} category="pretreino" />} />
          <Route path='/creatina' element={<ShopCategory banner={kid_banner} category="creatina" />} />
          <Route path='/whey' element={<ShopCategory banner={kid_banner} category="whey" />} />
          <Route path='/pastadeamendoim' element={<ShopCategory banner={kid_banner} category="pastadeamendoim" />} />
          <Route path='/barrinha' element={<ShopCategory banner={kid_banner} category="barrinha" />} />
          <Route path='/multivitaminico' element={<ShopCategory banner={kid_banner} category="multivitaminico" />} />
          <Route path='/coqueteleira' element={<ShopCategory banner={kid_banner} category="coqueteleira" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
