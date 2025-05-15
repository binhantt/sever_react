import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import UserManagement from '../components/user/UserManagement';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaUsers } from 'react-icons/fa';

const Admin = () => {
  const user = localStorage.getItem('user'); 
  const currentUser = user ? JSON.parse(user) : null;
  
  if (currentUser?.role === 'part_time') {
    return (
      <Layout>
        <Container fluid className="p-4">
          <div className="text-center py-5">
            <h4>Bạn không có quyền truy cập</h4>
            <p>Vui lòng liên hệ quản trị viên để được hỗ trợ</p>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Quản lý người dùng" 
          icon={FaUsers}
          items={[
            { label: "Người dùng" },
            { label: "Danh sách", active: true }
          ]}
        />
        <Row className="mt-4">
          <Col xs={12}>
            <div className="bg-white rounded">
              <UserManagement />
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Admin;