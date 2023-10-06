import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './bar-item.module.scss';

import PropTypes from 'prop-types';

const PageItem = ({ name, _id, ingredients, location }) => {

 const bwrgerPhoto = 'https://klike.net/uploads/posts/2019-06/1559545617_2.jpg';
  // const defaultPhoto = 
  //   'https://cdn-icons-png.flaticon.com/512/4054/4054617.png';
  return (
    <>
      <Card className={styles.Card}>
        <div className={styles.imgContainer}>
          <img className={styles.imgProduct} src={bwrgerPhoto} alt="Продукт" />
        </div>

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{name}</Card.Title>
          <span className={styles.spanText}>Склад: </span>
          <Card.Text className={styles.text}>
            {ingredients}
          </Card.Text>
          <Link to={`${_id}`} state={{from: location}}>
            <Button className={styles.btnDetailes} variant="primary" size='sm'>Повна інформація</Button>
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

