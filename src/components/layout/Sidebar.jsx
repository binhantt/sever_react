import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUsers, 
  FaShoppingCart, 
  FaClipboardList,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import { Logo } from '../common/Logo';

const menuItems = [
  {
    path: "/",
    name: "Trang chủ",
    icon: <FaHome size={16} />
  },
  {
    path: "/users",
    name: "Người dùng",
    icon: <FaUsers size={16} />
  },
  {
    path: "/orders",
    name: "Đơn hàng",
    icon: <FaShoppingCart size={16} />
  },
  {
    path: "/products",
    name: "Sản phẩm",
    icon: <FaClipboardList size={16} />
  },
  {
    path: "/analytics",
    name: "Thống kê",
    icon: <FaChartBar size={16} />
  },
  {
    path: "/settings",
    name: "Cài đặt",
    icon: <FaCog size={16} />
  }
];

const Sidebar = () => {
  const location = useLocation();

  const MenuItem = ({ item }) => {
    const isActive = location.pathname === item.path;
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
          {item.icon}
        </div>
        <span className="ms-2 text-nowrap">{item.name}</span>
      </Nav.Link>
    );
  };

  return (
    <div 
      className="position-fixed h-100 d-flex flex-column"
      style={{ 
        width: '250px',
        backgroundColor: '#fff',
        borderRight: '1px solid #edf2f9',
        zIndex: 1030
      }}
    >
      {/* Logo */}
      <div className="p-2 border-bottom" style={{ borderColor: '#edf2f9', height: '50px' }}>
        <Logo size={32} variant="primary" />
      </div>

      {/* Menu Items */}
      <Nav className="flex-column flex-grow-1 py-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </Nav>

      {/* Logout Button */}
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
    </div>
  );
};

export default Sidebar;