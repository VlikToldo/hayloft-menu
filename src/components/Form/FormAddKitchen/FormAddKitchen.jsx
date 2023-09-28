import initialState from './initialState';
import styles from './form-add-kitchen.module.scss';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';

import { addKitchenProduct } from '../../../shared/api/kitchen';

const FormAddProduct = () => {
  const validateInput = value => {
    if (!value) {
      return 'Required';
    }
  };
  return (
    <>
      <Formik
        initialValues={initialState}
        onSubmit={async values => {
          console.log('submit', values);
          const data = await addKitchenProduct(values);
          console.log(data);
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
            {errors.name && touched.name && <div>{errors.name}</div>}
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
                [styles.errorLabel]: errors.ingridients && touched.ingridients,
              })}
            >
              Інгрідієнти
            </label>
            {errors.ingridients && touched.ingridients && <div>{errors.ingridients}</div>}
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.ingridients && touched.ingridients,
              })}
              name="ingridients"
              validate={validateInput}
            />
            {/* Соуси */}
            <label
              className={classnames(styles.formLabel, {
                [styles.errorLabel]: errors.sous && touched.sous,
              })}
            >
              Соуси
            </label>
            <Field
              className={classnames(styles.formInput, {
                [styles.errorInput]: errors.sous && touched.sous,
              })}
              name="sous"
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
      {/* <form className={styles.form}>
        <div className={styles.boxFormInput}>
          <label className={styles.formLabel}>Назва</label>
          <input className={styles.formInput}/>
        </div>
        <div className={styles.boxFormInput}>
          <label className={styles.formLabel}>Тип</label>
          <select name="type">
            <option value="salary" selected>
              Salary
            </option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className={styles.boxFormInput}>
          <label className={styles.formLabel}>Інгрідієнти</label>
          <textarea className={styles.formInput}/>
        </div>
        <div className={styles.boxFormInput}>
          <label className={styles.formLabel}>Соуси</label>
          <input className={styles.formInput}/>
        </div>
        <div className={styles.boxFormInput}>
          <label className={styles.formLabel}>Алергени</label>
          <input className={styles.formInput}/>
        </div>

        <Button variant='primary'>Додати</Button>
      </form> */}
    </>
  );
};

export default FormAddProduct;
