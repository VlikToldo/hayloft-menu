// LearnItemForList
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './learn-item.module.scss';

const PageItem = ({
  name,
  _id,
  ingredients,
  amount,
  description,
  handleScroll,
  location,
}) => {
  return (
    <>
      <Link to={_id} state={{ from: location }} onClick={handleScroll}>
        <Card>
          <Card.Header className={styles.headerLearnCard}>{name}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p className={styles.bodyTextLearnCard}>{ingredients ? ingredients : description}</p>
            </blockquote>
            {/* <hr /> */}
            {amount && <blockquote className="blockquote mb-0">
              <p className={styles.bodyAmountLearnCard}><span className={styles.spanbBodyAmountLearnCard}>Вихід:</span> {amount}гр.</p>
            </blockquote>}
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};

export default PageItem;
