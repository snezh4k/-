import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductPage from './components/ProductPage';
import CreateProductPage from './components/CreateProductPage';
import EditProductPage from './components/EditProductPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
};

export default App;
