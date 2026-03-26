import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthLoading } from '../../redux/auth';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const isAdmin = useSelector(state => state.auth.user?.role === 'admin');
  const location = useLocation();

  // Показуємо loading поки перевіряється авторизація
  if (isLoading) {
    return (
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
  }

  // Якщо користувач не авторизований, перенаправляємо на логін
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Якщо потрібні адмін права, але користувач не адмін
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
