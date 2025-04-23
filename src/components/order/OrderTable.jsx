import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive className="rounded shadow-sm">
      <thead className="bg-dark text-white">
        <tr>
          <th>ID</th>
          <th>Khách hàng</th>
          <th>SĐT</th>
          <th>Địa chỉ</th>
          <th>Ngày đặt</th>
          <th>Trạng thái</th>
          <th>Tổng tiền</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>{order.phone}</td>
            <td>{order.address}</td>
            <td>{order.date}</td>
            <td>
              <Badge bg={
                order.status === 'completed' ? 'success' : 
                order.status === 'processing' ? 'warning' : 'secondary'
              }>
                {order.status === 'completed' ? 'Hoàn thành' : 
                 order.status === 'processing' ? 'Đang xử lý' : 'Chờ xử lý'}
              </Badge>
            </td>
            <td>{order.total.toLocaleString()} VND</td>
            <td>
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="me-1"
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
        ))}
      </tbody>
    </Table>
  );
};

export default OrderTable;