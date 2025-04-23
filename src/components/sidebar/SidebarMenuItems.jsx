import React from 'react';
import { Nav } from 'react-bootstrap';
import menuItems from '../../config/data/MenuItems';
import MenuItem from './MenuItem';

const SidebarMenuItems = () => {
  return (
    <Nav className="flex-column flex-grow-1 py-2">
      {menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </Nav>
  );
};

export default SidebarMenuItems;