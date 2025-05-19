import React from 'react';
import { Card, Table, Badge, Container, Button, Pagination } from 'react-bootstrap';
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
const OrderTable = ({ 
  orders = [], 
  onEdit = () => {}, 
  onDelete = () => {},
  pagination = { 
    page: 1, 
    limit: 10, 
    total: 0 
  },
  onPageChange = () => {}
}) => {
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return <Badge bg="success">Hoàn thành</Badge>;
      case 'processing':
        return <Badge bg="primary">Đang xử lý</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark">Chờ xử lý</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">Không rõ</Badge>;
    }
  };

  // Calculate pagination items
  const totalPages = Math.ceil((pagination?.total || 0) / (pagination?.limit || 10));
  const currentPage = pagination?.page || 1;

  const renderPaginationItems = () => {
    const items = [];
    const maxPages = 5;

    items.push(
      <Pagination.Item
        key={1}
        active={currentPage === 1}
        onClick={() => onPageChange(1, pagination?.limit)}
      >
        1
      </Pagination.Item>
    );

    if (totalPages <= 1) return items;

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      endPage = Math.min(maxPages - 1, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - (maxPages - 2));
    }

    if (startPage > 2) {
      items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={currentPage === i}
          onClick={() => onPageChange(i, pagination?.limit)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
    }

    if (totalPages > 1) {
      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => onPageChange(totalPages, pagination?.limit)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container fluid className="p-0 mt-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">Đơn hàng gần đây</h6>
            <div className="d-flex align-items-center">
              <small className="text-muted me-3">
                Hiển thị {Math.min(pagination?.limit || 10, orders?.length || 0)} / {pagination?.total || 0} đơn hàng
              </small>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th className="align-middle">Mã đơn</th>
                <th className="align-middle">Khách hàng</th>
                <th className="align-middle">Liên hệ</th>
                <th className="align-middle">Sản phẩm</th>
                <th className="align-middle">Ngày đặt</th>
                <th className="align-middle">Trạng thái</th>
                <th className="align-middle text-end">Tổng tiền</th>
                <th className="align-middle text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {!orders?.length ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-muted">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order?.id || Math.random()}>
                    <td className="align-middle"><strong>#{order?.id}</strong></td>
                    <td className="align-middle">{order?.user_name} {order?.order_name}</td>
                    <td className="align-middle">{order?.user_phone} {order?.order_phone}</td>
                    <td className="align-middle">
                      {order?.items?.map((item, index) => (
                        <div key={index}>
                          {item?.product_name} (x{item?.quantity})
                          {index < order.items.length - 1 ? ', ' : ''}
                        </div>
                      )) || 'Không có'}
                    </td>
                    <td className="align-middle">{formatDate(order?.created_at)}</td>
                    <td className="align-middle">{getStatusBadge(order?.status)}</td>
                    <td className="align-middle text-end">
                      {Number(order?.total_amount).toLocaleString()}đ
                    </td>
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
                        onClick={() => onDelete(order?.id)}
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
        {totalPages > 1 && (
          <Card.Footer className="bg-white border-0 px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Trang {currentPage} / {totalPages}
              </small>
              <Pagination className="mb-0">
                <Pagination.First
                  onClick={() => onPageChange(1, pagination?.limit)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => onPageChange(currentPage - 1, pagination?.limit)}
                  disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <Pagination.Next
                  onClick={() => onPageChange(currentPage + 1, pagination?.limit)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => onPageChange(totalPages, pagination?.limit)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </Card.Footer>
        )}
      </Card>
    </Container>
  );
};

export default OrderTable;
