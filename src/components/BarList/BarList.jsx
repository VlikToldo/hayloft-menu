import { useEffect, useState } from 'react';
import BarItem from './BarItem/BarItem';
import {getAllKitchen} from '../../shared/api/kitchen';
import styles from './bar-list.module.scss'
const BarList = () => {
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
    <BarItem key={item._id} {...item} />
  ));
  return (
    <div >
      <ul className={styles.listBox} >
      {elements}
      </ul>
    </div>
  );
};

export default BarList;