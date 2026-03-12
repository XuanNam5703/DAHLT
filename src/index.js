import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Blog from './component/Blog/List';
import Detail from './component/Blog/Detail';
import Index from './component/Blog/Index';

import Login from './component/Member/Login';
import Register from './component/Member/Register';
import Member from './component/Member/Index';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <BrowserRouter>

      <App>

        <Routes>

          <Route path="blog/list" element={<Blog />} />

          <Route path="blog/detail/:id" element={<Detail />} />

          <Route path="index" element={<Index />} />

          <Route path="member/login" element={<Login />} />

          <Route path="member/register" element={<Register />} />

          <Route path="member/index" element={<Member />} />



        </Routes>

      </App>

    </BrowserRouter>

  </React.StrictMode>
);

reportWebVitals();