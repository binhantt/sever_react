import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="d-none d-lg-block mx-4" style={{ flex: '0 1 400px' }}>
      <InputGroup>
        <Form.Control
          type="search"
          placeholder="Tìm kiếm..."
          className="border-0 shadow-none"
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '0.9rem',
            paddingLeft: '15px',
            height: '38px'
          }}
        />
        <InputGroup.Text 
          style={{ 
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            paddingRight: '15px'
          }}
        >
          <FaSearch size={14} style={{ color: 'rgba(255,255,255,0.5)' }} />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default SearchBar; 