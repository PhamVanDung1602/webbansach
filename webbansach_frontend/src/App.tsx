/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react';

import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import HomePage from './layouts/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './layouts/about/About';
import ProductDetail from './layouts/products/ProductDetail';
import RegisterNewUser from './layouts/user/RegisterNewUser';
import ActivateNewAccount from './layouts/user/ActivateNewAccount';
import Login from './layouts/user/Login';
import Test from './layouts/user/Test';
import AddBookForm_Admin from './layouts/admin/AddBookForm';


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
             <Route path='/register' element={<RegisterNewUser />} />
             <Route path='/activate/:email/:activationCode' element={<ActivateNewAccount />} />
             <Route path='/login' element={<Login />} />
             <Route path='/test' element={<Test />} />
             <Route path='/admin/add-book' element={<AddBookForm_Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
