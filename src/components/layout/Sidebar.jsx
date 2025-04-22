import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaUsers, FaChartBar, FaCog, FaSignOutAlt, 
  FaClipboardList, FaShoppingCart, FaFileAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: "/home",
      name: "Trang chủ",
      icon: <FaHome size={20} />
    },
    {
      path: "/users",
      name: "Người dùng",
      icon: <FaUsers size={20} />
    },
    {
      path: "/orders",
      name: "Đơn hàng",
      icon: <FaShoppingCart size={20} />
    },
    {
      path: "/products",
      name: "Sản phẩm",
      icon: <FaClipboardList size={20} />
    },
    {
      path: "/reports",
      name: "Báo cáo",
      icon: <FaFileAlt size={20} />
    },
    {
      path: "/analytics",
      name: "Thống kê",
      icon: <FaChartBar size={20} />
    },
    {
      path: "/settings",
      name: "Cài đặt",
      icon: <FaCog size={20} />
    }
  ];

  return (
    <div 
      className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}
      style={{
        width: isExpanded ? '280px' : '80px',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
        position: 'fixed',
        left: 0,
        top: '60px',
        backgroundColor: '#000',
        boxShadow: '3px 0 10px rgba(255,255,255,0.1)',
        zIndex: 1000
      }}
    >
      <Nav className="flex-column pt-3">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Nav.Link 
              as={Link} 
              to={item.path}
              key={index}
              className={`
                menu-item 
                d-flex 
                align-items-center 
                px-4 
                py-3 
                text-white 
                ${isActive ? 'active' : ''}
              `}
              style={{
                backgroundColor: isActive ? '#333' : 'transparent',
                borderLeft: isActive ? '4px solid #fff' : '4px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#333',
                  borderLeft: '4px solid #fff'
                }
              }}
            >
              <span className="icon-container" style={{ 
                width: '30px',
                color: isActive ? '#fff' : '#ccc'
              }}>
                {item.icon}
              </span>
              {isExpanded && (
                <span className="ms-3 text-white" style={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.2s ease'
                }}>
                  {item.name}
                </span>
              )}
            </Nav.Link>
          );
        })}
      </Nav>

      <div className="position-absolute bottom-0 w-100 pb-4">
        <Nav.Link 
          className="d-flex align-items-center px-4 py-3 text-white"
          style={{
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#333'
            }
          }}
        >
          <span className="icon-container" style={{ width: '30px', color: '#fff' }}>
            <FaSignOutAlt size={20} />
          </span>
          {isExpanded && (
            <span className="ms-3 text-white">Đăng xuất</span>
          )}
        </Nav.Link>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          position: 'absolute',
          right: '-15px',
          top: '20px',
          background: '#333',
          border: '1px solid #444',
          color: '#fff',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 5px rgba(255,255,255,0.1)',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'scale(1.1)',
            background: '#444'
          }
        }}
      >
        {isExpanded ? '◀' : '▶'}
      </button>
    </div>
  );
};

export default Sidebar;