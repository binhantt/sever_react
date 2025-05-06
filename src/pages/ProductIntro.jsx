import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaBox, FaSearch, FaPlus } from 'react-icons/fa';
import Breadcrumb from '../components/common/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getProductIntros } from '../store/Api/ProductIntro';
import ProductIntroTable from '../components/ProductIntro/ProductIntro.Table';
import ProductIntroModal from '../components/ProductIntro/ProductIntro.Modal';

const ProductIntro = () => {
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector(state => state.producintro);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    dispatch(getProductIntros());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDelete = (productId) => {
    // Xử lý xóa sản phẩm
    console.log('Delete product ID:', productId);
  };

  const handleAddNew = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };

  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Giới thiệu sản phẩm" 
          icon={FaBox}
          items={[
            { label: "Sản phẩm" },
            { label: "Giới thiệu", active: true }
          ]}
        />
        
        <Row className="mb-4">
          <Col>
            <h3>Giới thiệu Sản phẩm</h3>
          </Col>
          <Col className="text-end">
            <div className="d-flex justify-content-end">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="me-2"
                style={{ width: '250px' }}
              />
              <Button variant="primary" className="me-2">
                <FaSearch className="me-1" /> 
              </Button>
              <Button variant="success" onClick={handleAddNew}>
                <FaPlus className="me-1" /> Thêm mới
              </Button>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12}>
            <div className="bg-white rounded p-4">
              <ProductIntroTable 
                products={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </Col>
        </Row>
      </Container>

      <ProductIntroModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        product={currentProduct}
        isEditing={!!currentProduct}
      />
    </Layout>
  );
};

export default ProductIntro;