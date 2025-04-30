import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import Breadcrumb from '../components/common/Breadcrumb';
import { FaChartLine } from 'react-icons/fa';

const Stats = () => {
  return (
    <Layout>
      <Container fluid className="p-4">
        <Breadcrumb 
          title="Thống kê" 
          icon={FaChartLine}
          items={[
            { label: "Thống kê", active: true }
          ]}
        />
        <Row className="mt-4">
          <Col xs={12}>
            <div className="bg-white rounded p-4">
              {/* Nội dung thống kê sẽ được thêm ở đây */}
              <h4>Trang thống kê đang được phát triển</h4>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Stats;