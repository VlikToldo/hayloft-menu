import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import KitchenItem from './KitchenItem/KitchenItem';
import LearnItem from '../LearnItemForList/LearnItemForList';
import {
  getAllKitchen,
  deleteKitchenProduct,
} from '../../../shared/api/kitchen';

import {
  changeList,
  handleScrollPositionKitchen,
} from '../../../redux/utility/utility-slice';
import {
  selectList,
  selectShowList,
  selectScrollPositionKitchen,
} from '../../../redux/utility/utility-selectors';

import styles from './kitchen-list.module.scss';
import { nanoid } from 'nanoid';
const KitchenList = () => {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();

  const valueList = useSelector(selectList);
  const showList = useSelector(selectShowList);
  const scrollPosition = useSelector(selectScrollPositionKitchen);

  const radios = [
    { id: nanoid(), name: 'Картка', value: '1' },
    { id: nanoid(), name: 'Список', value: '2' },
  ];

  const listBox = showList ? styles.learnListBox : styles.listBox;

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getAllKitchen();
        setItems([...data]);
        window.scrollTo(0, scrollPosition);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPositions();
  }, [setItems, scrollPosition]);

  const handleScroll = () => {
    dispatch(handleScrollPositionKitchen(window.scrollY));
  };

  const deletePosition = async id => {
    await toast
      .promise(deleteKitchenProduct(id), {
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
      <div key={nanoid() + 2} className={styles.cehGroupBox}>
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
                <KitchenItem
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
      return renderKitchenSection(name, kitchenDishes);
    });
  };

  const groupedMenu = groupMenuByKitchen(items);

  return (
    <>
      {items.length > 0 ? (
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
              {renderMenuSections(groupedMenu)}
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

export default KitchenList;
