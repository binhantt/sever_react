import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const NavbarSearchBar = () => {
  return (
    <Form className="d-none d-lg-block" style={{ width: '280px' }}>
      <InputGroup size="sm">
        <Form.Control
          type="search"
          placeholder="Tìm kiếm..."
          className="border-0 bg-light rounded-2"
          style={{ 
            fontSize: '0.813rem',
            backgroundColor: '#f1f4f9 !important',
            height: '32px'
          }}
        />
        <InputGroup.Text 
          className="border-0 rounded-end-2"
          style={{ backgroundColor: '#f1f4f9', height: '32px' }}
        >
          <FaSearch size={12} className="text-muted" />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
};

export default NavbarSearchBar;