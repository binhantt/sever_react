import React from 'react';
import { Card, Table, Badge, Container , Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';


const ProductManagement = ({ products = [], onEdit, onDelete }) => {
  // console.log(products)
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
                <th>Tên</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Ảnh</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
        
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <div>{product.name}</div>
                    <small className="text-muted">{product.description}</small>
                  </td>
                  <td>{product.category_name || product.categories?.name}</td>
                  <td>{Number(product.price).toLocaleString('vi-VN')}đ</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.main_image_url && (
                      <img 
                        src={product.main_image_url} 
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    )}
                    {product.images && product.images.length > 0 && (
                      product.images.map((image, index) => (
                        <img 
                          key={image.id}
                          src={image.image_url} 
                          alt={product.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginLeft: '5px' }}
                        />
                      ))
                    )}
                  </td>
                  <td>
                    <Badge bg={product.is_active ? 'success' : 'secondary'}>
                      {product.is_active ? 'Hoạt động' : 'Ngừng bán'}
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