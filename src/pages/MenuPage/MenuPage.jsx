import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './menu-page.module.scss';
import {getAllBar} from '../../shared/api/bar'


const MenuPage = () => {

  function handleClick() {
    getAllBar()
  }

  return (
    <div>
      <ul className={styles.listBtnMenu}>
        <li className={styles.itemBtnMenu}>
        <Button variant="primary" onClick={handleClick}>
          <NavLink to="bar">бар</NavLink>
        </Button>
        </li>
        <li className={styles.itemBtnMenu}>
        <Button variant="primary">
          <NavLink to="kitchen">кухня</NavLink>
        </Button>
        </li>


      </ul>
        <Suspense fallback={<div>...Loading</div>}>
          <Outlet />
        </Suspense>
    </div>
  );
};

export default MenuPage;
