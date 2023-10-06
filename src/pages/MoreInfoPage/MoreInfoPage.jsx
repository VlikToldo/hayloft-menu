import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { getProductBar } from '../../shared/api/bar';
import { getProductKitchen } from '../../shared/api/kitchen';

import styles from './more-info-page.module.scss'

const MoreInfoPage = () => {
  const [infoProduct, setInfoProduct] = useState({});
  const { productId } = useParams();
  const location = useLocation();
  const bwrgerPhoto =
    'https://klike.net/uploads/posts/2019-06/1559545617_2.jpg';
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
  const { name, ingredients, ceh, souse = null, alergents } = infoProduct;
  return (
    <div>
      <Card className={styles.Card}>
        <Card.Img variant="top" src={bwrgerPhoto} />
        <Card.Body className={styles.cardBody}>
          <h2>{name}</h2>
          <h4>{ceh}</h4>
          <p>Інгрідієнти: {ingredients}</p>
          <p>Соуси: {souse}</p>
          <p>Алергени: {alergents}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MoreInfoPage;
