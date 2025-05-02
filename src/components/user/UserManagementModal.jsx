import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserManagementModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  user = null,
  isEditing = false 
}) => {
  console.log('Dữ liệu user nhận được:', user); // Thêm dòng này
  const [formData, setFormData] = useState({
    name: user?.name || '',  // Hiển thị tên
    email: user?.email || '', // Hiển thị email
    phone: user?.phone || '', // Hiển thị số điện thoại
    role: user?.role || 'user', // Hiển thị vai trò
    active: user?.active ?? true // Hiển thị trạng thái
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => {
        e.preventDefault();
        console.log(`Dữ liệu ${isEditing ? 'cập nhật' : 'thêm mới'} người dùng:`, formData);
        handleSubmit(formData);
      }}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}  // Hiển thị giá trị từ formData
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select 
              name="role"
              value={formData.role}
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
              checked={formData.active}
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