import React from 'react';
import { Nav } from 'react-bootstrap';
import NavbarNotifications from './NavbarNotifications';
import NavbarUserMenu from './NavbarUserMenu';

const NavbarRightNavigation = () => {
  return (
    <Nav className="ms-auto d-flex align-items-center" style={{ gap: '0.5rem' }}>
      <NavbarNotifications />
      <NavbarUserMenu />
    </Nav>
  );
};

export default NavbarRightNavigation;