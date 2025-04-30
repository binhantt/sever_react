import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaBox, FaSearch } from 'react-icons/fa';
import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/common/Breadcrumb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryList from '../components/category/CategoryList';
import CategoryModal from '../components/category/CategoryModal';

const ProductCategory = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'Điện tử', 
      description: 'Thiết bị điện tử',
      productCount: 15,
      active: true
    },
    { 
      id: 2, 
      name: 'Thời trang', 
      description: 'Quần áo, phụ kiện',
      productCount: 8,
      active: true
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    toast.info(
      <div>
        <h6>Xác nhận xóa</h6>
        <p>Bạn có chắc muốn xóa danh mục này?</p>
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
              setCategories(categories.filter(cat => cat.id !== id));
              toast.success('Đã xóa danh mục thành công!');
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

  const handleSubmit = (formData) => {
    if (currentCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === currentCategory.id ? { ...cat, ...formData } : cat
      ));
      toast.success('Đã cập nhật danh mục thành công!');
    } else {
      // Add new category
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      setCategories([...categories, { 
        id: newId, 
        ...formData,
        productCount: 0
      }]);
      toast.success('Đã thêm danh mục mới thành công!');
    }
    setShowModal(false);
    setCurrentCategory(null);
  };

  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Danh mục sản phẩm" 
          icon={FaBox}
          items={[
            { label: "Sản phẩm" },
            { label: "Danh mục", active: true }
          ]}
        />
        <Row className="mb-4">
          <Col md={6}>
            <h3>Quản lý Danh mục</h3>
            <p className="text-muted">Tổng số: {categories.length} danh mục</p>
          </Col>
          <Col md={6} className="text-end">
            <div className="d-flex justify-content-end">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm danh mục..."
                className="me-2"
                style={{ width: '200px' }}
              />
              <Button variant="primary" className="me-2">
                <FaSearch />
              </Button>
              <Button variant="success" onClick={() => setShowModal(true)}>
                Thêm mới
              </Button>
            </div>
          </Col>
        </Row>
        
        <Row>
          <Col xs={12}>
            <CategoryList 
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>

      <CategoryModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setCurrentCategory(null);
        }}
        handleSubmit={handleSubmit}
        category={currentCategory}
        isEditing={!!currentCategory}
      />
    </Layout>
  );
};

export default ProductCategory;
