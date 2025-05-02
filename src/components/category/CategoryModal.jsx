import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const CategoryModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  category = null,
  isEditing = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        active: category.active
      });
    } else {
      setFormData({
        name: '',
        description: '',
        active: true
      });
    }
  }, [category?.id]); // Changed to only depend on category.id instead of whole category object

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
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

export default CategoryModal;