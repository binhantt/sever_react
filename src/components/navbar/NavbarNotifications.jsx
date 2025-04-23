import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const notifications = [
  { id: 1, text: 'Có 3 đơn hàng mới', time: '5 phút trước' },
  { id: 2, text: 'Đơn hàng #123 đã được xử lý', time: '10 phút trước' },
  { id: 3, text: 'Người dùng mới đăng ký', time: '30 phút trước' },
];

const NavbarNotifications = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        className="d-flex align-items-center justify-content-center"
        style={{
          background: 'transparent',
          border: 'none',
          padding: '6px',
          color: '#6e84a3',
          height: '32px',
          width: '32px'
        }}
      >
        <div className="position-relative">
          <FaBell size={15} />
          <span 
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: '0.563rem', padding: '0.2em 0.35em' }}
          >
            3
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu 
        className="border-0 py-1" 
        style={{ 
          width: '280px', 
          marginTop: '0.25rem',
          boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,0.08)'
        }}
      >
        <div className="px-3 py-2 border-bottom border-light">
          <h6 className="mb-0" style={{ fontSize: '0.875rem' }}>Thông báo</h6>
        </div>
        {notifications.map(notification => (
          <Dropdown.Item key={notification.id} className="px-3 py-1">
            <div style={{ color: '#3c4d69', fontSize: '0.813rem' }}>{notification.text}</div>
            <div style={{ color: '#95aac9', fontSize: '0.688rem' }}>{notification.time}</div>
          </Dropdown.Item>
        ))}
        <Dropdown.Item className="text-center py-1" style={{ fontSize: '0.813rem', color: '#2c7be5' }}>
          Xem tất cả
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarNotifications;