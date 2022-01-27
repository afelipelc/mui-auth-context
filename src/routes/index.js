import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../components/layout';
import PrivateRoute from './PrivateRoute';
import Main from '../pages/Main';
import Login from '../pages/Auth';


const Router = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<Layout />}>
      <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>}/>
    </Route>
  </Routes>
);

// <Route path="/personal" element={<PrivateRoute><Employees /></PrivateRoute>}/>

export default Router;
