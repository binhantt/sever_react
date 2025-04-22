import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaSearch, FaCog, FaProjectDiagram, FaBars, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [language, setLanguage] = useState('vi');

  return (
    <Navbar bg="black" variant="dark" expand="lg" className="border-bottom shadow-sm py-2">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="me-4 text-white">
          <strong>Architect</strong>
        </Navbar.Brand>

        {/* Toggle Button */}
        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

        {/* Main Navigation */}
        <Navbar.Collapse>
          <Nav className="me-auto d-flex align-items-center">
            {/* Mega Menu */}
            <Nav.Link className="d-flex align-items-center text-white">
              <FaBars className="me-2" />
              Menu Chính
            </Nav.Link>

            {/* Search Bar */}
            <Form className="d-flex mx-3" style={{ minWidth: '200px' }}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="border-end-0 bg-dark text-white"
                  style={{ 
                    backgroundColor: '#333 !important',
                    border: '1px solid #444'
                  }}
                />
                <Button 
                  variant="outline-light" 
                  className="border-start-0"
                  style={{ backgroundColor: '#333' }}
                >
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            {/* Settings */}
            <Nav.Link title="Cài đặt" className="text-white">
              <FaCog />
            </Nav.Link>

            {/* Projects */}
            <Nav.Link title="Dự án" className="text-white">
              <FaProjectDiagram />
            </Nav.Link>
          </Nav>

          {/* Right Side Items */}
          <Nav className="ms-auto d-flex align-items-center">
            {/* Language Selector */}
            <Dropdown align="end" className="me-3">
              <Dropdown.Toggle 
                variant="dark" 
                className="d-flex align-items-center"
                style={{ backgroundColor: '#333', border: '1px solid #444' }}
              >
                <FaGlobe className="me-2" />
                {language === 'vi' ? 'VI' : 'EN'}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark">
                <Dropdown.Item className="text-white" onClick={() => setLanguage('vi')}>
                  Tiếng Việt
                </Dropdown.Item>
                <Dropdown.Item className="text-white" onClick={() => setLanguage('en')}>
                  English
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* User Profile */}
            <Dropdown align="end">
              <Dropdown.Toggle 
                variant="dark" 
                className="d-flex align-items-center"
                style={{ backgroundColor: '#333', border: '1px solid #444' }}
              >
                <img
                  src="https://via.placeholder.com/32"
                  alt="User"
                  className="rounded-circle me-2"
                  width="32"
                  height="32"
                />
                <div className="d-none d-md-block text-white">
                  <div className="fw-bold">Quản trị viên</div>
                  <small className="text-light">Người quản lý</small>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark">
                <Dropdown.Item className="text-white">Hồ sơ</Dropdown.Item>
                <Dropdown.Item className="text-white">Cài đặt</Dropdown.Item>
                <Dropdown.Divider className="bg-secondary" />
                <Dropdown.Item className="text-white">Đăng xuất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;