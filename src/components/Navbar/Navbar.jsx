import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Example from '../leftMenu/LeftMenu';
import Footer from '../Footer/Footer';
import svgBurger from './image/burger-menu-svgrepo-com.svg';

import { toggleLeftMenu } from '../../redux/utility/utility-slice';

import style from './navbar.module.scss';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(toggleLeftMenu(true));
  };

  return (
    <div className={style.divBox}>
      <header className={style.header}>
        <nav className={style.navHeader}>
          <ul className={style.navList}>
            <NavLink className={style.navLink} to="/">
              Hay<span className={style.spanBlack}>Loft</span>
            </NavLink>
            <div onClick={handleShow} style={{ cursor: 'pointer' }}>
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
