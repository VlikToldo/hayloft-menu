import { useEffect, useState } from 'react';
import KitchenItem from './KitchenItem/KitchenItem'
import {getAllKitchen} from '../../shared/api/kitchen'
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
  // Функция для перехода на /menu/more-info
  const elements = items.map(item => (
    <KitchenItem key={item._id} {...item} />
  ));
  return (
    <div>
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
      {elements}
      </ul>
    </div>
  );
};

export default KitchenList;
