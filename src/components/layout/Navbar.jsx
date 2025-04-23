import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import NavbarSearchBar from '../navbar/NavbarSearchBar';
import NavbarRightNavigation from '../navbar/NavbarRightNavigation';

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
        <NavbarSearchBar />
        <NavbarRightNavigation />
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
