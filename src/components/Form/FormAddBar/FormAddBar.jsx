import initialState from './initialState';
import styles from './form-add-bar.module.scss';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useRef } from 'react';

import { addBarProduct, updateBarProduct } from '../../../shared/api/bar';

const FormAddBar = ({ editData = null, onUpdate }) => {
  const filePickerBar = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const cehs = [
    { value: 'Алкогольні коктейлі', label: 'Алкогольні коктейлі' },
    { value: 'Віскі', label: 'Віскі' },
    { value: 'Ром', label: 'Ром' },
    { value: 'Джин', label: 'Джин' },
    { value: 'Коньяк та Бренді', label: 'Коньяк та Бренді' },
    { value: 'Горілка', label: 'Горілка' },
    { value: 'Текіла', label: 'Текіла' },
    { value: 'Вермут', label: 'Вермут' },
    { value: 'Біттер', label: 'Біттер' },
    { value: 'Абсент', label: 'Абсент' },
    { value: 'Лікери', label: 'Лікери' },
    { value: 'Настоянки', label: 'Настоянки' },
    { value: 'Пиво', label: 'Пиво' },
    { value: 'Вино червоне', label: 'Вино червоне' },
    { value: 'Вино біле', label: 'Вино біле' },
    { value: 'Вино безалкогольне', label: 'Вино безалкогольне' },
    { value: 'Ігристе', label: 'Ігристе' },
    { value: 'Софти', label: 'Софти' },
    { value: 'Лимонади та коктейлі Б/а', label: 'Лимонади та коктейлі Б/а' },
  ];

  const formik = useFormik({
    initialValues: {
      ...initialState,
      ...editData,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Назва позиції є обов`язковою'),
      ingredients: Yup.string(),
      alcohol: Yup.string(),
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
        ? updateBarProduct(editData._id, formData)
        : addBarProduct(formData);

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
    filePickerBar.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];

    formik.setFieldValue('image', file);
    setSelectedFile(file);
  };

  const checkCehsWine = () => {
    switch (formik.values.ceh) {
      case 'Ігристе':
        return true;
      case 'Вино червоне':
        return true;
      case 'Вино біле':
        return true;
      case 'Віскі':
        return true;
      case 'Ром':
        return true;
      case 'Джин':
        return true;
      case 'Текіла':
        return true;
      case 'Коньяк та Бренді':
        return true;
      case 'Абсент':
        return true;
      case 'Вермут':
        return true;
      case 'Біттер':
        return true;
      case 'Лікери':
        return true;

      default:
        return false;
    }
  };
  return (
    <div className={styles.boxForm}>
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Оберіть категорію:</label>
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
        {checkCehsWine() && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className={styles.formLabel}>Країна</label>
            <input
              className={styles.formInput}
              name="country"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
          </div>
        )}
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
        {formik.values.ceh === 'Алкогольні коктейлі' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label className={styles.formLabel}>Алкоголь</label>
            <input
              className={styles.formInput}
              name="alcohol"
              onChange={formik.handleChange}
              value={formik.values.alcohol}
            />
          </div>
        )}
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
            ref={filePickerBar}
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

export default FormAddBar;
