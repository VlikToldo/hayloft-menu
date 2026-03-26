import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav, Collapse, Offcanvas, Button } from 'react-bootstrap';

import { toggleLeftMenu } from '../../redux/utility/utility-slice';
import { selectShowLeftMenu } from '../../redux/utility/utility-selectors';
import { selectIsAuthenticated, selectIsAdmin, logout } from '../../redux/auth';

import styles from './LeftMenu.module.scss';

const sidebarStyle = {
  backgroundColor: 'white',
  width: '80vw',
  maxWidth: '450px',
  minWidth: '280px',
};

const launchButton = {
  fontWeight: 700,
  position: 'fixed',
  width: '10px',
  height: '100%',
  left: '0',
  bottom: '0',
  borderRadius: '0 0 0 0',
  backgroundColor: 'rgb(117 117 117 / 0%)',
};

function ResponsiveExample() {
  const [startX, setStartX] = useState(null);
  const [open, setOpen] = useState(false);

  const showLeftMenu = useSelector(selectShowLeftMenu);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(toggleLeftMenu(false));
  };
  const handleShow = () => {
    dispatch(toggleLeftMenu(true));
  };

  //Свайп в ліво для закриття
  const handleTouchStart = event => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = event => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < -50) {
      handleClose();
    }
  };

  return (
    <>
      <button
        as="launchButton"
        style={launchButton}
        onClick={handleShow}
      ></button>

      <Offcanvas
        style={sidebarStyle}
        show={showLeftMenu}
        onHide={handleClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={styles.headerTitleMenu}>
            Hay<span className={styles.spanBlack}>Loft</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr style={{ margin: '0' }} />
        <Offcanvas.Body className={styles.BodyNavLists}>
          <Nav className={styles.navLists}>
            <NavLink
              onClick={() => handleClose()}
              className={styles.title}
              to="/"
            >
              Концепція
            </NavLink>
            {/* <NavLink
              onClick={() => handleClose()}
              className={styles.title}
              to="fiji-group"
            >
              Fiji Group
            </NavLink> */}
            <NavLink
              className={styles.title}
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-link"
              aria-expanded={open}
            >
              Меню
            </NavLink>
            <Collapse in={open}>
              <div className={styles.subTitleLists} id="example-collapse-link">
                <div>
                  <NavLink
                    onClick={() => handleClose()}
                    className={styles.subTitle}
                    to="menu/bar"
                  >
                    Бар
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    onClick={() => handleClose()}
                    className={styles.subTitle}
                    to="menu/kitchen"
                  >
                    Кухня
                  </NavLink>
                </div>
              </div>
            </Collapse>

            {/* Вкладка для авторизації/адмін панелі */}
            {isAuthenticated && isAdmin ? (
              <>
                <NavLink
                  onClick={() => handleClose()}
                  className={styles.title}
                  to="add-product"
                >
                  ➕ Додати позицію
                </NavLink>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    dispatch(logout());
                    handleClose();
                    navigate('/');
                  }}
                  className={styles.logoutBtn}
                >
                  Вийти
                </Button>
              </>
            ) : isAuthenticated ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  dispatch(logout());
                  handleClose();
                  navigate('/');
                }}
                className={styles.logoutBtn}
              >
                Вийти
              </Button>
            ) : (
              <>
                <NavLink
                  onClick={() => handleClose()}
                  className={styles.title}
                  to="login"
                >
                  📝 Увійти
                </NavLink>
                <NavLink
                  onClick={() => handleClose()}
                  className={styles.title}
                  to="register"
                >
                  ➕ Реєстрація
                </NavLink>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveExample;
