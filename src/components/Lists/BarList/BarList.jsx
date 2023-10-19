import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import BarItem from './BarItem/BarItem';
import LearnItem from '../LearnItemForList/LearnItemForList';

import { changeList } from '../../../redux/utility/utility-slice';

import { getAllBar } from '../../../shared/api/bar';

import {
  selectList,
  selectShowList,
} from '../../../redux/utility/utility-selectors';
import styles from './bar-list.module.scss';
import { nanoid } from 'nanoid';
const BarList = () => {
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
        const data = await getAllBar();
        setItems([...data]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchFilm();
  }, []);

  const showLearnList = e => {
    e.currentTarget.value === '1'
      ? dispatch(changeList({ value: e.currentTarget.value, showList: false }))
      : dispatch(changeList({ value: e.currentTarget.value, showList: true }));
  };

  const groupMenuByBar = menuItems => {
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

  const renderBarSection = (name, dishes) => {
    return (
      <div key={nanoid()} className={styles.cehGroupBox}>
        <h2 className={styles.titleCeh}>{name}</h2>
        <ul className={listBox}>
          {dishes.map(dish => (
            <li key={dish._id}>
              {showList ? (
                <LearnItem {...dish} location={location} />
              ) : (
                <BarItem {...dish} location={location} />
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
      return renderBarSection(name, kitchenDishes);
    });
  };

  const groupedMenu = groupMenuByBar(items);

  return (
    <div>
      <ButtonGroup className={styles.buttonGroup}>
        {radios.map((radio, idx) => (
          <ToggleButton
            className={styles.toggleButton}
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={valueList !== radio.value}
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

export default BarList;
