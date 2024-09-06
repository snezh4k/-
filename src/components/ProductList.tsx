import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setFilter } from '../redux/productsSlice';
import Card from './Card';
import './ProductList.css'; 

const PAGE_SIZE = 3; 

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.products.filter);
  const products = useSelector((state: RootState) => 
    filter === 'all' ? state.products.products : state.products.products.filter(p => p.liked)
  );

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (newFilter: 'all' | 'liked') => {
    dispatch(setFilter(newFilter));
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const displayedProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div>
      <h1 className="page-title">Карликовые кролики</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('all')}>Все</button>
        <button onClick={() => handleFilterChange('liked')}>Избранные</button>
        <div className="separator"></div>
        <a href="/create-product" className="create-button">Создать продукт</a>
      </div>
      <div className="product-list">
        {displayedProducts.length ? (
          displayedProducts.map(product => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          <p>Нет продуктов для отображения</p>
        )}
      </div>
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Назад
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default ProductList;
