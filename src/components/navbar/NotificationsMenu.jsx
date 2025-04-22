import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';

const notifications = [
  { id: 1, text: 'Có 3 đơn hàng mới', time: '5 phút trước', type: 'order' },
  { id: 2, text: 'Đơn hàng #123 đã được xử lý', time: '10 phút trước', type: 'success' },
  { id: 3, text: 'Người dùng mới đăng ký', time: '30 phút trước', type: 'user' },
];

const NotificationsMenu = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        className="btn-icon"
        style={{
          background: 'transparent',
          border: 'none',
          padding: '8px',
          position: 'relative'
        }}
      >
        <FaBell size={18} className="text-light opacity-75" />
      </Dropdown.Toggle>
      <Dropdown.Menu 
        className="shadow-lg border-0"
        style={{ 
          width: '320px',
          backgroundColor: '#2d2d2d',
          marginTop: '10px'
        }}
      >
        <div className="px-3 py-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <h6 className="mb-0 text-white">Thông báo</h6>
        </div>
        {notifications.map(notification => (
          <Dropdown.Item 
            key={notification.id} 
            className="px-3 py-2"
            style={{ backgroundColor: 'transparent' }}
          >
            <div className="d-flex align-items-center text-white">
              <span style={{ opacity: 0.9 }}>{notification.text}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
              {notification.time}
            </div>
          </Dropdown.Item>
        ))}
        <Dropdown.Item 
          className="text-center py-2 text-white opacity-75"
          style={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.9rem'
          }}
        >
          Xem tất cả thông báo
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationsMenu; 