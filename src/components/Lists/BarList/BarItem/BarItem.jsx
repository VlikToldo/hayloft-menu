import { Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './bar-item.module.scss';
import Modal from '../../../Modal/Modal';

import PropTypes from 'prop-types';

const PageItem = ({
  name,
  _id,
  ingredients,
  location,
  image,
  deletePosition,
  handleScroll,
}) => {
  const [showModal, setShowModal] = useState(false);

  const defaultPhoto =
    'https://static.tildacdn.com/tild6132-3237-4263-a136-326436306336/_.png';
  const backgroundImage = image
    ? `url(https://storage.googleapis.com/hayloftmenubucket/1709644351922-916256172_%C3%90%C2%A1%C3%90%C2%BD%C3%90%C2%B8%C3%90%C2%BC%C3%90%C2%BE%C3%90%C2%BA%20%C3%91%C2%8D%C3%90%C2%BA%C3%91%C2%80%C3%90%C2%B0%C3%90%C2%BD%C3%90%C2%B0%202024-02-28%20%C3%90%C2%B2%2015.26.21.png)`
   // ? `url(https://storage.cloud.google.com/hayloftmenubucket/${image})`
    : `url(${defaultPhoto})`;

  const modalShow = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const removePosition = async id => {
    closeModal();
    await deletePosition(id);
  };

  return (
    <>
      <Card className={styles.Card}>
        <button className={styles.cardDel} onClick={modalShow}>
          &otimes;
        </button>
        <div className={styles.imgContainer} style={{ backgroundImage }}></div>

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{name}</Card.Title>
          <span className={styles.spanText}>Склад: </span>
          <Card.Text className={styles.text}>{ingredients}</Card.Text>
          <Link to={`${_id}`} state={{ from: location }} onClick={handleScroll}>
            <Button className={styles.btnDetailes} variant="primary" size="sm">
              Повна інформація
            </Button>
          </Link>
        </Card.Body>
      </Card>
      {showModal && (
        <Modal close={closeModal}>
          <div className={styles.modalBox}>
            <div className={styles.modalHead}>
              <span>Бажаєте видалити позицію?</span>
            </div>
            <hr />
            <div className={styles.modalMain}>
              <button
                className={styles.modaButton}
                style={{ backgroundColor: 'green' }}
                onClick={() => removePosition(_id)}
              >
                Так
              </button>{' '}
              <button
                className={styles.modaButton}
                style={{ backgroundColor: 'red' }}
                onClick={closeModal}
              >
                Скасувати
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PageItem;

PageItem.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.object,
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
};
