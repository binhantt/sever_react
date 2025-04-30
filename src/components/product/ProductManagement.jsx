import React from 'react';
import { Card, Table, Badge, Container } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductManagement = ({ onEdit, onDelete }) => {
  // Dữ liệu tạm thời - sau này sẽ thay bằng API hoặc props
  const products = [
    { id: 1, name: 'Sản phẩm 1', price: 100000, stock: 10, status: 'active' },
    { id: 2, name: 'Sản phẩm 2', price: 200000, stock: 5, status: 'inactive' }
  ];

  return (
    <Container fluid className="p-0 mt-4">
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold">Danh sách sản phẩm</h6>
          <a href="/products" className="text-primary small">Xem tất cả</a>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()}đ</td>
                  <td>{product.stock}</td>
                  <td>
                    <Badge bg={product.status === 'active' ? 'success' : 'secondary'}>
                      {product.status === 'active' ? 'Hoạt động' : 'Ngừng bán'}
                    </Badge>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(product)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(product.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductManagement;