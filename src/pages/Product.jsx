import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaBox, FaSearch } from 'react-icons/fa';
import ProductManagement from '../components/product/ProductManagement';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductModal from '../components/product/ProductModal';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, getProducts, deleteProduct } from '../store/Api/Product';

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { data: products = [], loading, error } = useSelector(state => state.product);
  const { data: categories = [] } = useSelector(state => state.category);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Thêm logic xử lý đặc biệt nếu cần
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };
  const handleAddNew = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      sku: '',
      weight: '',
      dimensions: '',
      is_active: 1,
      main_image_url: '',
      images: [],
      warranties: []
    });
    setShowModal(true);
  };
  
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      stock: product.stock || 0,
      sku: product.sku || '',
      category_id: product.category_id || '',
      weight: product.weight || '',
      dimensions: product.dimensions || '',
      is_active: product.is_active || 1,
      main_image_url: product.main_image_url || '',
      images: product.images || [],
      warranties: product.warranties || []
    });
    setShowModal(true);
  };
  console.log('Form Data:', formData); // Log formData để kiểm tra
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
                dispatch(deleteProduct(productId)); // Sử dụng Redux action
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

  useEffect(() => {
    // Load danh sách sản phẩm khi component mount
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!showModal) {
      setFormData({});
      setCurrentProduct(null);
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        // Cập nhật sản phẩm
        await dispatch(updateProduct({
          id: currentProduct.id,
          productData: {
            ...formData,
            // Đảm bảo các trường số được convert đúng kiểu
            price: Number(formData.price),
            stock: Number(formData.stock)
          }
        }));
      } else {
        // Thêm sản phẩm mới
        await dispatch(addProduct({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }));
      }
      setShowModal(false);
      toast.success(`Đã ${currentProduct ? 'cập nhật' : 'thêm'} sản phẩm thành công!`);
    } catch (error) {
      toast.error(`Lỗi khi ${currentProduct ? 'cập nhật' : 'thêm'} sản phẩm`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
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
              <Button 
                variant="primary" 
                onClick={handleAddNew}
                className="me-2"
              >
                Thêm sản phẩm
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
        handleChange={handleInputChange}
        formData={formData}
        categories={categories}
      />
      <ToastContainer position="bottom-right" />
    </Layout>
  );
};

export default Product;
