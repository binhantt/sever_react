import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const UserManagementModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  user = null,
  isEditing = false 
}) => {
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    role: 'user',
    is_active: 1
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes or user changes
  useEffect(() => {
    if (show) {
      if (isEditing && user?.id) {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'user',
          is_active: user.is_active ?? 1
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [show, user, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    
    if (type === 'checkbox') {
      newValue = checked ? 1 : 0;
    } else {
      newValue = value;
    }

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleSubmit(formData);
      handleClose();
    } catch (error) {
      // Error handling will be done in the parent component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setFormData(initialFormState);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Nhập tên người dùng"
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
              disabled={isSubmitting}
              placeholder="Nhập địa chỉ email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Nhập số điện thoại"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vai trò</Form.Label>
            <Form.Select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
              <option value="part_time">Nhân viên</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Kích hoạt tài khoản"
              name="is_active"
              checked={formData.is_active === 1}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <Form.Text className="text-muted">
              {formData.is_active === 1 
                ? 'Tài khoản đang được kích hoạt và có thể đăng nhập'
                : 'Tài khoản đang bị khóa và không thể đăng nhập'}
            </Form.Text>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={handleModalClose}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Đang xử lý...
              </>
            ) : (
              isEditing ? 'Cập nhật' : 'Thêm mới'
            )}
          </Button>
        </Modal.Footer> 
      </Form>
    </Modal>
  );
};

export default UserManagementModal;