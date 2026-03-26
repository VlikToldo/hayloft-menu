import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormAddKitchen from '../../components/Form/FormAddKitchen/FormAddKitchen';
import FormAddBar from '../../components/Form/FormAddBar/FormAddBar';
import { getProductBar } from '../../shared/api/bar';
import { getProductKitchen } from '../../shared/api/kitchen';
import styles from './add-product.module.scss';
import svgLeft from './image/left.svg';
import svgRight from './image/right.svg';
const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    showFormBar: false,
    showFormKitchen: true,
  });
  const [editData, setEditData] = useState(null);
  const [editType, setEditType] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    const type = params.get('type');

    if (type === 'bar') {
      setShow({ showFormBar: true, showFormKitchen: false });
      setEditType('bar');
    } else if (type === 'kitchen') {
      setShow({ showFormBar: false, showFormKitchen: true });
      setEditType('kitchen');
    }

    if (editId && type) {
      const fetchEditData = async () => {
        try {
          if (type === 'bar') {
            const data = await getProductBar(editId);
            setEditData(data);
          } else if (type === 'kitchen') {
            const data = await getProductKitchen(editId);
            setEditData(data);
          }
        } catch (error) {
          console.error('Помилка завантаження даних для редагування:', error);
          navigate('/');
        }
      };

      fetchEditData();
    } else {
      setEditData(null);
      setEditType(null);
    }
  }, [location.search, navigate]);

  const openFormBar = () => {
    setShow({ showFormBar: true, showFormKitchen: false });
    setEditData(null);
    setEditType(null);
  };

  const openFormKitchen = () => {
    setShow({ showFormBar: false, showFormKitchen: true });
    setEditData(null);
    setEditType(null);
  };

  const handleUpdateCompleted = () => {
    setEditData(null);
    setEditType(null);
    // Повернення на відповідний список
    if (editType === 'bar' || editType === 'kitchen') {
      navigate(`/menu/${editType}`);
    } else {
      navigate('/menu');
    }
  };

  const isEditing = Boolean(editType && editData);

  return (
    <div className={styles.formPageBox}>
      <div className={styles.btnGroupChangeForm}>
        {!isEditing && !show.showFormBar && (
          <button className={styles.btnChangeToBar} onClick={openFormBar}>
            <img src={svgLeft} alt="Left" />
            <span className={styles.spanGo}>Бар</span>
          </button>
        )}
        {!isEditing && !show.showFormKitchen && (
          <button
            className={styles.btnChangeTooKitchen}
            onClick={openFormKitchen}
          >
            <span className={styles.spanGo}>Кухня</span>
            <img src={svgRight} alt="Right" />
          </button>
        )}
      </div>

      {show.showFormBar && (
        <FormAddBar
          editData={editType === 'bar' ? editData : null}
          onUpdate={handleUpdateCompleted}
        />
      )}
      {show.showFormKitchen && (
        <FormAddKitchen
          editData={editType === 'kitchen' ? editData : null}
          onUpdate={handleUpdateCompleted}
        />
      )}
    </div>
  );
};

export default AddProduct;
