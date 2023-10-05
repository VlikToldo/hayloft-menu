import initialState from './initialState';
import styles from './form-add-kitchen.module.scss';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import { addKitchenProduct } from '../../../shared/api/kitchen';

const FormAddKitchen = () => {
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

  const validateInput = value => {
    if (!value) {
      return 'Обовязково';
    }
  };
  return (
    <div>
      <h2 className={styles.titleForm}>Кухня</h2>
      <Formik
        initialValues={{...initialState}}
        onSubmit={ async (values, { resetForm }) => {
          console.log(values);
          toast.promise(
            addKitchenProduct(values),
             {
               loading: 'Додаєм...',
               success: <p>Збережено</p>,
               error: <p>Виникла помилка при збережені!!</p>,
             }
           );
           resetForm()
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
           <label >Оберіть цех:</label>
          <Field className={styles.formInput} as="select" name="ceh">
            {cehs.map((ceh, index) => (
              <option key={index} value={ceh.value}>
                {ceh.label}
              </option>
            ))}
          </Field>
            {/* Найменування */}
            <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.name && touched.name,
              })}
            >
              Найменування
            </label>
            {errors.name && touched.name && <div className={styles.erorrRequired}>{errors.name}</div>}
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.name && touched.name,
              })}
              name="name"
              validate={validateInput}
            />
            {/* Інгрідієнти */}
            <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.ingredients && touched.ingredients,
              })}
            >
              Інгрідієнти
            </label>
            {errors.ingredients && touched.ingredients && <div className={styles.erorrRequired}>{errors.ingredients}</div>}
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.ingredients && touched.ingredients,
              })}
              name="ingredients"
              validate={validateInput}
            />
            {/* Соуси */}
            <label
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
            />
            {/* Алергени */}
            <label
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

            <Button type="submit">Додати</Button>
          </Form>
        )}
      </Formik>
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </div>
  );
};

export default FormAddKitchen;
