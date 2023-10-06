import { useEffect, useState } from 'react';
import {ToggleButton, ButtonGroup} from 'react-bootstrap';
import BarItem from './BarItem/BarItem';
import LearnItem from '../LearnItemForList/LearnItemForList'
import {getAllBar} from '../../../shared/api/bar';
import styles from './bar-list.module.scss';
import {nanoid} from 'nanoid';
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
        const data = await getAllBar();
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

  const groupMenuByKitchen = (menuItems) => {
    const groupedMenu = {};
    menuItems.forEach((item) => {
      const { ceh } = item;
      if (!groupedMenu[ceh]) {
        groupedMenu[ceh] = [];
      }
      groupedMenu[ceh].push(item);
    });
    return groupedMenu;
  };

  const renderKitchenSection = (name, dishes) => {
    return (
      <div key={nanoid()} className={styles.cehGroupBox} >
        <h2 className={styles.titleCeh}>{name}</h2>
        <ul className={listBox}>
          {dishes.map((dish) => (
            <li key={dish._id}>
              {showItem.cardItem && <BarItem  {...dish} />}
              {showItem.learnItem && <LearnItem  {...dish} />}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMenuSections = (groupedMenu) => {
    return Object.keys(groupedMenu).map((name) => {
      const kitchenDishes = groupedMenu[name];
      return renderKitchenSection(name, kitchenDishes, );
    });
  };

  const groupedMenu = groupMenuByKitchen(items);


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
      <ul className={styles.listCehGroupBox} >
      {renderMenuSections(groupedMenu)}
      </ul>
    </div>
  );
};

export default BarList;