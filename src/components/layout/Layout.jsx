import React, { useState } from 'react';
import MainNavbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div>
      <MainNavbar />
      <Sidebar />
      <div className={`main-content ${!sidebarExpanded ? 'sidebar-collapsed' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;