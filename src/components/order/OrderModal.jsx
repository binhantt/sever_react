import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Table } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';

const OrderModal = ({ 
  show = false, 
  onHide = () => {}, 
  onSave = () => {},
  order = null
}) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    shipping_address: '',
    order_name: '',
    order_phone: '',
    status: 'pending',
    items: [],
    total_amount: 0
  });

  useEffect(() => {
    if (order) {
      setFormData({
        user_email: order.user_email || '',
        user_name: order.user_name || '',
        user_phone: order.user_phone || '',
        shipping_address: order.shipping_address || '',
        user_phone: order.user_phone || '', 
        order_name: order.order_name || '',
        order_phone: order.order_phone || '',
        status: order.status || 'pending',
        items: order.items || [],
        total_amount: order.total_amount || 0
      });
    } else {
      setFormData({
        user_name: '',
        user_email: '',
        shipping_address: '',
        status: 'pending',
        items: [],
        total_amount: 0
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: parseInt(newQuantity) || 1
    };
    
    // Recalculate total
    const newTotal = updatedItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      total_amount: newTotal.toString()
    }));
  }
  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const newTotal = updatedItems.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      total_amount: newTotal.toString()
    }));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {order ? 'Chỉnh sửa đơn hàng' : 'Tạo đơn hàng mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tên khách hàng</Form.Label>
            <Form.Control
              type="text"
              name="user_name || order_name"
              value={formData.user_name || formData.order_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="user_email "
              value={formData.user_email }
              onChange={handleChange}
            
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="user_phone || order_phone"
              value={formData.user_phone || formData.order_phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ giao hàng</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="shipping_address"
              value={formData.shipping_address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </Form.Select>
          </Form.Group>

          <div className="mb-3">
            <h6>Sản phẩm</h6>
            <Table responsive>
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{Number(item.price).toLocaleString()}đ</td>
                    <td style={{ width: '100px' }}>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                    </td>
                    <td>{(Number(item.price) * item.quantity).toLocaleString()}đ</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
                {formData.items.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Không có sản phẩm nào
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Tổng cộng:</strong></td>
                  <td colSpan="2"><strong>{Number(formData.total_amount).toLocaleString()}đ</strong></td>
                </tr>
              </tfoot>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            {order ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default OrderModal;