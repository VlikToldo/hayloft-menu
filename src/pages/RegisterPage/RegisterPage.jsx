import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Form,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { registerUser } from '../../redux/auth/auth-thunks';
import {
  selectAuthLoading,
  selectAuthError,
  clearError,
} from '../../redux/auth';
import styles from './register-page.module.scss';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Очищаємо помилку при зміні полів
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Перевірка на співпадіння паролів
    if (formData.password !== formData.confirmPassword) {
      dispatch({ type: 'auth/loginFailure', payload: 'Паролі не співпадають' });
      return;
    }

    try {
      await dispatch(
        registerUser(formData.email, formData.password, formData.name)
      ).unwrap();
      navigate('/'); // Перенаправлення на головну після успішної реєстрації
    } catch (error) {
      // Помилка обробляється в thunk
    }
  };

  return (
    <Container className={styles.container}>
      <Row className="justify-content-center">
        <Col>
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className={styles.backBtn}
                title="Повернутись назад"
              >
                ← Назад
              </button>
              <div className={styles.header}>
                <h2 className={styles.title}>Реєстрація</h2>
                <p className={styles.subtitle}>Створіть новий акаунт</p>
              </div>

              {error && (
                <Alert variant="danger" className={styles.alert}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Ім'я</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введіть ваше ім'я"
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введіть email"
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введіть пароль"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Підтвердіть пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Повторіть пароль"
                    required
                    disabled={isLoading}
                    minLength={6}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
                </Button>
              </Form>

              <div className={styles.footer}>
                <p>
                  Вже маєте акаунт?{' '}
                  <Link to="/login" className={styles.link}>
                    Увійти
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
