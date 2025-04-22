import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLogo = () => {
  return (
    <div className="py-3 px-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
      <Link 
        to="/" 
        className="d-flex align-items-center text-decoration-none"
      >
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ 
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
          }}
        >
          <span className="fw-bold text-white fs-5">A</span>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLogo; 