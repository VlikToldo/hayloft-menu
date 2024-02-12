import { useState } from 'react';
import FormAddKitchen from '../../components/Form/FormAddKitchen/FormAddKitchen';
import FormAddBar from '../../components/Form/FormAddBar/FormAddBar';
import styles from './add-product.module.scss'
import svgLeft from './image/back-svgrepo-com.svg';
import svgRight from './image/back-svgrepo-com (1).svg';
const AddProduct = () => {
  const [show, setShow] = useState({
    showFormBar: false,
    showFormKitchen: true,
  });
  const openFormBar = () => {
    setShow({ showFormBar: true, showFormKitchen: false });
  };

  const openFormKitchen = () => {
    setShow({ showFormBar: false, showFormKitchen: true });
  };
  return (
    <div className={styles.formPageBox}>
      <div className={styles.btnGroupChangeForm}>
        {!show.showFormBar && <button className={styles.btnChangeToBar} onClick={openFormBar}>
          <img src={svgLeft} alt="qwq" />
          <span className={styles.spanGo}>Бар</span>
        </button>}
        {!show.showFormKitchen && <button className={styles.btnChangeTooKitchen} onClick={openFormKitchen}>
          <span className={styles.spanGo}>Кухня</span>
          <img src={svgRight} alt="qwq" />
        </button>}
      </div>

      {show.showFormBar && <FormAddBar />}
      {show.showFormKitchen && <FormAddKitchen />}
    </div>
  );
};

export default AddProduct;
