import axios from 'axios'

export async function getProducts() {
  try {
    const response = await axios.get('http://localhost:4000/products');

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`http://localhost:4000/products/${id}`);

    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}