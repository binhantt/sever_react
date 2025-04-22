import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentOrders from '../components/dashboard/RecentOrders';
import { 
  FaShoppingCart, 
  FaUsers, 
  FaMoneyBillWave, 
  FaChartLine 
} from 'react-icons/fa';

const stats = [
  {
    title: 'Tổng đơn hàng',
    value: '1,234',
    icon: <FaShoppingCart />,
    color: '#0d6efd'
  },
  {
    title: 'Khách hàng',
    value: '856',
    icon: <FaUsers />,
    color: '#198754'
  },
  {
    title: 'Doanh thu',
    value: '45.6M',
    icon: <FaMoneyBillWave />,
    color: '#dc3545'
  },
  {
    title: 'Tăng trưởng',
    value: '+12.5%',
    icon: <FaChartLine />,
    color: '#6f42c1'
  }
];

const Home = () => {
  return (
    <Layout>
      <div className="mb-4">
        <h4 className="mb-0">Dashboard</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#" className="text-decoration-none">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
          </ol>
        </nav>
      </div>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={6} xl={3}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      {/* Charts */}
      <Row className="g-3 mb-4">
        <Col xs={12} lg={8}>
          <ChartCard title="Doanh thu theo tháng">
            {/* Add chart component here */}
            <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
              <span className="text-muted">Chart goes here</span>
            </div>
          </ChartCard>
        </Col>
        <Col xs={12} lg={4}>
          <ChartCard title="Phân bố đơn hàng">
            {/* Add pie chart component here */}
            <div className="d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
              <span className="text-muted">Pie chart goes here</span>
            </div>
          </ChartCard>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row>
        <Col xs={12}>
          <RecentOrders />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;