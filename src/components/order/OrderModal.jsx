import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const OrderModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  order = null,  // Explicitly handle null case
  isEditing = false 
}) => {
  // Safely destructure with defaults
  const { 
    customer = '', 
    phone = '', 
    address = '', 
    total = '' , 
    status = '',
  } = order || {};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Khách hàng</Form.Label>
            <Form.Control 
              type="text" 
              defaultValue={customer}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control 
              type="tel" 
              defaultValue={phone}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control 
              as="textarea" 
              defaultValue={address}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select defaultValue={status}>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tổng tiền</Form.Label>
            <Form.Control 
              type="number" 
              defaultValue={total}
              required
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

export default OrderModal;