import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Example from '../leftMenu/LeftMenu';

import style from './navbar.module.scss';

const Navbar = () => {
  return (
    <>
      <header className={style.header}>
        <nav className={style.navHeader}>
          <ul className={style.navList}>
            <NavLink className={style.navLink} to="/">
              <h2>Hayloft</h2>
              <span className={style.spanTitle}>Version 2.0</span>
            </NavLink>

            {/* <Button size="sm" colorScheme="pink">
              <NavLink className={style.navLink} to="menu">
                Меню
              </NavLink>
            </Button> */}
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
    </>
  );
};

export default Navbar;
