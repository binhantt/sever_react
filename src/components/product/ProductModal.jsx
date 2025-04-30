import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  product = null,
  isEditing = false 
}) => {
  const { 
    name = '', 
    price = '', 
    stock = '', 
    status = 'active'
  } = product || {};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={name}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giá</Form.Label>
            <Form.Control 
              type="number" 
              defaultValue={price}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số lượng tồn kho</Form.Label>
            <Form.Control 
              type="number" 
              defaultValue={stock}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select defaultValue={status}>
              <option value="active">Hoạt động</option>
              <option value="inactive">Ngừng bán</option>
            </Form.Select>
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

export default ProductModal;