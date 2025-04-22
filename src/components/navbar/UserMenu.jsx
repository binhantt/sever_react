import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const UserMenu = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        className="d-flex align-items-center gap-2"
        style={{
          background: 'transparent',
          border: 'none',
          padding: '5px'
        }}
      >
        <div className="d-flex align-items-center">
          <div 
            className="rounded-circle d-flex align-items-center justify-content-center" 
            style={{ 
              width: '35px',
              height: '35px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }}
          >
            <FaUser size={14} className="text-white opacity-75" />
          </div>
          <span className="ms-2 text-white opacity-90 d-none d-md-inline" style={{ fontSize: '0.9rem' }}>
            Admin
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu 
        className="shadow-lg border-0"
        style={{ 
          backgroundColor: '#2d2d2d',
          marginTop: '10px',
          minWidth: '200px'
        }}
      >
        <Dropdown.Item as={Link} to="/profile" className="px-3 py-2 text-white">
          <FaUser size={14} className="me-2 opacity-75" />
          <span style={{ fontSize: '0.9rem' }}>Hồ sơ</span>
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/settings" className="px-3 py-2 text-white">
          <FaCog size={14} className="me-2 opacity-75" />
          <span style={{ fontSize: '0.9rem' }}>Cài đặt</span>
        </Dropdown.Item>
        <Dropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <Dropdown.Item as={Link} to="/logout" className="px-3 py-2 text-white">
          <FaSignOutAlt size={14} className="me-2 opacity-75" />
          <span style={{ fontSize: '0.9rem' }}>Đăng xuất</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu; 