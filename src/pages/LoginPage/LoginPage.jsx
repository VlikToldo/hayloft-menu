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
import { loginUser } from '../../redux/auth/auth-thunks';
import {
  selectAuthLoading,
  selectAuthError,
  clearError,
} from '../../redux/auth';
import styles from './login-page.module.scss';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      await dispatch(loginUser(formData.email, formData.password)).unwrap();
      navigate('/'); // Перенаправлення на головну після успішного логіну
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
                <h2 className={styles.title}>Вхід</h2>
                <p className={styles.subtitle}>Увійдіть до свого акаунту</p>
              </div>

              {error && (
                <Alert variant="danger" className={styles.alert}>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
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

                <Form.Group className="mb-4">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введіть пароль"
                    required
                    disabled={isLoading}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? 'Вхід...' : 'Увійти'}
                </Button>
              </Form>

              <div className={styles.footer}>
                <p>
                  Немає акаунту?{' '}
                  <Link to="/register" className={styles.link}>
                    Зареєструватися
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

export default LoginPage;
