import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Collapse, Offcanvas } from 'react-bootstrap';
import styles from './LeftMenu.module.scss';

const sidebarStyle = {
  margin: '80px 0 0 0',
  backgroundColor: ' white',
  width: '250px',
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
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button as="launchButton" style={launchButton} onClick={handleShow}>
      </button>

      <Offcanvas
        style={sidebarStyle}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={styles.headerTitleMenu}>HayLoft Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className={styles.navLists}>
            <NavLink onClick={() => setShow(!show)} className={styles.title} to="/">Концепція</NavLink>
            <NavLink className={styles.title}
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-link"
              aria-expanded={open}
            >
              Меню
            </NavLink>
            <Collapse in={open}>
              <div id="example-collapse-link">
                <div>
                  <NavLink onClick={() => setShow(!show)} className={styles.subTitle} to="menu/bar">Бар</NavLink>
                </div>
                <div >
                  <NavLink onClick={() => setShow(!show)} className={styles.subTitle} to="menu/kitchen">Кухня</NavLink>
                </div>
              </div>
            </Collapse>
            <NavLink onClick={() => setShow(!show)} className={styles.title} to="add-product">Додати позицію</NavLink>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveExample;
