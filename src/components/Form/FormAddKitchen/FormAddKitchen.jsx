import initialState from './initialState';
import styles from './form-add-kitchen.module.scss';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useRef } from 'react';

import {
  addKitchenProduct,
  updateKitchenProduct,
} from '../../../shared/api/kitchen';

const FormAddKitchen = ({ editData = null, onUpdate }) => {
  const filePickerKitchen = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
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

  const formik = useFormik({
    initialValues: {
      ...initialState,
      ...editData,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Назва позиції є обов`язковою'),
      ingredients: Yup.string(),
      souse: Yup.string(),
      allergens: Yup.string(),
      image: Yup.mixed()
        .test('FILE_SIZE', 'Розмір фото не підходить', value => {
          if (typeof value !== 'string')
            return !value || value.size < 10 * 1024 * 1024; // Якщо це лінк — ок
          return true;
        })
        .test('FILE_TYPE', 'Скоріш за все це не фотографія (', value => {
          if (typeof value !== 'string')
            return !value || ['image/png', 'image/jpeg'].includes(value.type);
          return true;
        }),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const request = editData
        ? updateKitchenProduct(editData._id, formData) // треба створити цю функцію
        : addKitchenProduct(formData);

      try {
        await toast.promise(request, {
          loading: editData ? 'Оновлюємо...' : 'Додаємо...',
          success: <p>{editData ? 'Оновлено' : 'Збережено'}</p>,
          error: <p>Сталася помилка!</p>,
        });

        resetForm();
        setSelectedFile(null);
        onUpdate();
      } catch (error) {
        console.error('Помилка при збереженні/оновленні:', error);
      }
    },
  });

  const handlePick = () => {
    filePickerKitchen.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];

    formik.setFieldValue('image', file);
    setSelectedFile(file);
  };
  return (
    <div className={styles.boxForm}>
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Оберіть цех:</label>
          <select
            className={styles.formInput}
            name="ceh"
            onChange={formik.handleChange}
            value={formik.values.ceh}
          >
            {cehs.map((ceh, index) => (
              <option key={index} value={ceh.value}>
                {ceh.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label
            className={`${styles.formLabel}  ${
              formik.touched.name ? styles.errorLable : ''
            }`}
          >
            Найменування
          </label>
          <input
            className={`${styles.formInput}  ${
              formik.touched.name ? styles.errorInput : ''
            }`}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className={styles.erorrRequired}>{formik.errors.name}</div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Інгрідієнти</label>
          <textarea
            className={styles.formInput + ' ' + styles.formInputIngredients}
            name="ingredients"
            onChange={formik.handleChange}
            value={formik.values.ingredients}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Загальний вихід</label>
          <span className={styles.formInputAmountSpan}>
            <input
              className={styles.formInput}
              name="amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Соуси</label>
          <input
            className={styles.formInput}
            name="souse"
            onChange={formik.handleChange}
            value={formik.values.souse}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Алергени</label>
          <input
            className={styles.formInput}
            name="allergens"
            onChange={formik.handleChange}
            value={formik.values.allergens}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Опис</label>
          <textarea
            className={styles.formInput + ' ' + styles.formInputDescription}
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <input
            type="file"
            name="image"
            ref={filePickerKitchen}
            hidden="hidden"
            onChange={handleFileChange}
          />
          {!selectedFile ? (
            <button
              className={styles.buttonUpload}
              type="button"
              onClick={handlePick}
            >
              Обрати фото
            </button>
          ) : (
            <button
              className={styles.buttonUpload}
              type="button"
              onClick={handlePick}
            >
              Змінити фото
            </button>
          )}
          <span className={styles.spanUpload}>
            {selectedFile ? (
              <img
                width="50px"
                style={{ display: 'inline-block', marginBottom: '10px' }}
                src={URL.createObjectURL(selectedFile)}
                alt="Завантажене зображення"
              />
            ) : (
              'Файл не завантажено'
            )}
          </span>
          {formik.errors.image && <p>{formik.errors.image}</p>}
        </div>

        <Button className={styles.submitBtn} type="submit">
          Додати
        </Button>
        {editData && <Button
          onClick={onUpdate}
          className={styles.stopBtn}
          variant="secondary"
        >
          Відмінити
        </Button>}
      </form>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default FormAddKitchen;
