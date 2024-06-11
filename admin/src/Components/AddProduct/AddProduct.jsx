import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "timesnacionais",
    new_price: "",
    quantity: "" // Adicionado o campo quantidade
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data; });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        if (data.success) {
          toast.success("Produto adicionado com sucesso!");
        } else {
          toast.success("Produto adicionado com sucesso!.");
        }
      }).catch(() => {
        toast.error("Erro ao adicionar o produto. Por favor, tente novamente.");
      });
    } else {
      toast.error("Erro ao adicionar o produto. Por favor, tente novamente.");
    }
  };

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Nome do Produto</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Escreva aqui' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Preço</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Escreva aqui' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Quantidade</p> {/* Novo campo de quantidade */}
        <input value={productDetails.quantity} onChange={changeHandler} type="number" name='quantity' placeholder='Escreva aqui' />
      </div>
      <div className="addproduct-itemfield">
        <p>Categoria</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
          <option value="timesnacionais">Times Nacionais</option>
          <option value="timesestrangeiros">Times Estrangeiros</option>
          <option value="selecao">Seleções</option>
          <option value="chuteira">Chuteiras</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt="upload_area" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={() => { Add_Product(); }} className='addproduct-btn'>Adicionar</button>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
