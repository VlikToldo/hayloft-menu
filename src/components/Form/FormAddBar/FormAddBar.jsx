import initialState from './initialState';
import styles from './form-add-bar.module.scss';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

import { addBarProduct } from '../../../shared/api/bar';

const FormAddBar = () => {
  const validateInput = value => {
    if (!value) {
      return 'Обовязково';
    }
  };
  return (
    <div>
      <h2 className={styles.titleForm}>Бар</h2>
      <Formik
        initialValues={{...initialState}}
        onSubmit={ async (values, { resetForm }) => {
          console.log(values);
          toast.promise(
            addBarProduct(values),
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

export default FormAddBar;