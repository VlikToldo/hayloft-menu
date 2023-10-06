// LearnItemForList
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import styles from './kitchen-item.module.scss';

const PageItem = ({ name, _id, ingredients }) => {

  return (
    <>
    <Link to={_id}>
    <Card >
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {ingredients}
          </p>
        </blockquote>
      </Card.Body>
    </Card>
    </Link>

    </>
  );
};

export default PageItem;