import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import './App.scss';

import Navbar from './Navbar/Navbar';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MenuPage = lazy(() => import('../pages/MenuPage/MenuPage'));
const MoreInfoPage = lazy(() => import('../pages/MoreInfoPage/MoreInfoPage'));
const KitchenList = lazy(() => import('./Lists/KitchenList/KitchenList'));
const BarList = lazy(() => import('./Lists/BarList/BarList'));
const AddProduct = lazy(() => import('../pages/AddProduct/AddProduct'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />}>
          <Route path="bar" element={<BarList />} />
          <Route path="bar/:productId" element={<MoreInfoPage />} />
          <Route path="kitchen" element={<KitchenList />} />
          <Route path="kitchen/:productId" element={<MoreInfoPage />} />
        </Route>
        <Route path="add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  );
};
