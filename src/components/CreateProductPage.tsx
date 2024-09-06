import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/productsSlice';
import { Product } from '../redux/types';
import './CreateProductPage.css'; 

const CreateProductPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidURL(image)) {
      alert('Пожалуйста, введите корректный URL изображения.');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      title,
      description,
      image,
      liked: false,
    };

    dispatch(addProduct(newProduct));
    navigate('/products');
  };

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="create-product-page">
      <h1>Создать новый продукт</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Название:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Изображение URL:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Создать продукт</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
