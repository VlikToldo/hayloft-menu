import { useEffect, useState } from 'react';
import KitchenItem from './KitchenItem/KitchenItem';
import {getAllKitchen} from '../../shared/api/kitchen';
import styles from './kitchen-list.module.scss'
const KitchenList = () => {
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const data = await getAllKitchen();
        console.log(data);
        setItems([...data]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFilm();
  }, []);

  const elements = items.map(item => (
    <KitchenItem key={item._id} {...item} />
  ));
  return (
    <div >
      <ul className={styles.listBox} >
      {elements}
      </ul>
    </div>
  );
};

export default KitchenList;
