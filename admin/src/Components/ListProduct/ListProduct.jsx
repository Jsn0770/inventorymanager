import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id})
    });
    setShowModal(false);
    fetchInfo();
  }

  const handleRemoveClick = (id) => {
    setProductIdToRemove(id);
    setShowModal(true);
  }

  return (
    <Container>
      <h1>Lista de Produtos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {allproducts.map((product, index) => (
            <tr key={index}>
              <td><img src={product.image} alt="" style={{width: '50px'}} /></td>
              <td>{product.name}</td>
              <td>R${product.new_price}</td>
              <td>{product.category}</td>
              <td><Button variant="danger" onClick={() => handleRemoveClick(product.id)}><img src={cross_icon} alt="" style={{width: '20px'}} /></Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja remover este produto?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => remove_product(productIdToRemove)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListProduct;
