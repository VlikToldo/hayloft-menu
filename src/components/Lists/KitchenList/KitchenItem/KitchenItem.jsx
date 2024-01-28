import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './kitchen-item.module.scss';

const PageItem = ({ name, _id, ingredients, location, image }) => {
  const defaultPhoto =
    'https://cdn-icons-png.flaticon.com/512/4054/4054617.png';
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
          <Link to={`${_id}`} state={{from: location}}>
            <Button className={styles.btnDetailes} size="sm">
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
}
