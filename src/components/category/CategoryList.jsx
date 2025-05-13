import React from 'react';
import { Table, Button, Badge, Card } from 'react-bootstrap';
import { FaEdit, FaTrash, FaImage } from 'react-icons/fa';

const CategoryList = ({ categories = [], onEdit, onDelete }) => {
  return (
    <Card className="border-0 shadow-sm">
      <Table responsive hover className="align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="px-4 py-3" style={{ width: '80px' }}>ID</th>
            <th className="px-4 py-3">Tên danh mục</th>
            <th className="px-4 py-3" style={{ width: '150px' }}>Hình ảnh</th>
            <th className="px-4 py-3 text-center" style={{ width: '120px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-5">
                <div className="text-muted">
                  <FaImage size={40} className="mb-3 text-secondary opacity-50" />
                  <p className="mb-0">Không có danh mục nào.</p>
                </div>
              </td>
            </tr>
          ) : (
            categories.map(category => (
              <tr key={category.id} className="align-middle">
                <td className="px-4">
                  <Badge bg="secondary" pill>
                    {category.id}
                  </Badge>
                </td>
                <td className="px-4">
                  <div className="d-flex flex-column">
                    <span className="fw-medium text-dark">{category.name}</span>
                    {category.description && (
                      <small className="text-muted mt-1">{category.description}</small>
                    )}
                  </div>
                </td>
                <td className="px-4">
                  {category.image ? (
                    <div className="position-relative" style={{ width: '60px', height: '60px' }}>
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="rounded"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          border: '2px solid #dee2e6'
                        }}
                      />
                    </div>
                  ) : (
                    <div 
                      className="d-flex align-items-center justify-content-center bg-light rounded"
                      style={{ width: '60px', height: '60px' }}
                    >
                      <FaImage className="text-secondary opacity-50" size={24} />
                    </div>
                  )}
                </td>
                <td className="px-4 text-center">
                  <div className="d-flex gap-2 justify-content-center">
                    <Button 
                      variant="light"
                      size="sm"
                      className="d-flex align-items-center justify-content-center p-2"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => onEdit(category)}
                    >
                      <FaEdit className="text-primary" />
                    </Button>
                    <Button 
                      variant="light"
                      size="sm"
                      className="d-flex align-items-center justify-content-center p-2"
                      style={{ width: '32px', height: '32px' }}
                      onClick={() => onDelete(category.id)}
                    >
                      <FaTrash className="text-danger" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default CategoryList;