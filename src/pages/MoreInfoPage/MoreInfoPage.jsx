import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { getProductBar } from '../../shared/api/bar';
import { getProductKitchen } from '../../shared/api/kitchen';

import styles from './more-info-page.module.scss'

const MoreInfoPage = () => {
  const [infoProduct, setInfoProduct] = useState(true);
  const [cardImage, setCardImage] = useState('https://cdn-icons-png.flaticon.com/512/4054/4054617.png');
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
        const {image} = data;
        if (image) {
          setCardImage(`https://backend-loft.onrender.com/${encodeURIComponent(image)}`);
        }
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
      {/* {cardImage ? <div className={styles.imgContainer} style={{ backgroundImage: cardImage }}> 

      </div>:null} */}
        <Card.Img className={styles.cardImage} variant="top" src={cardImage} style={{ maxWidth: '300px', maxHeight: '300px' }} />
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
