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
  position: 'fixed',
  width: '15px',
  height: '100px',
  left: '0',
  bottom: '2px',
  borderRadius: '0 5px 5px 0',
  backgroundColor: 'silver',
};

function ResponsiveExample() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button as="launchButton" style={launchButton} onClick={handleShow}>
        {'<'}
      </button>

      <Offcanvas
        style={sidebarStyle}
        show={show}
        onHide={handleClose}
        responsive="sm"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>HayLofy Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className={styles.navLists}>
            <NavLink  className={styles.title} to="/">Концепція</NavLink>
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
                  <NavLink className={styles.subTitle} to="menu/bar">Бар</NavLink>
                </div>
                <div >
                  <NavLink className={styles.subTitle} to="menu/kitchen">Кухня</NavLink>
                </div>
              </div>
            </Collapse>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ResponsiveExample;
