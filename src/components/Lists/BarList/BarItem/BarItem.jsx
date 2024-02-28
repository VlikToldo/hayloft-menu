import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './bar-item.module.scss';

import PropTypes from 'prop-types';

// const { REACT_APP_FILE_URL } = process.env;

const PageItem = ({ name, _id, ingredients, location, image }) => {

  const defaultPhoto =
    'https://static.tildacdn.com/tild6132-3237-4263-a136-326436306336/_.png';
  const backgroundImage = image ? `url(https://backend-loft.onrender.com/${encodeURIComponent(image)})` : `url(${defaultPhoto})`;

  return (
    <>
      <Card className={styles.Card}>
        <div className={styles.imgContainer} style={{ backgroundImage }}>

        </div>

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{name}</Card.Title>
          <span className={styles.spanText}>Склад: </span>
          <Card.Text className={styles.text}>{ingredients}</Card.Text>
          <Link to={`${_id}`} state={{ from: location }}>
            <Button className={styles.btnDetailes} variant="primary" size="sm">
              Повна інформація
            </Button>
          </Link>
        </Card.Body>
      </Card>
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
