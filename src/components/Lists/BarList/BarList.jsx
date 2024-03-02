import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import BarItem from './BarItem/BarItem';
import LearnItem from '../LearnItemForList/LearnItemForList';

import {
  changeList,
  handleScrollPositionBar,
} from '../../../redux/utility/utility-slice';

import { getAllBar, deleteBarProduct } from '../../../shared/api/bar';

import {
  selectList,
  selectShowList,
  selectScrollPositionBar,
} from '../../../redux/utility/utility-selectors';
import styles from './bar-list.module.scss';
import { nanoid } from 'nanoid';
const BarList = () => {
  const [items, setItems] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  const valueList = useSelector(selectList);
  const showList = useSelector(selectShowList);
  const scrollPosition = useSelector(selectScrollPositionBar);

  const radios = [
    { id: nanoid(), name: 'Картка', value: '1' },
    { id: nanoid(), name: 'Список', value: '2' },
  ];

  const listBox = showList ? styles.learnListBox : styles.listBox;

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getAllBar();
        setItems([...data]);
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 500);  
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPositions()
  }, [setItems, scrollPosition]);

  const handleScroll = () => {
    dispatch(handleScrollPositionBar(window.scrollY));
  };

  const deletePosition = async id => {
    await toast
      .promise(deleteBarProduct(id), {
        loading: 'Видаляєм...',
        success: <p>Успішно видалено</p>,
        error: <p>Виникла помилка при видаленні!!</p>,
      })
      .then(result => {
        setItems([...result.products]);
      })
      .catch(error => {
        console.error('Помилка при видаленні:', error);
      });
  };

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
      <div key={nanoid() + 1} className={styles.cehGroupBox}>
        <h2 className={styles.titleCeh}>{name}</h2>
        <hr />
        <ul className={listBox}>
          {dishes.map(dish => (
            <li key={dish._id}>
              {showList ? (
                <LearnItem
                  {...dish}
                  location={location}
                  handleScroll={handleScroll}
                />
              ) : (
                <BarItem
                  {...dish}
                  deletePosition={deletePosition}
                  handleScroll={handleScroll}
                  location={location}
                />
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

  return (
    <>
      {items ? (
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
          <div className={styles.listContainer}>
            <ul className={styles.listCehGroupBox}>
              {renderMenuSections(groupMenuByBar(items))}
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.noEmpty}>Список пустий</div>
      )}
      <div style={{ zIndex: '2000' }}>
        <Toaster position="center-top" reverseOrder={false} />
      </div>
    </>
  );
};

export default BarList;
