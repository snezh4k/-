import React from 'react';
import { Product } from '../redux/types';
import { useDispatch } from 'react-redux';
import { toggleLike, removeProduct } from '../redux/productsSlice';
import { Link } from 'react-router-dom';
import './Card.css'; 

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLike(product.id));
  };

  const handleDelete = () => {
    dispatch(removeProduct(product.id));
  };

  return (
    <div className="card">
      <Link to={`/products/${product.id}`} className="card-link">
        <img src={product.image} alt={product.title} className="card-image" />
        <div className="card-info">
          <h2 className="card-title">{product.title}</h2>
          <p className="card-description">
            {product.description ? product.description.substring(0, 100) + '...' : 'Описание отсутствует'}
          </p>
        </div>
      </Link>
      <div className="card-actions">
        <button onClick={handleLike} className={`card-like ${product.liked ? 'liked' : ''}`}>
          {product.liked ? '❤️' : '🤍'}
        </button>
        <button onClick={handleDelete} className="card-delete">🗑️</button>
        <Link to={`/edit-product/${product.id}`} className="edit-icon">✏️</Link>
      </div>
    </div>
  );
};

export default Card;
