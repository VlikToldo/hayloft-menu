import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {  Badge, Stack } from 'react-bootstrap';
import styles from './menu-page.module.scss';

const MenuPage = () => {

  return (
    <>
      <Stack className={styles.listBtnMenu} direction="horizontal" gap={2}>
        <Badge pill bg="primary">
          <NavLink to="bar">бар</NavLink>
        </Badge>
        <Badge pill bg="primary">
          <NavLink to="kitchen">кухня</NavLink>
        </Badge>
      </Stack>
      <Suspense fallback={<div>...Loading</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MenuPage;