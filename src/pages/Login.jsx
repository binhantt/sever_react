import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Logo } from '../components/common/Logo';
import LoginForm from '../components/login/LoginForm';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f4f9',
      padding: '2rem 0'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5} xl={4}>
            <div className="text-center mb-4">
              <Logo size={40} variant="primary" showText />
            </div>
            <Card className="border-0" style={{
              backgroundColor: '#fff',
              boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,0.08)'
            }}>
              <Card.Body className="p-4">
                <h5 className="text-center mb-4" style={{ color: '#3c4d69', fontWeight: 500 }}>
                  Đăng nhập vào hệ thống
                </h5>
                <LoginForm 
                  formData={formData} 
                  handleChange={handleChange} 
                  handleSubmit={handleSubmit} 
                  showPassword={showPassword} 
                  setShowPassword={setShowPassword} 
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;