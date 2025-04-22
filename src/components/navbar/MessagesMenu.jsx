import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaRegEnvelope } from 'react-icons/fa';

const MessagesMenu = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        className="btn-icon"
        style={{
          background: 'transparent',
          border: 'none',
          padding: '8px',
          position: 'relative'
        }}
      >
        <FaRegEnvelope size={18} className="text-light opacity-75" />
      </Dropdown.Toggle>
    </Dropdown>
  );
};

export default MessagesMenu; 