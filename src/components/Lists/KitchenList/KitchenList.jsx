import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {ToggleButton, ButtonGroup} from 'react-bootstrap';
import KitchenItem from './KitchenItem/KitchenItem';
import LearnItem from '../LearnItemForList/LearnItemForList'
import {getAllKitchen} from '../../../shared/api/kitchen';
import styles from './kitchen-list.module.scss';
import {nanoid} from 'nanoid';
const KitchenList = () => {
  const [items, setItems] = useState([]);
  const [showItem, setShowItem] = useState({learnItem: false, cardItem: true});
  const [radioValue, setRadioValue] = useState('1');

  const location = useLocation();

  const radios = [
    {id: nanoid(), name: 'Картка', value: '1' },
    {id: nanoid(), name: 'Список', value: '2' },
  ];



  const listBox = showItem.cardItem ? styles.listBox : styles.learnListBox;

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const data = await getAllKitchen();
        setItems([...data]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFilm();
  }, [setItems]);

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
      <div className={styles.cehGroupBox} key={nanoid()}>
        <h2  className={styles.titleCeh}>{name}</h2>
        <ul className={listBox}>
          {dishes.map((dish) => (
            <li key={dish._id}>
              {showItem.cardItem && <KitchenItem {...dish} location={location} />}
              {showItem.learnItem && <LearnItem {...dish} location={location} />}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMenuSections = (groupedMenu) => {
    return Object.keys(groupedMenu).map((name) => {
      const kitchenDishes = groupedMenu[name];
      return renderKitchenSection(name, kitchenDishes);
    });
  };

  const groupedMenu = groupMenuByKitchen(items);

  return (
    <div>
      <ButtonGroup className={styles.buttonGroup}>
        {radios.map((radio, idx) => (
          <ToggleButton
            className={styles.toggleButton}
            key={radio.id}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => changeList(e)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <ul className={styles.listCehGroupBox}>
      {renderMenuSections(groupedMenu)}
      </ul>
    </div>
  );
};

export default KitchenList;
