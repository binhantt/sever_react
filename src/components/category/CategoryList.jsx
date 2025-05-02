import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryList = ({ categories = [], onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên danh mục</th>
          <th>Mô tả</th>
         
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {categories.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-4 text-muted">
              Không có danh mục nào.
            </td>
          </tr>
        ) : (
          categories.map(category => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>
                <div className="fw-semibold">{category.name}</div>
                <div className="small text-muted">{category.description}</div>
              </td>
              <td>{category.description}</td>
             
              <td className="text-center">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => onEdit(category)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onDelete(category.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};


export default CategoryList;