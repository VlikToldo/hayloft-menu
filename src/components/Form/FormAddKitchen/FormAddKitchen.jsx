import initialState from './initialState';
import styles from './form-add-kitchen.module.scss';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useRef } from 'react';

import { addKitchenProduct } from '../../../shared/api/kitchen';

const FormAddKitchen = () => {
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
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      ingredients: Yup.string(),
      souse: Yup.string(),
      alergents: Yup.string(),
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
      toast.promise(addKitchenProduct(formData), {
        loading: 'Додаєм...',
        success: <p>Збережено</p>,
        error: <p>Виникла помилка при збережені!!</p>,
      });
      resetForm();
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
    <div>
      <h2 className={styles.titleForm}>Кухня</h2>
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
          <label className={styles.formLabel}>Найменування</label>
          <input
            className={styles.formInput}
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <div className={styles.error}>{formik.errors.name}</div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Інгрідієнти</label>
          <input
            className={styles.formInput}
            name="ingredients"
            onChange={formik.handleChange}
            value={formik.values.ingredients}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Соуси</label>
          <input
            className={styles.formInput}
            name="alcohol"
            onChange={formik.handleChange}
            value={formik.values.souse}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Алергени</label>
          <input
            className={styles.formInput}
            name="alcohol"
            onChange={formik.handleChange}
            value={formik.values.alergents}
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
      {/* <Formik
        initialValues={{ ...initialState }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          toast.promise(addKitchenProduct(values), {
            loading: 'Додаєм...',
            success: <p>Збережено</p>,
            error: <p>Виникла помилка при збережені!!</p>,
          });
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.name && touched.name,
              })}
            >
              Оберіть цех:
            </label>
            <Field className={styles.formInput} as="select" name="ceh">
              {cehs.map((ceh, index) => (
                <option key={index} value={ceh.value}>
                  {ceh.label}
                </option>
              ))}
            </Field>
            {/* Найменування */}
            {/* <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.name && touched.name,
              })}
            >
              Найменування
            </label>
            {errors.name && touched.name && (
              <div className={styles.erorrRequired}>{errors.name}</div>
            )}
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.name && touched.name,
              })}
              name="name"
              validate={validateInput}
            /> */}
            {/* Інгрідієнти */}
            {/* <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.ingredients && touched.ingredients,
              })}
            >
              Інгрідієнти
            </label>
            {errors.ingredients && touched.ingredients && (
              <div className={styles.erorrRequired}>{errors.ingredients}</div>
            )}
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.ingredients && touched.ingredients,
              })}
              name="ingredients"
              validate={validateInput}
            /> */}
            {/* Соуси */}
            {/* <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.souse && touched.souse,
              })}
            >
              Соуси
            </label>
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.souse && touched.souse,
              })}
              name="souse"
            /> */}
            {/* Алергени */}
            {/* <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.alergents && touched.alergents,
              })}
            >
              Алергени
            </label>
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.alergents && touched.alergents,
              })}
              name="alergents"
            />

            <Button className={styles.submitBtn} type="submit">Додати</Button>
      //     </Form> */}
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default FormAddKitchen;
