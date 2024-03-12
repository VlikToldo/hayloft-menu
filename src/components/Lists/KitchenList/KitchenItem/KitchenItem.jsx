import { Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './kitchen-item.module.scss';
import Modal from '../../../Modal/Modal';

const PageItem = ({
  name,
  _id,
  ingredients,
  description,
  amount,
  location,
  image,
  deletePosition,
  handleScroll,
}) => {
  const [showModal, setShowModal] = useState(false);

  const defaultPhoto =
    'https://static.tildacdn.com/tild6132-3237-4263-a136-326436306336/_.png';
  const backgroundImage = image
    ? `url(https://storage.googleapis.com/hayloftmenubucket/${image})` 
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
        {amount && <span className={styles.spanAmount}>{amount}гр.</span>}
        <div className={styles.imgContainer} style={{ backgroundImage }}></div>

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{name}</Card.Title>
          <span className={styles.spanText}>Склад: </span>
          <Card.Text className={styles.text}>{ingredients ? ingredients : description}</Card.Text>
          <Link to={`${_id}`} state={{ from: location }} onClick={handleScroll}>
            <Button className={styles.btnDetailes} size="sm">
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
