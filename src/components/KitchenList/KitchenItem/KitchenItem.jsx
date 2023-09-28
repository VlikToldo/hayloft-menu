import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './kitchen-item.module.scss';

const PageItem = ({ name, id, ingridients }) => {
  const navigate = useNavigate();

  const goToMoreInfo = () => {
    navigate('/menu/more-info');
  };
 const bwrgerPhoto = 'https://klike.net/uploads/posts/2019-06/1559545617_2.jpg';
  // const defaultPhoto = 
  //   'https://cdn-icons-png.flaticon.com/512/4054/4054617.png';
  return (
    <li  className={styles.listItem}>
      <Card className={styles.Card}>
        <div className={styles.imgContainer}>
          <img className={styles.imgProduct} src={bwrgerPhoto} alt="Продукт" />
        </div>

        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{name}</Card.Title>
          <span className={styles.spanText}>Склад: </span>
          <Card.Text className={styles.text}>
            {ingridients}
          </Card.Text>
          <Button onClick={goToMoreInfo} className={styles.btnDetailes} variant="primary" size='sm'>Повна інформація</Button>
        </Card.Body>
        
      </Card>
    </li>
  );
};

export default PageItem;
