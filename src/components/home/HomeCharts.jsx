import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ChartCard from '../dashboard/ChartCard';

const HomeCharts = () => {
  return (
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
  );
};

export default HomeCharts;