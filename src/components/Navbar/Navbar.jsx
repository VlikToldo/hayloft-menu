import { Suspense, useState } from 'react';

import { Outlet, NavLink } from 'react-router-dom';
import Example from '../leftMenu/LeftMenu';
import Footer from '../Footer/Footer';
import svgBurger from './image/burger-menu-svgrepo-com.svg'

import style from './navbar.module.scss';

const Navbar = () => {
  const [showProp, setShowProp] = useState(false);

  return (
    <div className={style.divBox}>
      <header className={style.header}>
        <nav className={style.navHeader}>
          <ul className={style.navList}>
            <NavLink className={style.navLink} to="/">
              Hay<span className={style.spanBlack}>Loft</span>
              {/* <span className={style.spanTitle}>Version 2.0</span> */}
            </NavLink>
            <div onClick={() => showProp ? setShowProp(false) : setShowProp(true) } style={{'cursor': 'pointer'}}>
              <img src={svgBurger} alt="SVG Burger" />
            </div>
          </ul>
        </nav>
      </header>
      <main className={style.main}>
        <div className={style.mainBox}>
          <Example showProp={showProp} setShowProp={setShowProp}/>
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
