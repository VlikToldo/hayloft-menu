import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.scss';

import Navbar from './Navbar/Navbar';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const MenuPage = lazy(() => import('../pages/MenuPage/MenuPage'));
const MoreInfoPage = lazy(() => import('../pages/MoreInfoPage/MoreInfoPage'));
const KitchenList = lazy(() => import('./Lists/KitchenList/KitchenList'));
const BarList = lazy(() => import('./Lists/BarList/BarList'));
const AddProduct = lazy(() => import('../pages/AddProduct/AddProduct'));
const FijiGroup = lazy(() => import('../pages/FijiGroupPage/FijiGroupPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#666',
    }}
  >
    Завантаження...
  </div>
);

export const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Публічні маршрути - доступні тільки неавторизованим користувачам */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Основні маршрути - доступні всім користувачам */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />}>
            <Route path="bar" element={<BarList />} />
            <Route path="bar/:productId" element={<MoreInfoPage />} />
            <Route path="kitchen" element={<KitchenList />} />
            <Route path="kitchen/:productId" element={<MoreInfoPage />} />
          </Route>

          {/* Сторінка додавання продуктів - тільки для адмінів */}
          <Route
            path="add-product"
            element={
              <PrivateRoute requireAdmin={true}>
                <AddProduct />
              </PrivateRoute>
            }
          />

          <Route path="fiji-group" element={<FijiGroup />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
