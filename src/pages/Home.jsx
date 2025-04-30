import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import RecentOrders from '../components/dashboard/RecentOrders';
import HomeStats from '../components/home/HomeStats';
import HomeCharts from '../components/home/HomeCharts';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaHome } from 'react-icons/fa';

const Home = () => {
  return (
    <Layout>
      <Breadcrumb 
        title="Dashboard" 
        icon={FaHome}
        items={[
          { label: "Dashboard", active: true }
        ]}
      />
      <HomeStats />
      <HomeCharts />
      <Row>
        <Col xs={12}>
          <RecentOrders />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;