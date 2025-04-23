import React from 'react';
import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import UserManagement from '../components/user/UserManagement';
import  UserBare from '../components/user/USerBread';
const Admin = () => {
  return (
    <Layout>
      <Container fluid className="p-4">
       <UserBare />
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