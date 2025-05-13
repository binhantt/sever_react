import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Spinner, Breadcrumb } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaBox, FaSearch, FaPlus, FaSync } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getProductIntros, 
  addProductIntro, 
  updateProductIntro, 
  deleteProductIntro 
} from '../store/Api/ProductIntro';
import ProductIntroTable from '../components/ProductIntro/ProductIntro.Table';
import ProductIntroModal from '../components/ProductIntro/ProductIntro.Modal';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProductIntro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 5;

  const { data = [], loading, error } = useSelector(state => state.producintro);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [virtualData, setVirtualData] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getProductIntros({ page, limit, search: searchTerm }));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, page, limit, searchTerm]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setVirtualData(data);
    }
  }, [data]);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      
      // Determine if we're creating or updating
      const isEditing = !!currentProduct;
      
      // Call the appropriate API action
      let action;
      if (isEditing) {
        action = updateProductIntro({ 
          id: currentProduct.id, 
          productIntroData: formData 
        });
      } else {
        action = addProductIntro(formData);
      }
        
      await dispatch(action).unwrap();
      
      // Show success message
      toast.success(
        isEditing 
          ? 'Cập nhật sản phẩm thành công!' 
          : 'Thêm sản phẩm mới thành công!'
      );
      
      // Refresh the data
      dispatch(getProductIntros({ page, limit, search: searchTerm }));
      
      // Close the modal
      setShowModal(false);
      setCurrentProduct(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    toast.info(
      <div className="d-flex flex-column">
        <h6 className="mb-3">Xác nhận xóa</h6>
        <p className="mb-3">Bạn có chắc muốn xóa sản phẩm này?</p>
        <div className="d-flex justify-content-end gap-2">
          <Button 
            variant="light" 
            size="sm"
            onClick={() => toast.dismiss()}
          >
            Hủy
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={async () => {
              try {
                toast.dismiss();
                await dispatch(deleteProductIntro(productId)).unwrap();
                toast.success('Xóa sản phẩm thành công');
                dispatch(getProductIntros({ page, limit, search: searchTerm }));
              } catch (error) {
                toast.error(
                  error.response?.data?.message || 'Không thể xóa sản phẩm. Vui lòng thử lại.'
                );
              }
            }}
          >
            Xóa
          </Button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: 'bg-white shadow-sm border-0',
        bodyClassName: 'p-0',
        progressClassName: 'bg-danger'
      }
    );
  };

  const handleAddNew = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };

  if (loading) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="text-center">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p className="text-muted mb-0">Đang tải dữ liệu...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
          <div className="text-center">
            <div className="text-danger mb-3">
              <i className="fas fa-exclamation-circle fa-3x"></i>
            </div>
            <h5 className="text-danger">Đã xảy ra lỗi</h5>
            <p className="text-muted">{error}</p>
            <Button variant="primary" onClick={() => dispatch(getProductIntros())}>
              Thử lại
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col>
            <h4 className="mb-2">Giới thiệu Sản phẩm</h4>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item href="/products">
                <FaBox className="me-1" />
                Sản phẩm
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Giới thiệu</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <div className="position-relative flex-grow-1 me-3">
                    <div className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                      <FaSearch className="text-muted" />
                    </div>
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm sản phẩm..."
                      className="ps-4"
                      style={{ borderRadius: '20px', maxWidth: '300px' }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-md-end gap-2">
                  <Button 
                    variant="light"
                    onClick={() => dispatch(getProductIntros())}
                    title="Làm mới dữ liệu"
                    className="d-flex align-items-center"
                  >
                    <FaSync className="me-1" />
                    Làm mới
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={handleAddNew}
                    className="d-flex align-items-center"
                  >
                    <FaPlus className="me-1" />
                    Thêm mới
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="shadow-sm">
          <ProductIntroTable 
            products={virtualData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </Container>

      <ProductIntroModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setCurrentProduct(null);
        }}
        product={currentProduct}
        isEditing={!!currentProduct}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
};

export default ProductIntro;