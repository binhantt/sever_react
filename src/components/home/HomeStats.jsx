import React from 'react';
import { Row, Col } from 'react-bootstrap';
import StatCard from '../dashboard/StatCard';
import stats from '../../config/data/HomeStatsConfig';

const HomeStats = () => {
  return (
    <Row className="g-3 mb-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon.component;
        const newStat = {
          ...stat,
          icon: <IconComponent size={stat.icon.size} />
        };
        return (
          <Col key={index} xs={12} sm={6} xl={3}>
            <StatCard {...newStat} />
          </Col>
        );
      })}
    </Row>
  );
};

export default HomeStats;