import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Product } from '../redux/types'; 
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const product = useSelector((state: RootState) => 
    state.products.products.find((p: Product) => p.id === id) 
  );

  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className="product-page">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} className="product-image" /> 
      <p>{product.description}</p> 
      <Link to="/" className="back-link">На главную</Link> 
    </div>
  );
};

export default ProductPage;
