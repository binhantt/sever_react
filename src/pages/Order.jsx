import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layout/Layout';
import { FaSearch, FaPlus } from 'react-icons/fa';
import OrderTable from '../components/order/OrderTable';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaClipboardList } from 'react-icons/fa';
import OrderModal from '../components/order/OrderModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder
} from '../store/Api/order';
import { setCurrentOrder, clearErrors, setPagination } from '../store/Slice/order';

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadOrders();
  }, [dispatch, pagination.page, pagination.limit]);

  const loadOrders = async () => {
    try {
      const result = await dispatch(fetchOrders({
        page: pagination.page,
        limit: pagination.limit
      })).unwrap();
      
      setPagination(prev => ({
        ...prev,
        total: result.total || 0
      }));
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng');
    }
  };

  const handlePageChange = (page, limit) => {
    setPagination(prev => ({
      ...prev,
      page,
      limit
    }));
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      try {
        await dispatch(deleteOrder(orderId)).unwrap();
        toast.success('Xóa đơn hàng thành công');
        loadOrders();
      } catch (error) {
        toast.error('Không thể xóa đơn hàng');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleSave = async (formData) => {
    try {
      const url = selectedOrder 
        ? `/api/orders/${selectedOrder.id}`
        : '/api/orders';
      
      const method = selectedOrder ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(
          selectedOrder 
            ? 'Cập nhật đơn hàng thành công'
            : 'Tạo đơn hàng thành công'
        );
        setShowModal(false);
        setSelectedOrder(null);
        loadOrders();
      } else {
        throw new Error(data.message || 'Failed to save order');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi lưu đơn hàng');
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic here
  };

  if (loading) {
    return (
      <Layout>
        <Container fluid className="p-4">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Quản lý Đơn hàng" 
          icon={FaClipboardList}
          items={[
            { label: "Đơn hàng" },
            { label: "Danh sách", active: true }
          ]}
        />
        
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Quản lý đơn hàng</h4>
             
            </div>
          </Col>
          <Col className="text-end">
            <div className="d-flex justify-content-end">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm đơn hàng..."
                className="me-2"
                style={{ width: '250px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary">
                <FaSearch className="me-1" /> 
              </Button>
            </div>
          </Col>
        </Row>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <Row>
          <Col xs={12}>
            <OrderTable 
              orders={orders}
              onEdit={handleEdit}
              onDelete={handleDelete}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
      </Container>

      <OrderModal
        show={showModal}
        onHide={handleCloseModal}
        onSave={handleSave}
        order={selectedOrder}
      />
      
      <ToastContainer position="bottom-right" />
    </Layout>
  );
};

export default Order;