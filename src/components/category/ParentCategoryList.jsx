import React from 'react';
import { Table, Button, Badge, Card, Spinner, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaLayerGroup } from 'react-icons/fa';

const ParentCategoryList = ({ 
  categories = [], 
  loading,
  error,
  onEdit, 
  onDelete 
}) => {
  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error.message || 'Lỗi khi tải danh mục cha'}
      </Alert>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <Table responsive hover className="align-middle mb-0">
        <thead className="bg-light">
          <tr>
            <th className="px-4 py-3" style={{ width: '80px' }}>ID</th>
            <th className="px-4 py-3">Tên danh mục cha</th>
            <th className="px-4 py-3 text-center" style={{ width: '120px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-5">
                <div className="text-muted">
                  <FaLayerGroup size={40} className="mb-3 text-secondary opacity-50" />
                  <p className="mb-0">Không có danh mục cha nào.</p>
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
                  <span className="fw-medium text-dark">{category.name}</span>
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

export default ParentCategoryList;