import { useEffect, useState } from 'react';
import {ToggleButton, ButtonGroup} from 'react-bootstrap';
import BarItem from './BarItem/BarItem';
import LearnItem from '../LearnItemForList/LearnItemForList'
import {getAllKitchen} from '../../../shared/api/kitchen';
import styles from './bar-list.module.scss'
const BarList = () => {
  const [items, setItems] = useState([]);
  const [showItem, setShowItem] = useState({learnItem: false, cardItem: true});
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Картка', value: '1' },
    { name: 'Список', value: '2' },
  ];

  const listBox = showItem.cardItem ? styles.listBox : styles.learnListBox;

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

  const changeList = (e) => {
    showItem.learnItem ? setShowItem({learnItem: false, cardItem: true}) : setShowItem({learnItem: true, cardItem: false})
    setRadioValue(e.currentTarget.value)
  }

  const elements = items.map(item => (
    <>
    {showItem.cardItem && <BarItem key={item._id} {...item} />}
    {showItem.learnItem && <LearnItem key={item._id} {...item} />}
    </>

  ));
  return (
    <div >
      <ButtonGroup className={styles.buttonGroup}>
        {radios.map((radio, idx) => (
          <ToggleButton
            className={styles.toggleButton}
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => changeList(e)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <ul className={listBox} >
      {elements}
      </ul>
    </div>
  );
};

export default BarList;