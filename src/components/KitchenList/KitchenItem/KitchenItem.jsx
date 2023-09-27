import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './kitchen-item.module.scss'

const PageItem = ({ name, id, ingridients }) => {
  const navigate = useNavigate();

  const goToMoreInfo = () => {
    navigate('/menu/more-info');
  };
  const defaultPhoto = 'https://cdn-icons-png.flaticon.com/512/4054/4054617.png';
//   const linkPoster = 'https://image.tmdb.org/t/p/w400' + profile_path;
  return (
    <li className={styles.listItem}>
      <Card style={{ width: 'auto', height: '100%' }}>
        <Card.Img  variant="top" src={defaultPhoto} alt='qwe'/>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.title}>{name}</Card.Title>
          <Card.Text>
            <strong>Основні інгрідієнти: </strong>
            {ingridients}
          </Card.Text>

        </Card.Body>
        <Button className={styles.btnDetailes} onClick={goToMoreInfo} variant="primary">
            Детальніше
          </Button>
      </Card>
    </li>
  );
};

export default PageItem;
