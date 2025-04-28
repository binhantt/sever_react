import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
            <div className="d-flex justify-content-end">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm đơn hàng..."
                className="me-2"
                style={{ width: '250px' }}
              />
              <Button variant="primary">
                <FaSearch className="me-1" /> 
              </Button>
            </div>
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