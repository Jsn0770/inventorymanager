import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal,} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToRemove, setUserIdToRemove] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const removeUser = async (id) => {
    await fetch('http://localhost:4000/removeuser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    setShowModal(false);
    fetchUsers();
  };

  const handleRemoveClick = (id) => {
    setUserIdToRemove(id);
    setShowModal(true);
  };

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemoveClick(user.id)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Remoção</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tem certeza de que deseja remover este usuário?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => removeUser(userIdToRemove)}>
            Remover
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListUsers;
