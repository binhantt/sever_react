import React from 'react';
import { Card, Table, Badge, Container, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

/**
 * OrderTable Component
 * 
 * Renders a responsive table displaying recent orders with various details
 * 
 * @component
 * @param {Object[]} orders - Array of order objects to be displayed
 * @param {string} orders[].id - Unique identifier for the order
 * @param {string} orders[].customer - Name of the customer
 * @param {string} orders[].date - Date of the order
 * @param {string} orders[].status - Current status of the order
 * @param {number} orders[].total - Total amount of the order
 * 
 * @returns {React.ReactElement} A table of orders with status badges and responsive design
 * 
 *
 */
const OrderTable = ({ orders = [], onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Đã giao':
        return <Badge bg="success">Đã giao</Badge>;
      case 'Đang giao':
        return <Badge bg="primary">Đang giao</Badge>;
      case 'Chờ xử lý':
        return <Badge bg="warning" text="dark">Chờ xử lý</Badge>;
      case 'Đã hủy':
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">Không rõ</Badge>;
    }
  };

  return (
    <Container fluid className="p-0 mt-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold">Đơn hàng gần đây</h6>
          <a href="/orders" className="text-primary small">Xem tất cả</a>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="align-middle">Mã đơn</th>
                <th className="align-middle">Khách hàng</th>
                <th className="align-middle">Sản phẩm</th>
                <th className="align-middle">Ngày đặt</th>
                <th className="align-middle">Trạng thái</th>
                <th className="align-middle text-end">Tổng tiền</th>
                <th className="align-middle text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td className="align-middle"><strong>#{order.id}</strong></td>
                    <td className="align-middle">{order.customer}</td>
                    <td className="align-middle">
                      {order.products?.map(p => `${p.name} (x${p.quantity})`).join(', ') || 'Không có'}
                    </td>
                    <td className="align-middle">{order.date}</td>
                    <td className="align-middle">{getStatusBadge(order.status)}</td>
                    <td className="align-middle text-end">{order.total.toLocaleString()}đ</td>
                    <td className="align-middle text-center">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => onEdit(order)}
                      >
                        <FaEdit />
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => onDelete(order.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default OrderTable;
