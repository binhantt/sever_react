import React from 'react';
import { Card } from 'react-bootstrap';

const ChartCard = ({ title, children }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-white border-0 pt-4 pb-0 px-4">
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <Card.Body className="p-4">
        {children}
      </Card.Body>
    </Card>
  );
};

export default ChartCard; 