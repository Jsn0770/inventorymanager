import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productIdToRemove, setProductIdToRemove] = useState(null);
  const [productIdToEdit, setProductIdToEdit] = useState(null);
  const [editProductDetails, setEditProductDetails] = useState({
    name: '',
    new_price: '',
    category: '',
    quantity: '' // Adicionado o campo quantidade
  });

  const fetchInfo = async () => {
    try {
      const res = await fetch('http://localhost:4000/products/allproducts');
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      await fetch('http://localhost:4000/products/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
      });
      setShowModal(false);
      fetchInfo();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };

  const handleRemoveClick = (id) => {
    setProductIdToRemove(id);
    setShowModal(true);
  };

  const handleEditClick = (id) => {
    setProductIdToEdit(id);
    fetchProductDetails(id);
    setShowModal(true);
  };

  const fetchProductDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/products/details/${id}`);
      const data = await res.json();
      setEditProductDetails(data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do produto:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const update_product = async () => {
    try {
      await fetch('http://localhost:4000/products/updateproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: productIdToEdit,
          ...editProductDetails
        })
      });
      setShowModal(false);
      fetchInfo();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };

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
            <th>Quantidade</th> {/* Nova coluna para quantidade */}
            <th>Remover</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {allproducts.map((product, index) => (
            <tr key={index}>
              <td><img src={product.image} alt="" style={{ width: '50px' }} /></td>
              <td>{product.name}</td>
              <td>R${product.new_price}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td> {/* Exibindo a quantidade */}
              <td><Button variant="danger" onClick={() => handleRemoveClick(product.id)}><img src={cross_icon} alt="" style={{ width: '20px' }} /></Button></td>
              <td><Button variant="primary" onClick={() => handleEditClick(product.id)}>Editar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{productIdToEdit ? 'Editar Produto' : 'Confirmar Remoção'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productIdToEdit ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="name" value={editProductDetails.name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Preço</Form.Label>
                <Form.Control type="text" name="new_price" value={editProductDetails.new_price} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control type="text" name="category" value={editProductDetails.category} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control type="number" name="quantity" value={editProductDetails.quantity} onChange={handleInputChange} /> {/* Novo campo para quantidade */}
              </Form.Group>
            </Form>
          ) : (
            <p>Tem certeza de que deseja remover este produto?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          {productIdToEdit ? (
            <Button variant="primary" onClick={update_product}>
              Salvar Alterações
            </Button>
          ) : (
            <Button variant="primary" onClick={() => remove_product(productIdToRemove)}>
              Remover
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListProduct;
