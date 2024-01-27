import initialState from './initialState';
import styles from './form-add-bar.module.scss';
import { Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

import { addBarProduct } from '../../../shared/api/bar';

const FormAddBar = () => {
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
      name: Yup.string().required(),
      ingredients: Yup.string(),
      alcohol: Yup.string(),
      image: Yup.mixed()
        .test(
          'FILE_SIZE',
          'Розмір фото не підходить',
          value => !value || value.size < 1024 * 1024
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
    },
  });
  return (
    <div>
      <h2 className={styles.titleForm}>Бар</h2>
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
          <label className={styles.formLabel}>Алкоголь</label>
          <input
            className={styles.formInput}
            name="alcohol"
            onChange={formik.handleChange}
            value={formik.values.ingredients}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label className={styles.formLabel}>Додати фото</label>
          <input
            className={styles.formInput}
            type="file"
            name="image"
            onChange={e => formik.setFieldValue('image', e.target.files[0])}
          />
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
          toast.promise(addBarProduct(values), {
            loading: 'Додаєм...',
            success: <p>Збережено</p>,
            error: <p>Виникла помилка при збережені!!</p>,
          });
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form} encType='multipart/form-data'>
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
            <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.name && touched.name,
              })}
            >
              
            </label>
            <input type="file" className={styles.formInput} name="photo" />
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
            />
            {/* Інгрідієнти */}
      {/* <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.ingredients && touched.ingredients,
              })}
            >
              Інгрідієнти
            </label>
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.ingredients && touched.ingredients,
              })}
              name="ingredients"
            />
            {/* Соуси */}
      {/* <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.alcohol && touched.alcohol,
              })}
            >
              Алкоголь
            </label>
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.alcohol && touched.alcohol,
              })}
              name="alcohol"
            />
            <Button className={styles.submitBtn} type="submit">Додати</Button>
          </Form>
        )}
      </Formik> */}
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default FormAddBar;
