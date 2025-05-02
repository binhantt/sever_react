import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaBox, FaSearch } from 'react-icons/fa';
import ProductManagement from '../components/product/ProductManagement';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductModal from '../components/product/ProductModal';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Di chuyển dữ liệu sản phẩm vào đây
  const [products, setProducts] = useState([
    { id: 1, name: 'Sản phẩm 1', price: 100000, stock: 10, status: 'active' },
    { id: 2, name: 'Sản phẩm 2', price: 200000, stock: 5, status: 'inactive' }
  ]);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    toast.info(
        <div>
          <h6>Xác nhận xóa</h6>
          <p>Bạn có chắc muốn xóa sản phẩm này?</p>
          <div className="d-flex justify-content-end mt-3">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              className="me-2"
              onClick={() => toast.dismiss()}
            >
              Hủy
            </Button>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => {
                toast.dismiss();
                setProducts(products.filter(product => product.id !== productId)); // Changed from onDelete to setProducts
                toast.success('Đã xóa sản phẩm thành công!');
              }}
            >
              Xóa
            </Button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý thêm/sửa sản phẩm
    setShowModal(false);
    toast.success(`Đã ${currentProduct ? 'cập nhật' : 'thêm'} sản phẩm thành công!`);
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
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
      <ProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        product={currentProduct}
        isEditing={!!currentProduct}
      />
      <ToastContainer position="bottom-right" />
    </Layout>
  );
};

export default Product;