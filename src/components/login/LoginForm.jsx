import React from 'react';
import { Form, Button, InputGroup, FormCheck } from 'react-bootstrap';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword }) => {
  return (
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
  );
};

export default LoginForm;