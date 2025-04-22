import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 d-flex bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        {/* Navbar */}
        <Navbar />
        
        {/* Content Area */}
        <main 
          style={{
            padding: '1.5rem',
            marginTop: '60px',
            minHeight: 'calc(100vh - 60px)',
            backgroundColor: '#fff',
          }}
        >
          <Container fluid>
            {children}
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Layout;