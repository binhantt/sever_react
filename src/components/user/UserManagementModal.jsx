import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserManagementModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  user = null,
  isEditing = false 
}) => {
  // Chỉ khởi tạo formData từ user nếu có ID (chế độ edit)
  const [formData, setFormData] = useState(isEditing && user?.id ? {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    active: user.active ?? true
  } : {
    name: '',
    email: '',
    phone: '',
    role: 'user',
    active: true
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => {
      const newState = { ...prev, [name]: newValue };
      console.log('Form state changed:', { field: name, value: newValue, newState });
      return newState;
    });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={(e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData); // Debug before submit
        handleSubmit(formData);
      }}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}  // Đã sửa từ user?.name sang formData.name
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}  // Đã sửa từ user?.email sang formData.email
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}  // Đã sửa từ user?.phone sang formData.phone
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select 
              name="role"
              value={formData.role}  // Đã sửa từ user?.role sang formData.role
              onChange={handleChange}
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Kích hoạt tài khoản"
              name="active"
              checked={formData.active}  // Đã sửa từ user?.active sang formData.active
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserManagementModal;