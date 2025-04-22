import React from 'react';
import { Card, Table, Badge } from 'react-bootstrap';

const orders = [
  { id: '#12345', customer: 'Nguyễn Văn A', date: '12/03/2024', status: 'Đã giao', amount: '1,200,000đ' },
  { id: '#12344', customer: 'Trần Thị B', date: '12/03/2024', status: 'Đang giao', amount: '850,000đ' },
  { id: '#12343', customer: 'Lê Văn C', date: '11/03/2024', status: 'Chờ xử lý', amount: '2,400,000đ' },
  { id: '#12342', customer: 'Phạm Thị D', date: '11/03/2024', status: 'Đã hủy', amount: '950,000đ' },
  { id: '#12341', customer: 'Hoàng Văn E', date: '11/03/2024', status: 'Đã giao', amount: '1,800,000đ' },
];

const statusColors = {
  'Đã giao': 'success',
  'Đang giao': 'primary',
  'Chờ xử lý': 'warning',
  'Đã hủy': 'danger'
};

const RecentOrders = () => {
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-0 pt-4 pb-0 px-4">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Đơn hàng gần đây</h6>
          <a href="#" className="text-primary text-decoration-none" style={{ fontSize: '0.875rem' }}>
            Xem tất cả
          </a>
        </div>
      </Card.Header>
      <Card.Body className="p-4">
        <div className="table-responsive">
          <Table className="table-hover" style={{ minWidth: '800px' }}>
            <thead>
              <tr>
                <th className="border-0 text-muted" style={{ fontSize: '0.875rem' }}>Mã đơn</th>
                <th className="border-0 text-muted" style={{ fontSize: '0.875rem' }}>Khách hàng</th>
                <th className="border-0 text-muted" style={{ fontSize: '0.875rem' }}>Ngày đặt</th>
                <th className="border-0 text-muted" style={{ fontSize: '0.875rem' }}>Trạng thái</th>
                <th className="border-0 text-muted" style={{ fontSize: '0.875rem' }}>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td className="border-0">
                    <span className="fw-medium">{order.id}</span>
                  </td>
                  <td className="border-0">{order.customer}</td>
                  <td className="border-0">{order.date}</td>
                  <td className="border-0">
                    <Badge bg={statusColors[order.status]} className="fw-normal">
                      {order.status}
                    </Badge>
                  </td>
                  <td className="border-0 fw-medium">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecentOrders; 