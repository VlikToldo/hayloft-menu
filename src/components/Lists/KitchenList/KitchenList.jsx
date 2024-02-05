import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import KitchenItem from './KitchenItem/KitchenItem';
import LearnItem from '../LearnItemForList/LearnItemForList';
import { getAllKitchen } from '../../../shared/api/kitchen';

import { changeList } from '../../../redux/utility/utility-slice';
import {
  selectList,
  selectShowList,
} from '../../../redux/utility/utility-selectors';

import styles from './kitchen-list.module.scss';
import { nanoid } from 'nanoid';
const KitchenList = () => {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const valueList = useSelector(selectList);
  const showList = useSelector(selectShowList);

  const radios = [
    { id: nanoid(), name: 'Картка', value: '1' },
    { id: nanoid(), name: 'Список', value: '2' },
  ];

  const listBox = showList ? styles.learnListBox : styles.listBox;

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

  const showLearnList = e => {
    e.currentTarget.value === '1'
      ? dispatch(changeList({ value: e.currentTarget.value, showList: false }))
      : dispatch(changeList({ value: e.currentTarget.value, showList: true }));
  };

  const groupMenuByKitchen = menuItems => {
    const groupedMenu = {};
    menuItems.forEach(item => {
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
        <h2 className={styles.titleCeh}>{name}</h2>
        <ul className={listBox}>
          {dishes.map(dish => (
            <li key={dish._id}>
              {showList ? (
                <LearnItem {...dish} location={location} />
              ) : (
                <KitchenItem {...dish} location={location} />
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMenuSections = groupedMenu => {
    return Object.keys(groupedMenu).map(name => {
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
            checked={valueList === radio.value}
            onChange={e => showLearnList(e)}
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