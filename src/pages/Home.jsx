import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import RecentOrders from '../components/dashboard/RecentOrders';
import HomeStats from '../components/home/HomeStats';
import HomeCharts from '../components/home/HomeCharts';
import HomeBreadcrumb from '../components/home/HomeBreadcrumb';

const Home = () => {
  return (
    <Layout>
      <HomeBreadcrumb />
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