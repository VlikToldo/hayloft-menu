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
  image,
  handleScroll,
  location,
  repetitionMode,
}) => {
  const imageUrl = image
    ? `https://storage.googleapis.com/hayloftmenubucket/${image}`
    : null;

  const getMaskedParts = () => {
    if (!repetitionMode || !ingredients) return null;
    return ingredients.split(',').map((part, idx) => ({
      text: part.trim(),
      masked: idx !== 0 && Math.random() < 0.65,
    }));
  };

  const maskedParts = getMaskedParts();

  const renderIngredientContent = () => {
    if (maskedParts) {
      return maskedParts.map(({ text, masked }, idx) => (
        <span key={idx}>
          {idx > 0 && ', '}
          {masked ? (
            <span className={styles.maskedIngredient}>
              {'█'.repeat(
                Math.min(Math.max(4, Math.ceil(text.length / 3)), 10)
              )}
            </span>
          ) : (
            text
          )}
        </span>
      ));
    }
    return ingredients ? ingredients : description;
  };

  return (
    <>
      <Link
        to={_id}
        state={{ from: location }}
        onClick={handleScroll}
        className={styles.learnCardLink}
      >
        <Card className={styles.learnCard}>
          <Card.Header className={styles.headerLearnCard}>{name}</Card.Header>
          {imageUrl && (
            <div className={styles.imageContainer}>
              <Card.Img
                variant="top"
                src={imageUrl}
                alt={name}
                className={styles.cardImage}
              />
            </div>
          )}
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p className={styles.bodyTextLearnCard}>
                {renderIngredientContent()}
              </p>
            </blockquote>
            {/* <hr /> */}
            {amount && (
              <blockquote className="blockquote mb-0">
                <p className={styles.bodyAmountLearnCard}>
                  <span className={styles.spanbBodyAmountLearnCard}>
                    Вихід:
                  </span>{' '}
                  {amount}гр.
                </p>
              </blockquote>
            )}
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};

export default PageItem;
