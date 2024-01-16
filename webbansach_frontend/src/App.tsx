import React, { useState } from 'react';

import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ProductDetail from './layouts/products/ProductDetail';


function App() {
  const [keyword, setKeyWord] = useState('');
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar keyword={keyword} setKeyWord={setKeyWord} />
        <Routes>
             <Route path='/' element={<HomePage keyword={keyword} />} />
             <Route path='/:genreID' element={<HomePage keyword={keyword} />} />
             <Route path='/book/:bookID' element={<ProductDetail />} />
             <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
