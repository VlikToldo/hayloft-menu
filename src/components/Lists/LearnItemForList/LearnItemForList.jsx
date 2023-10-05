// LearnItemForList
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import styles from './kitchen-item.module.scss';

const PageItem = ({ name, id, ingredients }) => {
  const navigate = useNavigate();

  const goToMoreInfo = () => {
    navigate('/menu/more-info');
  };
  return (
    <li onClick={goToMoreInfo}>
    <Card>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {ingredients}
          </p>
        </blockquote>
      </Card.Body>
    </Card>
    </li>
  );
};

export default PageItem;