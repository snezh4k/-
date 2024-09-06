
import axios from 'axios';
import { Product } from '../redux/types';

const API_URL = 'https://api.example.com'; 

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/products/${id}`);
  return response.data;
};
