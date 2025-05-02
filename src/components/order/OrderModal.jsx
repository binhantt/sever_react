import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import BaseModal from '../common/BaseModal';

const OrderModal = ({ 
  show, 
  handleClose, 
  handleSubmit,
  order = null,
  isEditing = false 
}) => {
  const { 
    customer = '', 
    phone = '', 
    address = '', 
    total = '', 
    status = '',
  } = order || {};
  console.log(order);
  console.log(isEditing);
  return (
    <BaseModal
      show={show}
      handleClose={handleClose}
      title={isEditing ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng mới'}
      submitText={isEditing ? 'Cập nhật' : 'Thêm mới'}
    >
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
          <Form.Group className="mb-3">
            <Form.Label>Sản phẩm</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={order?.products?.map(p => 
                `${p.name} - ${p.price.toLocaleString()}đ x ${p.quantity}`
              ).join('\n')}
              placeholder="Mỗi sản phẩm trên 1 dòng, định dạng: Tên sản phẩm - Giá x Số lượng"
            />
          </Form.Group>
        </Modal.Body>
      </Form>
    </BaseModal>
  );
};

export default OrderModal;