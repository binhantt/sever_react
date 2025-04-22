import React from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const notifications = [
  { id: 1, text: 'Có 3 đơn hàng mới', time: '5 phút trước' },
  { id: 2, text: 'Đơn hàng #123 đã được xử lý', time: '10 phút trước' },
  { id: 3, text: 'Người dùng mới đăng ký', time: '30 phút trước' },
];

const MainNavbar = () => {
  return (
    <Navbar 
      fixed="top" 
      className="border-bottom px-0"
      style={{ 
        backgroundColor: '#fff',
        height: '50px',
        left: '250px',
        right: 0,
        width: 'auto',
        borderColor: '#edf2f9'
      }}
    >
      <Container fluid className="px-3">
        {/* Search Bar */}
        <Form className="d-none d-lg-block" style={{ width: '280px' }}>
          <InputGroup size="sm">
            <Form.Control
              type="search"
              placeholder="Tìm kiếm..."
              className="border-0 bg-light rounded-2"
              style={{ 
                fontSize: '0.813rem',
                backgroundColor: '#f1f4f9 !important',
                height: '32px'
              }}
            />
            <InputGroup.Text 
              className="border-0 rounded-end-2"
              style={{ backgroundColor: '#f1f4f9', height: '32px' }}
            >
              <FaSearch size={12} className="text-muted" />
            </InputGroup.Text>
          </InputGroup>
        </Form>

        {/* Right Navigation */}
        <Nav className="ms-auto d-flex align-items-center" style={{ gap: '0.5rem' }}>
          {/* Notifications */}
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

          {/* User Menu */}
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
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
