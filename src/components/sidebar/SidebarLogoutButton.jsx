import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const SidebarLogoutButton = () => {
  return (
    <div className="p-2 border-top" style={{ borderColor: '#edf2f9' }}>
      <Nav.Link 
        as={Link} 
        to="/logout"
        className="d-flex align-items-center text-decoration-none"
        style={{ 
          color: '#6e84a3',
          fontSize: '0.813rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          margin: '0 0.5rem'
        }}
      >
        <FaSignOutAlt size={16} />
        <span className="ms-2">Đăng xuất</span>
      </Nav.Link>
    </div>
  );
};

export default SidebarLogoutButton;