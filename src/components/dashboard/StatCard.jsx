import React from 'react';
import { Card } from 'react-bootstrap';

const StatCard = ({ icon, title, value, color }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{ 
              width: '48px', 
              height: '48px',
              backgroundColor: `${color}20`
            }}
          >
            {React.cloneElement(icon, { size: 24, color: color })}
          </div>
          <div>
            <h6 className="text-muted mb-1" style={{ fontSize: '0.875rem' }}>{title}</h6>
            <h4 className="mb-0 fw-bold">{value}</h4>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard; 