import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/layout/Layout';
import { FaSearch } from 'react-icons/fa';
import OrderTable from '../components/order/OrderTable';
import { ordersData } from '../config/data/orders';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaClipboardList } from 'react-icons/fa';
import OrderModal from '../components/order/OrderModal';

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState(ordersData); // Add this line to manage orders state
  const [formData, setFormData] = useState({});

  const handleDelete = async (orderId) => {
    try {
      toast.info(<div>
        <h6>Xác nhận xóa</h6>
        <p>Bạn có chắc muốn xóa đơn hàng #{orderId}?</p>
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
            onClick={async () => {
              toast.dismiss();
              setOrders(orders.filter(order => order.id !== orderId)); // Change setOrdersData to setOrders
              toast.success(`Đã xóa đơn hàng #${orderId} thành công!`);
            }}
          >
            Xóa
          </Button>
        </div>
      </div>, {
        autoClose: false,
        closeButton: false,
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa đơn hàng');
      console.error(error);
    }
  };

  const handleEdit = (order) => {
    setCurrentOrder(order);

    setFormData({
      customer: order.customer,
      phone: order.phone,
      address: order.address,
      status: order.status,
      total: order.total,
      products: order.products
    });
    setShowModal(true);
  };

  const handleSubmit = (formData) => {
    if (currentOrder) {
      setOrders(orders.map(order => 
        order.id === currentOrder.id ? { 
          ...order, 
          customer: formData.customer,
          phone: formData.phone,
          address: formData.address,
          status: formData.status,
          total: formData.total,
          products: formData.products
        } : order
      ));
      toast.success('Đã cập nhật đơn hàng thành công!');
    } else {
      const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
      setOrders([...orders, { 
        id: newId, 
        ...formData
      }]);
      toast.success('Đã thêm đơn hàng mới thành công!');
    }
    setShowModal(false);
    setCurrentOrder(null);
  };

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
              orders={orders}  // Thay ordersData bằng orders
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
      <OrderModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        order={currentOrder}
        isEditing={!!currentOrder}
      />
      <ToastContainer position="bottom-right" />
    </Layout>
  );
};

export default Order;