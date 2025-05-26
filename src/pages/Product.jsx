import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import { FaBox, FaSearch } from 'react-icons/fa';
import ProductManagement from '../components/product/ProductManagement';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductModal from '../components/product/ProductModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct, getProducts, deleteProduct } from '../store/Api/Product';
import { getCategories } from '../store/Api/Category';
import { fetchManufacturers } from '../store/Api/manufacturers';

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const { data: products = [], loading, error } = useSelector(state => state.product);
  const { data: categories = [] } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(fetchManufacturers());
  }, [dispatch]);

  const handleAddNew = () => {
    setCurrentProduct(null);
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
              dispatch(deleteProduct(productId));
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

  const handleEdit = (products) => {
    console.log('Editing product:', products.details);
    // Format the products data for editing
    const formattedProduct = {
      ...products,
      quantity: products.quantity || 1,
      id_categories: Number(products.id_categories) || (products.categories ? Number(products.categories.id) : ''),
      manufacturer_id: Number(products.manufacturer_id) || (products.manufacturers ? Number(products.manufacturers.id) : ''),
      images: products.images || [],
      details: products.details ? products.details.map(detail => ({
        spec_name: detail.spec_name || '',
        spec_value: detail.spec_value || '',
        sort_order: detail.sort_order || 1
      })) : [{ spec_name: '', spec_value: '', sort_order: 1 }],
      warranties: products.warranty ? [{
        warranty_period: products.warranty.warranty_period || '',
        warranty_provider: products.warranty.warranty_provider || '',
        warranty_conditions: products.warranty.warranty_conditions || ''
      }] : [{
        warranty_period: '',
        warranty_provider: '',
        warranty_conditions: ''
      }]
    };
    setCurrentProduct(formattedProduct);
    setShowModal(true);

  };
  const handleModalClose = () => {
    setShowModal(false);
    setCurrentProduct(null);
  };

  const handleSubmit = async (productData) => {
    try {
      const formattedData = {
        ...productData,
        id_categories: Number(productData.id_categories),
        manufacturer_id: Number(productData.manufacturer_id),
        price: Number(productData.price),
        stock: Number(productData.stock),
        weight: productData.weight ? Number(productData.weight) : null,
        quantity: productData.quantity ? Number(productData.quantity) : null,
        is_active: Number(productData.is_active),
        product_details: productData.details?.filter(detail => detail.spec_name && detail.spec_value)
          .map((detail, index) => ({
            spec_name: detail.spec_name,
            spec_value: detail.spec_value,
            sort_order: index + 1
          })) || [],
        warranties: productData.warranties?.filter(w => 
          w.warranty_period || w.warranty_provider || w.warranty_conditions
        ) || [],
        images: productData.images?.map(img => ({
          url: img.url || img.image_url,
          sort_order: img.sort_order || 1
        })) || []
      };
      
      // Remove empty arrays
      if (!formattedData.product_details?.length) {
        delete formattedData.product_details;
      }
      if (!formattedData.warranties?.length) {
        delete formattedData.warranties;
      }
      if (!formattedData.images?.length) {
        delete formattedData.images;
      }

      // Remove the old details field if it exists
      delete formattedData.details;

      if (currentProduct) {
        await dispatch(updateProduct({
          id: currentProduct.id,
          productData: formattedData
        }));
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        await dispatch(addProduct(formattedData));
        toast.success('Thêm sản phẩm mới thành công!');
      }
      setShowModal(false);
      dispatch(getProducts()); // Refresh the products list
    } catch (error) {
      toast.error(`Lỗi: ${error.message}`);
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
    {console.log('Products:', currentProduct)}
      <ProductModal
        show={showModal}
        handleClose={handleModalClose}
        product={currentProduct}
        onSubmit={handleSubmit}
      />
      <ToastContainer position="bottom-right" />
    </Layout>
  );
};

export default Product;
