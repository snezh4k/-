import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { Product } from '../redux/types';
import { removeProduct, addProduct } from '../redux/productsSlice';
import './EditProductPage.css';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) => 
    state.products.products.find((p: Product) => p.id === id)
  );

  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.image || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (product) {
      dispatch(removeProduct(product.id));
    }
    const updatedProduct: Product = {
      id: product ? product.id : Date.now().toString(),
      title,
      description,
      image,
      liked: product ? product.liked : false,
    };
    dispatch(addProduct(updatedProduct));
    navigate('/products');
  };

  if (!product) return <div>Продукт не найден</div>;

  return (
    <div className="edit-product-page">
      <h1>Редактировать продукт</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Описание:</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Изображение URL:</label>
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default EditProductPage;
