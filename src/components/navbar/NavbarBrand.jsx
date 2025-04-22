import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarBrand = () => {
  return (
    <div className="d-flex align-items-center">
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center me-2"
          style={{ 
            width: '35px', 
            height: '35px',
            background: 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)',
          }}
        >
          <span className="fw-bold text-white">A</span>
        </div>
        <span className="text-white fw-semibold">Architect</span>
      </Navbar.Brand>
    </div>
  );
};

export default NavbarBrand; 