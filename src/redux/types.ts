import './global.css';

export interface Product {
  id: string;
  title: string; 
  description: string;
  image: string; 
  liked?: boolean;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'failed';
  filter: 'all' | 'liked';
}
