import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductIntroTable = ({ products = [], onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>STT</th>
          <th>Hình ảnh</th>
          <th>Tiêu đề</th>
          <th>Phụ đề</th>
          <th>Nút 1</th>
          <th>Nút 2</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={7} className="text-center py-4 text-muted">
              Không có sản phẩm nào.
            </td>
          </tr>
        ) : (
          products.map((product, index) => (
            <tr key={product.id || index}>
              <td>{index + 1}</td>
              <td>
                <img 
                  src={product.image_url || '/placeholder.jpg'} 
                  alt={product.title}
                  style={{ width: '50px' }}
                />
              </td>
              <td>{product.title || 'N/A'}</td>
              <td>{product.subtitle || 'N/A'}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  href={product.button1_link}
                >
                  {product.button1_text || 'N/A'}
                </Button>
              </td>
              <td>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  href={product.button2_link}
                >
                  {product.button2_text || 'N/A'}
                </Button>
              </td>
              <td className="text-center">
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => onEdit(product)}
                >
                  <FaEdit />
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onDelete(product.id)}
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

export default ProductIntroTable;