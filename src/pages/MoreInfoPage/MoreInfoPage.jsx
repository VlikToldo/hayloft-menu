import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { getProductBar } from '../../shared/api/bar';
import { getProductKitchen } from '../../shared/api/kitchen';

import styles from './more-info-page.module.scss';

const MoreInfoPage = () => {
  const [infoProduct, setInfoProduct] = useState(null);
  const { productId } = useParams();
  const location = useLocation();

  // const backLink = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data =
          location.state?.from.pathname === '/menu/kitchen'
            ? await getProductKitchen(productId)
            : await getProductBar(productId);

        setInfoProduct({ ...data });
      } catch (error) {
        console.log(error.message);
      }
    };
    getProduct();
  }, [productId, location]);

  const defaultPhoto =
    'url(https://cdn-icons-png.flaticon.com/512/4054/4054617.png)';

  return (
    <div>
      {infoProduct && (
        <Card className={styles.Card}>
          {!infoProduct.image ? (
            <div
              className={styles.imgContainer}
              style={{ backgroundImage: defaultPhoto }}
            ></div>
          ) : (
            <div
              className={styles.imgContainer}
              style={{
                backgroundImage: `url(https://backend-loft.onrender.com/${encodeURIComponent(
                  infoProduct.image
                )})`,
              }}
            ></div>
          )}
          <Card.Body className={styles.cardBody}>
            <h2 className={styles.name}> {infoProduct.name} </h2>
            <h4 className={styles.ceh}> {infoProduct.ceh} </h4>
            <ul className={styles.descriptionList}>
              <li className={styles.description}>
                Інгрідієнти:{' '}
                <span className={styles.spanDescription}>
                  {infoProduct.ingredients}
                </span>{' '}
              </li>
              <li className={styles.description}>
                Соуси:{' '}
                <span className={styles.spanDescription}>
                  {infoProduct.souse}
                </span>{' '}
              </li>
              <li className={styles.description}>
                Алергени:{' '}
                <span className={styles.spanDescription}>
                  {infoProduct.allergens}
                </span>
              </li>
            </ul>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MoreInfoPage;
