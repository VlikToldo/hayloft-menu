import { useState } from 'react';
import FormAddKitchen from '../../components/Form/FormAddKitchen/FormAddKitchen';
import FormAddBar from '../../components/Form/FormAddBar/FormAddBar';
import { Button } from 'react-bootstrap';
import styles from './add-product.module.scss'
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
        <Button className={styles.btnChangeForm} onClick={openFormBar}>Додати бар</Button>
        <Button  className={styles.btnChangeForm}onClick={openFormKitchen}>Додати кухню</Button>
      </div>

      {show.showFormBar && <FormAddBar />}
      {show.showFormKitchen && <FormAddKitchen />}
    </div>
  );
};

export default AddProduct;
