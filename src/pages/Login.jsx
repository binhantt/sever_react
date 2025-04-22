import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Logo } from '../components/common/Logo';

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
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.813rem', color: '#6e84a3' }}>
                      Email
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="example@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          fontSize: '0.875rem',
                          height: '38px',
                          borderColor: '#edf2f9',
                          backgroundColor: '#f1f4f9'
                        }}
                        className="border-end-0"
                      />
                      <InputGroup.Text style={{
                        backgroundColor: '#f1f4f9',
                        borderColor: '#edf2f9',
                        color: '#95aac9'
                      }}>
                        <FaEnvelope size={14} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.813rem', color: '#6e84a3' }}>
                      Mật khẩu
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                          fontSize: '0.875rem',
                          height: '38px',
                          borderColor: '#edf2f9',
                          backgroundColor: '#f1f4f9'
                        }}
                        className="border-end-0"
                      />
                      <InputGroup.Text 
                        role="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          backgroundColor: '#f1f4f9',
                          borderColor: '#edf2f9',
                          color: '#95aac9',
                          cursor: 'pointer'
                        }}
                      >
                        {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Ghi nhớ đăng nhập"
                      style={{ fontSize: '0.813rem', color: '#6e84a3' }}
                    />
                    <a 
                      href="#forgot-password" 
                      style={{ 
                        fontSize: '0.813rem', 
                        color: '#2c7be5',
                        textDecoration: 'none'
                      }}
                    >
                      Quên mật khẩu?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: '#2c7be5',
                      border: 'none',
                      height: '38px',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;