import initialState from './initialState';
import styles from './form-add-bar.module.scss';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useRef } from 'react';

import { addBarProduct } from '../../../shared/api/bar';

const FormAddBar = () => {
  const filePickerBar = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const cehs = [
    { value: 'Алкогольні коктейлі', label: 'Алкогольні коктейлі' },
    { value: 'Міцні напої', label: 'Міцні напої' },
    { value: 'Настоянки', label: 'Настоянки' },
    { value: 'Пиво', label: 'Пиво' },
    { value: 'Вино червоне', label: 'Вино червоне' },
    { value: 'Вино біле', label: 'Вино біле' },
    { value: 'Ігристе', label: 'Ігристе' },
    { value: 'Софти', label: 'Софти' },
    { value: 'Лимонади та коктейлі Б/а', label: 'Лимонади та коктейлі Б/а' },
  ];



  const formik = useFormik({
    initialValues: {
      ...initialState,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Назва позиції є обов`язковою'),
      ingredients: Yup.string(),
      alcohol: Yup.string(),
      image: Yup.mixed()
        .test(
          'FILE_SIZE',
          'Розмір фото не підходить',
          value => !value || value.size < 10 * 1024 * 1024
        )
        .test(
          'FILE_TYPE',
          'Скоріш за все це не фотографія (',
          value => !value || ['image/png', 'image/jpeg'].includes(value.type)
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      toast.promise(addBarProduct(formData), {
        loading: 'Додаєм...',
        success: <p>Збережено</p>,
        error: <p>Виникла помилка при збережені!!</p>,
      });
      resetForm();
      setSelectedFile(null)
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
          <label className={`${styles.formLabel}  ${formik.touched.name ? styles.errorLable : ''}`}>Найменування</label>
          <input
            className={`${styles.formInput}  ${formik.touched.name ? styles.errorInput : ''}`}
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
            className={styles.formInput}
            name="ingredients"
            onChange={formik.handleChange}
            value={formik.values.ingredients}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Алкоголь</label>
          <input
            className={styles.formInput}
            name="alcohol"
            onChange={formik.handleChange}
            value={formik.values.alcohol}
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
          ) : null}
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
      </form>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default FormAddBar;
