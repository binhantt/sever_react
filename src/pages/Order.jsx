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
        console.log(result)
      if (result.success) {
        setPagination(prev => ({
          ...prev,
          total: result.data.length || 0
        }));
        toast.success('Đã tải danh sách đơn hàng thành công', {
          position: "top-right",
          autoClose: 2000
        });
      } else {
        throw new Error(result.message || 'Failed to load orders');
      }
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng', {
        position: "top-right",
        autoClose: 3000
      });
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
    console.log(order)
    setShowModal(true);
    toast.info(`Đang chỉnh sửa đơn hàng #${order.id}`, {
      position: "top-right",
      autoClose: 2000
    });
  };

  const handleDelete = async (orderId) => {
    toast.warn(
      <div>
        <h6>Xác nhận xóa đơn hàng</h6>
        <p>Bạn có chắc chắn muốn xóa đơn hàng #{orderId}?</p>
        <div className="d-flex justify-content-end mt-3">
          <button 
            className="btn btn-sm btn-secondary me-2"
            onClick={() => toast.dismiss()}
          >
            Hủy
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={async () => {
              toast.dismiss();
              try {
                const result = await dispatch(deleteOrder(orderId)).unwrap();
                if (result.success) {
                  toast.success(`Đã xóa đơn hàng #${orderId} thành công!`, {
                    position: "top-right",
                    autoClose: 3000
                  });
                  loadOrders();
                } else {
                  throw new Error(result.message);
                }
              } catch (error) {
                toast.error(`Không thể xóa đơn hàng #${orderId}. ${error.message || ''}`, {
                  position: "top-right",
                  autoClose: 4000
                });
              }
            }}
          >
            Xóa
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false
      }
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleSave = async (formData) => {
    try {
      if (selectedOrder) {
        toast.info('Đang cập nhật đơn hàng...', {
          position: "top-right",
          autoClose: 1000
        });

        const result = await dispatch(updateOrder({
          id: selectedOrder.id,
          orderData: {
            user_name: formData.user_name,
            user_email: formData.user_email,
            user_phone: formData.user_phone,
            shipping_address: formData.shipping_address,
            status: formData.status,
            total_amount: formData.total_amount,
            items: formData.items.map(item => ({
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        })).unwrap();

        if (result.success) {
          toast.success(`Đã cập nhật đơn hàng #${selectedOrder.id} thành công!`, {
            position: "top-right",
            autoClose: 3000
          });
          setShowModal(false);
          setSelectedOrder(null);
          loadOrders();
        } else {
          throw new Error(result.message || 'Failed to update order');
        }
      } else {
        toast.info('Chức năng tạo đơn hàng mới chưa được triển khai');
      }
    } catch (error) {
      toast.error(`Lỗi cập nhật đơn hàng: ${error.message || 'Đã xảy ra lỗi không xác định'}`, {
        position: "top-right",
        autoClose: 4000
      });
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
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default Order;