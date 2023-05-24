import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

import style from './navbar.module.scss';

const Navbar = () => {
  return (
    <>
      <header className={style.header}>
        <nav className={style.navHeader}>
          <ul className={style.navList}>
            <Button size="sm" colorScheme="pink">
              <NavLink className={style.navLink} to="/">
                Концепція
              </NavLink>
            </Button>
            <Button size="sm" colorScheme="pink">
              <NavLink className={style.navLink} to="menu">
                Меню
              </NavLink>
            </Button>
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <div className={style.mainBox}>
          <Suspense fallback={<div>...Loading</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Navbar;
