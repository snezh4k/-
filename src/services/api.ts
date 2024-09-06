import axios from 'axios';
import { Product } from '../redux/types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
  const response = await axios.put<Product>(`${API_URL}/${product.id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
