import { Suspense, useEffect, useRef, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import Example from '../leftMenu/LeftMenu';
import Footer from '../Footer/Footer';
import svgBurger from './image/burger-menu-svgrepo-com.svg';

import { toggleLeftMenu } from '../../redux/utility/utility-slice';
import {
  logout,
  selectUser,
  selectIsAuthenticated,
  selectIsAdmin,
} from '../../redux/auth';

import style from './navbar.module.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const lastScrollY = useRef(0);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  const handleShow = () => {
    dispatch(toggleLeftMenu(true));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsHeaderCollapsed(false);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
        setIsHeaderCollapsed(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={style.divBox}>
      <header
        className={`${style.header} ${
          isHeaderCollapsed ? style.headerCollapsed : ''
        }`}
      >
        <nav className={style.navHeader}>
          <ul className={style.navList}>
            <NavLink className={style.navLink} to="/">
              Hay<span className={style.spanBlack}>Loft</span>
            </NavLink>

            {/* Інформація про користувача та кнопки авторизації */}
            <div className={style.userSection}>
              {isAuthenticated ? (
                <div className={style.userInfo}>
                  <span className={style.userName}>
                    Привіт, {user?.name || user?.email}
                    {isAdmin && <span className={style.adminBadge}>Адмін</span>}
                  </span>
                  <Button
                    size="sm"
                    onClick={handleLogout}
                    className={style.logoutBtn}
                  >
                    Вийти
                  </Button>
                </div>
              ) : (
                <div className={style.authButtons}>
                  <Button
                    size="sm"
                    as={NavLink}
                    to="/login"
                    className={`${style.authBtn} ${style.loginBtn}`}
                  >
                    Увійти
                  </Button>
                  <Button
                    size="sm"
                    as={NavLink}
                    to="/register"
                    className={`${style.authBtn} ${style.registerBtn}`}
                  >
                    Реєстрація
                  </Button>
                </div>
              )}
            </div>

            <div className={style.burgerButton} onClick={handleShow}>
              <img src={svgBurger} alt="SVG Burger" />
            </div>
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <div className={style.mainBox}>
          <Example />
          <Suspense fallback={<div>...Loading</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Navbar;
