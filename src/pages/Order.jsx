import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaSearch } from 'react-icons/fa';
import OrderTable from '../components/order/OrderTable';
import { ordersData } from '../config/data/orders';
import Orderbaed from '../components/order/OrderBeard';

const Order = () => {
  const handleEdit = (order) => {
    // Xử lý sửa đơn hàng
  };

  const handleDelete = (orderId) => {
    // Xử lý xóa đơn hàng
  };

  return (
    <Layout>
      <Container fluid className="p-4">
        <Orderbaed />
        <Row className="mb-4">
          <Col>
            <h3>Quản lý Đơn hàng</h3>
          </Col>
          <Col className="text-end">
            <Button variant="primary">
              <FaSearch className="me-1" /> Tìm kiếm
            </Button>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12}>
            <OrderTable 
              orders={ordersData} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Order;