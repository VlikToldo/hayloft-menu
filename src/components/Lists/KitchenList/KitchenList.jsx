import { useEffect, useState, useRef } from 'react';
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
  const [items, setItems] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();
  const selectRef = useRef(null);

  const valueList = useSelector(selectList);
  const showList = useSelector(selectShowList);
  const scrollPosition = useSelector(selectScrollPositionKitchen);

  const radios = [
    { id: nanoid(), name: 'Картка', value: '1' },
    { id: nanoid(), name: 'Список', value: '2' },
  ];
  const cehs = [
    { value: 'Холодні закуски', label: 'Холодні закуски' },
    { value: 'Салати', label: 'Салати' },
    { value: 'Гарячі закуски', label: 'Гарячі закуски' },
    { value: 'Перші страви', label: 'Перші страви' },
    { value: 'Burgers', label: 'Бургери' },
    { value: 'Шашлики та стейки', label: 'Шашлики та стейки' },
    { value: 'Гарніри', label: 'Гарніри' },
    { value: 'Дитяче меню', label: 'Дитяче меню' },
    { value: 'Десерти', label: 'Десерти' },
  ];

  const listBox = showList ? styles.learnListBox : styles.listBox;

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await getAllKitchen();
        setItems([...data]);
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 200);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPositions();
  }, [setItems, scrollPosition]);

  const handleScroll = () => {
    dispatch(handleScrollPositionKitchen(window.scrollY));
  };

  const handleSelectChange = event => {
    const { value } = event.target;
    const selectedElement = document.getElementById(value);
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth' });
    }
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
      <div id={name} key={nanoid() + 2} className={styles.cehGroupBox}>
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

  return (
    <>
      {items ? (
        <div>
          <select className={styles.filterSelect} ref={selectRef} onChange={handleSelectChange}>
            {cehs.map(({ value, label }) => (
              <option title='Фільтр' key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
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
              {renderMenuSections(groupMenuByKitchen(items))}
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
