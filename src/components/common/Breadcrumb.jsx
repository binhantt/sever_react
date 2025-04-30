import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaHome, FaClipboardList, FaChevronRight } from 'react-icons/fa';

const Breadcrumb = ({ title, icon: Icon, items }) => {
  return (
    <div className="b-breadcrumb-wrapper mb-4">
      <Card className="b-card border-0 shadow-sm">
        <Card.Body className="b-card-body py-3">
          <Row>
            <Col>
              <div className="b-page-header">
                <h4 className="b-page-title mb-2 text-primary d-flex align-items-center">
                  {Icon && <Icon className="me-2" />}
                  <span>{title}</span>
                </h4>
                <nav aria-label="breadcrumb" className="b-breadcrumb">
                  <ol className="breadcrumb b-breadcrumb-list mb-0">
                    <li className="breadcrumb-item b-breadcrumb-item">
                      <a href="#" className="b-breadcrumb-link text-decoration-none text-secondary">
                        <FaHome className="me-1" size={12} /> Trang chủ
                      </a>
                    </li>
                    {items.map((item, index) => (
                      <li 
                        key={index} 
                        className={`breadcrumb-item b-breadcrumb-item ${item.active ? 'active' : ''} d-flex align-items-center`}
                        aria-current={item.active ? "page" : undefined}
                      >
                        <FaChevronRight size={10} className="mx-1 text-muted" />
                        {item.active ? (
                          <span className="text-primary fw-medium">{item.label}</span>
                        ) : (
                          <a href={item.href || "#"} className="b-breadcrumb-link text-decoration-none text-secondary">
                            {item.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Breadcrumb;