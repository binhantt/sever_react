import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavbarUserMenu = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        className="d-flex align-items-center"
        style={{
          background: 'transparent',
          border: 'none',
          padding: '4px',
          color: '#6e84a3'
        }}
      >
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ 
            width: '28px', 
            height: '28px',
            backgroundColor: '#f1f4f9'
          }}
        >
          <FaUser size={12} style={{ color: '#3c4d69' }} />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu 
        className="border-0 py-1" 
        style={{ 
          marginTop: '0.25rem',
          boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,0.08)',
          minWidth: '180px'
        }}
      >
        <Dropdown.Item as={Link} to="/profile" className="px-3 py-1">
          <FaUser size={12} className="me-2" style={{ color: '#95aac9' }} />
          <span style={{ color: '#3c4d69', fontSize: '0.813rem' }}>Hồ sơ</span>
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/settings" className="px-3 py-1">
          <FaCog size={12} className="me-2" style={{ color: '#95aac9' }} />
          <span style={{ color: '#3c4d69', fontSize: '0.813rem' }}>Cài đặt</span>
        </Dropdown.Item>
        <Dropdown.Divider className="my-1 border-light" />
        <Dropdown.Item as={Link} to="/logout" className="px-3 py-1">
          <FaSignOutAlt size={12} className="me-2" style={{ color: '#95aac9' }} />
          <span style={{ color: '#3c4d69', fontSize: '0.813rem' }}>Đăng xuất</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUserMenu;