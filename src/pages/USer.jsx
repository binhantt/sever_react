import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import UserManagement from '../components/user/UserManagement';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaUsers } from 'react-icons/fa';

const Admin = () => {
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