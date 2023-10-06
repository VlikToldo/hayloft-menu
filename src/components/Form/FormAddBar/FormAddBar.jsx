import initialState from './initialState';
import styles from './form-add-bar.module.scss';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';
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

  const validateInput = value => {
    if (!value) {
      return 'Обовязково';
    }
  };
  return (
    <div>
      <h2 className={styles.titleForm}>Бар</h2>
      <Formik
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
            <label
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
            <label
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
            <Button className={styles.submitBtn} type="submit">Додати</Button>
          </Form>
        )}
      </Formik>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default FormAddBar;
