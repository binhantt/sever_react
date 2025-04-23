import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ item }) => {
  const location = useLocation();
  const isActive = location.pathname === item.path;
  const IconComponent = item.icon.component;

  return (
    <Nav.Link 
      as={Link} 
      to={item.path}
      className={`d-flex align-items-center text-decoration-none ${isActive ? 'active' : ''}`}
      style={{
        color: isActive ? '#3c4d69' : '#6e84a3',
        backgroundColor: isActive ? '#f1f4f9' : 'transparent',
        fontSize: '0.813rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        margin: '0.125rem 0.5rem',
        transition: 'all 0.2s'
      }}
    >
      <div className="icon-container" style={{ width: '20px', textAlign: 'center' }}>
        <IconComponent size={item.icon.size} />
      </div>
      <span className="ms-2 text-nowrap">{item.name}</span>
    </Nav.Link>
  );
};

export default MenuItem;