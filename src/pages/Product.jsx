import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaBox ,FaSearch } from 'react-icons/fa';
import ProductManagement from '../components/product/ProductManagement';
import Breadcrumb from '../components/common/Breadcrumb';

const Product = () => {
  const handleEdit = (product) => {
    // Xử lý sửa sản phẩm
  };

  const handleDelete = (productId) => {
    // Xử lý xóa sản phẩm
  };

  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Quản lý Sản phẩm" 
          icon={FaBox}
          items={[
            { label: "Sản phẩm" },
            { label: "Danh sách", active: true }
          ]}
        />
        <Row className="mb-4">
          <Col>
            <h3>Quản lý Sản phẩm</h3>
          </Col>
          <Col className="text-end">
            <div className="d-flex justify-content-end">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
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
            <ProductManagement 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Product;