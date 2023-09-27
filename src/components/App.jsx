import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import './App.scss';

import Navbar from './Navbar/Navbar';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MenuPage = lazy(() => import('../pages/MenuPage/MenuPage'));
const MoreInfoPage = lazy(() => import('../pages/MoreInfoPage/MoreInfoPage'));
const KitchenList = lazy(() => import('./KitchenList/KitchenList'));
const BarList = lazy(() => import('./BarList/BarList'));



export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage/>}/>
        <Route path="menu" element={<MenuPage/>} > 
          <Route path="bar" element={<BarList />} />
          <Route path="kitchen" element={<KitchenList />} />
          <Route path="more-info" element={<MoreInfoPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};
