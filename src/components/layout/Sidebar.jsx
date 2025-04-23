import React from 'react';
import SidebarLogo from '../sidebar/SidebarLogo';
import SidebarMenuItems from '../sidebar/SidebarMenuItems';
import SidebarLogoutButton from '../sidebar/SidebarLogoutButton';

const Sidebar = () => {
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
      <SidebarLogo />
      <SidebarMenuItems />
      <SidebarLogoutButton />
    </div>
  );
};

export default Sidebar;