import React from 'react';
import { Logo } from '../common/Logo';

const SidebarLogo = () => {
  return (
    <div className="p-2 border-bottom" style={{ borderColor: '#edf2f9', height: '50px' }}>
      <Logo size={32} variant="primary" />
    </div>
  );
};

export default SidebarLogo;