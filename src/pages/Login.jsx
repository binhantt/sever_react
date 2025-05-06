import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Logo } from '../components/common/Logo';
import LoginForm from '../components/login/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../store/Slice/Login';
import axios from 'axios';
import ApiConfig from '../config/Api.config';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiConfig.severAdmin}${ApiConfig.login}`, formData);


    
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        dispatch(loginSuccess(response.data));
        toast.success('Đăng nhập thành công');
        navigate('/home');
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Đăng nhập thất bại';
      dispatch(loginFailure({ message: errorMsg }));
      toast.error(errorMsg);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f4f9',
      padding: '2rem 0'
    }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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