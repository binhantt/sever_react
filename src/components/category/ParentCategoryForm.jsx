import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function ParentCategoryForm({ 
  initialValues = {}, 
  onSubmit, 
  onCancel 
}) {
  const [formData, setFormData] = useState({
    name: '',
    ...initialValues
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert('Vui lòng nhập tên danh mục');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Tên danh mục cha</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Hủy bỏ
        </Button>
        <Button variant="primary" type="submit">
          {initialValues?.id ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </div>
    </Form>
  );
}